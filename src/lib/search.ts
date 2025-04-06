import { OpenAI } from 'openai';
import { BlogData } from '@/interfaces/blog';
import { z } from 'zod';

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define the schema for search response
export const SearchResponseSchema = z.object({
  results: z.array(z.object({
    title: z.string().describe("Blog title"),
    date: z.string().describe("Blog publish date"),
    id: z.string().describe("Blog ID used for navigation"),
    relevance: z.number().min(0).max(10).describe("Relevance score to user query"),
    explanation: z.string().describe("Description of why the blog is relevant to the user query")
  })).describe("Array of blog results that match the user query")
});

// Export the type based on the schema
export type SearchResponse = z.infer<typeof SearchResponseSchema>;

/**
 * Creates a human-readable example of the expected JSON structure
 * This is a more reliable alternative to serializing the Zod schema
 */
function getSchemaExample(): string {
  return `{
  "results": [ // Array of blog results that match the user query
    {
      "title": "string (Blog title)",
      "date": "string (Blog publish date)",
      "id": "string (Blog ID used for navigation)",
      "relevance": "number between 0-10 (Relevance score to user query)",
      "explanation": "string (Description of why the blog is relevant to the user query)"
    }
  ]
}`;
}

const generatePrompt = (blogContext: string, query: string, error?: string): string => {
  let prompt = `
  You will be provided with blog content and a search query. 
  Your task is to find relevant information from the blogs that answers the query.
  
  The search query is: "${query}"
  
  You MUST respond with a valid JSON object in the following format:
  ${getSchemaExample()}

  Return ONLY the JSON object, with no additional text or explanation.
  The response must be valid JSON that can be parsed with JSON.parse().

    IMPORTANT: Your response MUST be valid JSON:
    - DO NOT wrap JSON in markdown codeblocks, only respond with the raw JSON string
    - Use double quotes (") not single quotes (')
    - Escape any quotes within strings with backslash (\")
    - Do not use smart/curly quotes
    - The response must be parseable by JSON.parse()

  If no relevant information is found, return an empty results array.`;

  // Add error message if provided
  if (error) {
    prompt += `
  
  PREVIOUS ERROR:
  ${error}
  
  Please fix the error in your response and ensure it's valid JSON that matches the required schema.`;
  }
  
  prompt += `
  
  BLOG CONTENT:
  ${blogContext}`;
  
  return prompt;
}

/**
 * Function to search blog content using LLM
 */
export async function searchBlogs(query: string, blogs: BlogData[], temperature: number = 0.5) {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  // Format blog content for context
  const blogContext = blogs.map(blog => 
    `TITLE: ${blog.title}\nID: ${blog.id}\nDATE: ${blog.date}\nCONTENT: ${blog.content}`
  ).join('\n\n---\n\n');

  // Set max number of retries
  const MAX_RETRIES = 3;
  let attemptCount = 0;
  let lastError: string | undefined;

  while (attemptCount < MAX_RETRIES) {
    attemptCount++;
    try {
      // Generate prompt using blog content, user query and any previous response errors
      const prompt = generatePrompt(blogContext, query, lastError);
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: "user", content: prompt}
        ],
        temperature: temperature,
      });

      const responseContent = response.choices[0].message.content;
      if (!responseContent) {
        lastError = 'Empty response from OpenAI';
        if (attemptCount >= MAX_RETRIES) throw new Error(lastError);
        continue;
      }

      try {
        const jsonResponse = JSON.parse(responseContent);
        // Validate LLM response against zod schema
        const validatedResponse = SearchResponseSchema.parse(jsonResponse);
        return validatedResponse;
      } catch (parseError) {
        // Create error message to use in next retry
        lastError = parseError instanceof Error 
          ? `Error: ${parseError.message}. Original response: ${responseContent}`
          : `Unknown parsing error. Original response: ${responseContent}`;
        
        console.error(`Attempt ${attemptCount}/${MAX_RETRIES} failed:`, lastError);
        if (attemptCount >= MAX_RETRIES) throw new Error('Invalid response format from search after multiple attempts');
      }
    } catch (error) {
      if (attemptCount >= MAX_RETRIES) {
        console.error('OpenAI API error after multiple attempts:', error);
        throw new Error('Failed to process search query after multiple attempts');
      }
      
      lastError = error instanceof Error 
        ? `API Error: ${error.message}`
        : 'Unknown API error occurred';
        
      console.error(`Attempt ${attemptCount}/${MAX_RETRIES} failed:`, lastError);
    }
  }
  
  // This should never be reached due to the error handling above,
  // but TypeScript requires a return value
  throw new Error('Failed to process search query after exhausting retries');
}

/**
 * Function to validate rate limits 
 * Simple in-memory implementation (can be replaced with proper solution later)
 */
const IP_RATE_LIMITS: Record<string, { count: number, timestamp: number }> = {};
const RATE_LIMIT = 2; // queries per window
const RATE_WINDOW = 1000 * 60 * 60; // 1 hour in milliseconds

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  
  // Initialize or reset expired records
  if (!IP_RATE_LIMITS[ip] || now - IP_RATE_LIMITS[ip].timestamp > RATE_WINDOW) {
    IP_RATE_LIMITS[ip] = { count: 0, timestamp: now };
  }
  
  // Check if rate limit exceeded
  if (IP_RATE_LIMITS[ip].count >= RATE_LIMIT) {
    return false;
  }
  
  // Increment counter
  IP_RATE_LIMITS[ip].count += 1;
  return true;
} 