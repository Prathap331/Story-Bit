// API service for StoryBit AI platform
// Use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://sb-u864.onrender.com';

export interface GenerateScriptRequest {
  topic: string;
}

export interface GenerateScriptResponse {
  script: string;
}

export interface ProcessTopicRequest {
  topic: string;
}

export interface ProcessTopicResponse {
  source_of_context: string;
  ideas: string[];
  descriptions: string[];
  source_urls: string[];
  scraped_text_context: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Generic fetch wrapper with error handling and extended timeout
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  let timeoutId: NodeJS.Timeout | undefined;
  
  try {
    // Create AbortController for timeout handling
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 150000); // 2.5 minutes timeout

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. The API is taking longer than expected to respond.');
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the API server. This might be due to CORS restrictions or server issues. Please try again later.');
      }
      throw new Error(`API request failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
}

// Generate Script API
export async function generateScript(
  request: GenerateScriptRequest
): Promise<GenerateScriptResponse> {
  return apiRequest<GenerateScriptResponse>(`${API_BASE_URL}/generate-script`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Process Topic API
export async function processTopic(
  request: ProcessTopicRequest
): Promise<ProcessTopicResponse> {
  return apiRequest<ProcessTopicResponse>(`${API_BASE_URL}/process-topic`, {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
