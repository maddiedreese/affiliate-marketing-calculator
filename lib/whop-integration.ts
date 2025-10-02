// Whop SDK Integration
import { WhopServerSdk } from "@whop/api";

export interface WhopUser {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

export interface WhopAppConfig {
  apiKey: string;
  appId: string;
  environment: 'development' | 'production';
}

// Initialize Whop SDK
export const whopSdk = WhopServerSdk({
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID!,
  appApiKey: process.env.WHOP_API_KEY!,
});

// Whop Integration Class
export class WhopIntegration {
  private config: WhopAppConfig;

  constructor(config: WhopAppConfig) {
    this.config = config;
  }

  // Initialize Whop SDK
  async initialize(): Promise<void> {
    try {
      console.log('Whop SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Whop SDK:', error);
      throw error;
    }
  }

  // Check if user has access to a specific access pass
  async checkUserAccess(userId: string, accessPassId: string): Promise<boolean> {
    try {
      const hasAccess = await whopSdk.access.checkIfUserHasAccessToAccessPass(userId, accessPassId);
      return hasAccess;
    } catch (error) {
      console.error('Error checking user access:', error);
      return false;
    }
  }

  // Get user information
  async getUser(userId: string): Promise<WhopUser | null> {
    try {
      const user = await whopSdk.users.retrieve(userId);
      return {
        id: user.id,
        username: user.username || '',
        email: user.email || '',
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Track app usage for analytics
  async trackUsage(event: string, data?: any): Promise<void> {
    try {
      // Whop SDK doesn't have built-in analytics, so we'll use console logging
      // In a real app, you might want to integrate with a service like Mixpanel or Google Analytics
      console.log('Tracking usage:', event, data);
    } catch (error) {
      console.error('Error tracking usage:', error);
    }
  }

  // Handle payments (if needed for premium features)
  async processPayment(amount: number, description: string): Promise<boolean> {
    try {
      // This would be implemented based on your specific payment requirements
      console.log('Processing payment:', amount, description);
      // Return true for now - implement actual payment logic as needed
      return true;
    } catch (error) {
      console.error('Error processing payment:', error);
      return false;
    }
  }

  // Get app information
  async getAppInfo(): Promise<any> {
    try {
      // This would fetch app-specific information from Whop
      return {
        name: this.config.appId,
        environment: this.config.environment,
      };
    } catch (error) {
      console.error('Error fetching app info:', error);
      return null;
    }
  }
}

// Export a default instance
export const whopApp = new WhopIntegration({
  apiKey: process.env.WHOP_API_KEY || '',
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID || '',
  environment: (process.env.NODE_ENV as 'development' | 'production') || 'development'
});
