// API service for StoryBit AI backend integration

export interface ProcessTopicRequest {
  topic: string;
}

export interface ProcessTopicResponse {
  ideas: string[];
  descriptions: string[];
}

export class ApiService {
  private static readonly BASE_URL = '/api';

  static async processTopic(topic: string, retryCount = 0): Promise<ProcessTopicResponse> {
    const maxRetries = 2;
    const retryDelay = 5000; // 5 seconds
    
    try {
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout
      
      const response = await fetch(`${this.BASE_URL}/process-topic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      // Handle 502 Bad Gateway with retry
      if (response.status === 502 && retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.processTopic(topic, retryCount + 1);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        // Special handling for 502 errors
        if (response.status === 502) {
          throw new Error('Server temporarily unavailable (502 Bad Gateway). The API server may be starting up or overloaded. Please try again in a few minutes.');
        }
        
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
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
      throw error;
    }
  }
}
