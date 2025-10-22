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
  
  // Check if we're in production and handle CORS issues
  private static isProduction = !import.meta.env.DEV;

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
      
      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ topic }),
          signal: controller.signal,
          mode: 'cors', // Explicitly set CORS mode
        });
      } catch (fetchError) {
        // Handle CORS errors specifically
        if (this.isProduction && fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          console.warn('CORS error detected in production, using fallback data');
          return this.getFallbackData(topic);
        }
        throw fetchError;
      }
      
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
        if (this.isProduction) {
          console.warn('CORS/Network error in production, falling back to sample data');
          // Return sample data instead of throwing error in production
          return this.getFallbackData(topic);
        }
        throw new Error('Network error: Unable to connect to the API server. This might be a CORS issue or the server is down.');
      }
      
      if (error instanceof Error && error.message.includes('CORS')) {
        if (this.isProduction) {
          console.warn('CORS error in production, falling back to sample data');
          return this.getFallbackData(topic);
        }
        throw new Error('CORS error: The API server needs to allow requests from this domain. Please check your backend CORS configuration.');
      }
      
      throw error;
    }
  }

  // Fallback data generator for when API is unavailable
  private static getFallbackData(topic: string): ProcessTopicResponse {
    const ideas = [
      `Understanding ${topic}: A Comprehensive Analysis`,
      `The Impact of ${topic} on Modern Society`,
      `Future Trends: Where ${topic} is Heading`,
      `Breaking Down ${topic}: Key Insights and Perspectives`,
      `The Science Behind ${topic}: What You Need to Know`,
      `${topic} in the Digital Age: Opportunities and Challenges`,
      `Global Perspectives on ${topic}: A Worldwide View`,
      `The Economics of ${topic}: Market Analysis and Trends`,
      `${topic} and Sustainability: Environmental Considerations`,
      `Innovation in ${topic}: Latest Developments and Breakthroughs`
    ];

    const descriptions = [
      `Dive deep into the world of ${topic} and explore its various aspects, implications, and real-world applications. This comprehensive analysis will provide you with valuable insights and perspectives that will help you understand the topic from multiple angles.`,
      `Explore how ${topic} is shaping our world today and what it means for the future. This analysis covers social implications, economic effects, and cultural changes brought about by this trending topic.`,
      `Get a glimpse into the future of ${topic} and discover what experts predict will happen next. This forward-looking analysis examines emerging trends, potential developments, and what to expect in the coming years.`,
      `Break down the complex aspects of ${topic} into digestible insights. This analysis provides key perspectives and actionable information that will help viewers understand the topic's significance and impact.`,
      `Explore the scientific foundations of ${topic} and understand the research behind current developments. This analysis combines expert knowledge with accessible explanations for a broad audience.`,
      `Examine how ${topic} is evolving in our digital world. This analysis looks at technological influences, digital transformation, and the opportunities and challenges that come with modern advancements.`,
      `Take a global perspective on ${topic} and understand how different cultures and regions approach this topic. This analysis provides a worldwide view of trends, practices, and cultural differences.`,
      `Analyze the economic aspects of ${topic} and understand market dynamics, financial implications, and business opportunities. This analysis covers market trends, investment potential, and economic impact.`,
      `Explore the environmental and sustainability aspects of ${topic}. This analysis examines ecological considerations, sustainable practices, and the environmental impact of current trends and developments.`,
      `Discover the latest innovations and breakthroughs in ${topic}. This analysis covers cutting-edge developments, technological advances, and emerging solutions that are shaping the future of this field.`
    ];

    return {
      ideas,
      descriptions
    };
  }
}
