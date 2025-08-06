const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth APIs
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Listing APIs
  async getListings(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value as string);
      }
    });

    return this.request(`/listings?${params.toString()}`);
  }

  async getListing(id: string) {
    return this.request(`/listings/${id}`);
  }

  async createListing(formData: FormData) {
    return this.request('/listings', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set the content type for FormData
    });
  }

  async updateListing(id: string, formData: FormData) {
    return this.request(`/listings/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {}, // Let browser set the content type for FormData
    });
  }

  async deleteListing(id: string) {
    return this.request(`/listings/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserListings() {
    return this.request('/listings/user/listings');
  }

  // User APIs
  async getUserStats(userId: string) {
    return this.request(`/users/${userId}/stats`);
  }

  async getUserActivities(userId: string) {
    return this.request(`/users/${userId}/activities`);
  }

  async getUserProperties(userId: string) {
    return this.request(`/users/${userId}/properties`);
  }

  // Lead APIs
  async submitLead(listingId: string, leadData: any) {
    return this.request(`/leads/${listingId}`, {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }
}

export const apiService = new ApiService();