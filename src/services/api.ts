// API service for StoryBit AI backend integration

export interface ProcessTopicRequest {
  topic: string;
}

export interface ProcessTopicResponse {
  ideas: string[];
  descriptions: string[];
}

export class ApiService {
  // Use proxy in development, direct URL in production
  private static readonly BASE_URL = import.meta.env.DEV 
    ? '/api'  // Use Vite proxy in development
    : import.meta.env.VITE_API_URL || 'https://sb-u864.onrender.com';

  static async processTopic(topic: string, retryCount = 0): Promise<ProcessTopicResponse> {
    const maxRetries = 2;
    const retryDelay = 5000; // 5 seconds
    
    try {
      const apiUrl = `${this.BASE_URL}/process-topic`;
      console.log('Making API request to:', apiUrl);
      console.log('Request payload:', { topic });
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
        mode: 'cors', // Explicitly set CORS mode
      });
      
      clearTimeout(timeoutId);
      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      // Handle 502 Bad Gateway with retry
      if (response.status === 502 && retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.processTopic(topic, retryCount + 1);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        console.error('Full response:', response);
        
        // Special handling for different error types
        if (response.status === 405) {
          throw new Error('Method Not Allowed (405). The API endpoint may not support POST requests or the endpoint URL is incorrect. Please check your API configuration.');
        }
        
        if (response.status === 502) {
          throw new Error('Server temporarily unavailable (502 Bad Gateway). The API server may be starting up or overloaded. Please try again in a few minutes.');
        }
        
        if (response.status === 404) {
          throw new Error('API endpoint not found (404). Please check if the API URL is correct and the endpoint exists.');
        }
        
        if (response.status === 500) {
          throw new Error('Internal server error (500). The API server encountered an error processing your request.');
        }
        
        throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const data = await response.json();
      
      // Return only the fields we need, excluding the unwanted ones
      return {
        ideas: data.ideas || [],
        descriptions: data.descriptions || [],
      };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - API took too long to respond (up to 2 minutes)');
      }
      
      // Handle CORS and network errors
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to the API server. This might be a CORS issue or the server is down.');
      }
      
      if (error instanceof Error && error.message.includes('CORS')) {
        throw new Error('CORS error: The API server needs to allow requests from this domain. Please check your backend CORS configuration.');
      }
      
      throw error;
    }
  }
}
