const axios = require('axios');

class N8nService {
  constructor() {
    this.baseUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/';
    this.apiKey = process.env.N8N_API_KEY || '';
  }

  async triggerWorkflow(workflowId, data) {
    try {
      const response = await axios.post(
        `${this.baseUrl}webhook/${workflowId}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-N8N-API-KEY': this.apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error triggering n8n workflow:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(userData) {
    return this.triggerWorkflow('new-user-welcome', {
      ...userData,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    });
  }

  async enhanceListing(listingData) {
    return this.triggerWorkflow('enhance-listing', {
      ...listingData,
      baseUrl: process.env.BASE_URL || 'http://localhost:5000',
    });
  }

  async publishToPortals(listingData) {
    return this.triggerWorkflow('publish-portal', {
      ...listingData,
      baseUrl: process.env.BASE_URL || 'http://localhost:5000',
    });
  }

  async processFeedback(feedbackData) {
    return this.triggerWorkflow('process-feedback', {
      ...feedbackData,
      baseUrl: process.env.BASE_URL || 'http://localhost:5000',
    });
  }

  async generateLeadNotification(leadData) {
    return this.triggerWorkflow('lead-notification', {
      ...leadData,
      baseUrl: process.env.BASE_URL || 'http://localhost:5000',
    });
  }
}

module.exports = { N8nService };