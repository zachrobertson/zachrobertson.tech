import { NextApiRequest, NextApiResponse } from 'next';
import { searchBlogs, checkRateLimit, SearchResponse } from '@/lib/search';
import { getAllBlogs } from '@/lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the query and temperature from the request body
  const { query, temperature } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Validate temperature if provided
  const tempValue = temperature !== undefined ? parseFloat(temperature) : 0.5;
  if (isNaN(tempValue) || tempValue < 0 || tempValue > 1) {
    return res.status(400).json({ error: 'Temperature must be a number between 0 and 1' });
  }

  // Get client IP for rate limiting
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(',')[0] || req.socket.remoteAddress || 'unknown';

  // Check rate limit
  if (!checkRateLimit(String(ip))) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
  }

  try {
    // Get all blog content
    const blogs = await getAllBlogs();
    
    // Perform the search with the specified temperature
    const searchResponse: SearchResponse = await searchBlogs(query, blogs, tempValue);

    // Return the structured search results
    return res.status(200).json(searchResponse);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ error: 'Failed to process search query' });
  }
} 