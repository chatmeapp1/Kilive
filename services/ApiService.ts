
import { API_URL } from '@/constants/ApiConfig';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

class ApiService {
  private static instance: ApiService;
  private baseUrl: string = API_URL;
  private authToken: string | null = null;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers, body } = options;

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: this.getHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(phone: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: { phone, password },
    });
  }

  async register(phone: string, password: string, nickname: string) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: { phone, password, nickname },
    });
  }

  // User endpoints
  async getUserProfile(userId: string) {
    return this.request(`/api/user/profile/${userId}`);
  }

  async updateUserProfile(data: any) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: data,
    });
  }

  // Live endpoints
  async getLiveStreams() {
    return this.request('/api/live/streams');
  }

  async createLiveStream(data: any) {
    return this.request('/api/live/create', {
      method: 'POST',
      body: data,
    });
  }

  async endLiveStream(streamId: string) {
    return this.request(`/api/live/end/${streamId}`, {
      method: 'POST',
    });
  }

  // Gift endpoints
  async getGifts() {
    return this.request('/api/gift/list');
  }

  async sendGift(data: any) {
    return this.request('/api/gift/send', {
      method: 'POST',
      body: data,
    });
  }

  // Follow endpoints
  async getFollowing() {
    return this.request('/api/user/following');
  }

  async followUser(userId: string) {
    return this.request('/api/user/follow', {
      method: 'POST',
      body: { userId },
    });
  }

  async unfollowUser(userId: string) {
    return this.request('/api/user/unfollow', {
      method: 'POST',
      body: { userId },
    });
  }

  async getUserProfileDetail(userId: string) {
    return this.request(`/api/user/profile-detail/${userId}`);
  }
}

export default ApiService.getInstance();
