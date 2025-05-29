import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Add interface for search result item
interface SearchResultItem {
  title: string;
  date: string;
  id: string;
  relevance: number;
  explanation: string;
}

const SearchContainer = styled.div`
  width: 100%;
  font-family: 'Fira Code', monospace;
`;

const TerminalContainer = styled.div`
  width: 100%;
  color: #e0e0e0;
`;

const CommandLine = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Prompt = styled.span`
  color: #0087D7;
  white-space: nowrap;
  margin-right: 8px;
`;

const CommandInput = styled.input`
  background-color: transparent;
  border: none;
  color: #00FF00;
  font-family: inherit;
  flex-grow: 1;
  font-size: inherit;
  
  &:focus {
    outline: none;
  }
`;

const ResponseArea = styled.pre`
  white-space: pre-wrap;
  color: #e0e0e0;
  margin-top: 10px;
  font-family: 'Fira Code', monospace;
`;

const SearchResultList = styled.div`
  margin-top: 10px;
  font-family: 'Fira Code', monospace;
  white-space: pre-wrap;
`;

const SearchResultHeader = styled.div`
  margin-bottom: 16px;
  color: #e0e0e0;
`;

const ResultItem = styled.div`
  margin-bottom: 16px;
  padding-left: 8px;
`;

const ResultTitle = styled.div`
  a {
    color: #00FF00;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResultDetails = styled.div`
  margin-top: 4px;
  color: #e0e0e0;
  font-size: 0.9em;
  padding-left: 8px;
`;

const ResultDate = styled.span`
  color: #0087D7;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 10px;
`;

const LoadingIndicator = styled.div`
  color: #00FF00;
  margin-top: 10px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Search: React.FC = () => {
  const [command, setCommand] = useState('');
  const [commandResponse, setCommandResponse] = useState<SearchResultItem[] | string>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await processCommand(command);
    }
  };

  const processCommand = async (cmd: string) => {
    setError(null);
    setCommandResponse([]);

    const trimmedCmd = cmd.trim();

    // Empty command
    if (!trimmedCmd) {
      return;
    }
    
    // Split command into parts
    const parts = trimmedCmd.split(' ');
    const baseCommand = parts[0];
    
    // Handle different commands
    if (baseCommand === 'search') {
      await handleSearchCommand(parts);
    } else if (trimmedCmd === 'man search') {
      setCommandResponse(manPageText);
    } else {
      setError(`terminal: ${baseCommand}: command not found`);
    }
  };

  const handleSearchCommand = async (parts: string[]) => {
    // Remove base command
    parts.shift();
    
    // Process flags and search query
    let query = '';
    let temperature = 0.5;
    let showHelp = false;
    let error = null;
    
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith('--')) {
        // Handle flags
        if (parts[i] === '--temperature') {
          // Process temperature flag
          if (i + 1 < parts.length && !parts[i + 1].startsWith('--')) {
            const tempValue = parseFloat(parts[i + 1]);
            if (!isNaN(tempValue) && tempValue >= 0 && tempValue <= 1) {
              temperature = tempValue;
              i++; // Skip the value in the next iteration
            } else {
              error = 'search: temperature must be a number between 0 and 1';
              break;
            }
          } else {
            error = 'search: --temperature requires a value';
            break;
          }
        } else if (parts[i] === '--help') {
          showHelp = true;
        } else {
          error = `search: unknown option ${parts[i]}`;
          break;
        }
      } else {
        // Collect non-flag parts as the search query
        query += (query ? ' ' : '') + parts[i];
      }
    }
    
    // Handle help flag
    if (showHelp) {
      setCommandResponse(`Usage: search [OPTIONS] QUERY
Options:
  --temperature VALUE    Set search temperature (0-1)
  --help                 Display this help message`);
      return;
    }
    
    // Handle error
    if (error) {
      setError(error);
      return;
    }
    
    // Check if query is empty
    if (!query) {
      setError('search: missing query');
      return;
    }
    
    // Perform search
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, temperature }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'An error occurred during search');
      }
      
      if (responseData.results && responseData.results.length > 0) {
        setCommandResponse(responseData.results);
        setSearchQuery(query);
      } else {
        setCommandResponse([]);
        setSearchQuery(query);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search');
    } finally {
      setIsLoading(false);
    }
  };

  const manPageText = `SEARCH(1)                  Terminal Manual                  SEARCH(1)

NAME
       search - search through blog content

SYNOPSIS
       search [OPTIONS] QUERY

DESCRIPTION
       Search through blog content using natural language queries.
       The search is powered by AI and will return relevant information
       from blog posts that match your query.

OPTIONS
       --temperature VALUE
              Set the randomness of the search, between 0 and 1.
              Lower values give more focused, deterministic results.
              Higher values increase creativity and variance.
              Default is 0.5.

       --help Display usage information instead of this man page.

EXAMPLES
       search how to deploy Next.js
       search --temperature 0.7 React hooks explained
       
AUTHOR
       Written by Zach Robertson.

REPORTING BUGS
       Report bugs to the website repository.

COPYRIGHT
       Copyright © 2023 Zach Robertson.
       This is free software: you are free to use it.`

  return (
    <SearchContainer>
      <TerminalContainer>
        <CommandLine>
          <Prompt>zach@zachrobertson:~$</Prompt>
          <span style={{ color: '#00FF00' }}>man search</span>
        </CommandLine>
        <ResponseArea>{manPageText}</ResponseArea>
        <CommandLine>
          <Prompt>zach@zachrobertson:~$</Prompt>
          <CommandInput
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'man search' or 'search [query]'"
          />
        </CommandLine>
        {Array.isArray(commandResponse) && commandResponse.length > 0 ? (
          <SearchResultList>
            <SearchResultHeader>Found {commandResponse.length} results for &quot;{searchQuery}&quot;:</SearchResultHeader>
            {commandResponse.map((result: SearchResultItem, index: number) => (
              <ResultItem key={index}>
                <ResultTitle>
                  <Link href={`/blog/${result.id}`}>
                    - {result.title}
                  </Link>{' '}
                  (<ResultDate>{result.date}</ResultDate>)
                </ResultTitle>
                <ResultDetails>
                  Relevance: {result.relevance}/10
                  <br />
                  {result.explanation}
                </ResultDetails>
              </ResultItem>
            ))}
          </SearchResultList>
        ) : typeof commandResponse === 'string' ? (
          <ResponseArea>{commandResponse}</ResponseArea>
        ): null}
        
        {isLoading && <LoadingIndicator>Processing...</LoadingIndicator>}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </TerminalContainer>
    </SearchContainer>
  );
};

export default Search; 