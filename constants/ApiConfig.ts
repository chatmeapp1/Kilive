
// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://6fe3be7b-dd26-4238-bd61-bc5731f96c52-00-279dv1qzrdclf.pike.replit.dev',
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    
    // Live endpoints
    START_LIVE: '/api/live/start',
    END_LIVE: '/api/live/end',
    JOIN_LIVE: '/api/live/join',
    LEAVE_LIVE: '/api/live/leave',
    
    // Gift endpoints
    SEND_GIFT: '/api/gift/send',
    GET_GIFTS: '/api/gift/list',
    
    // User endpoints
    GET_PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    GET_BALANCE: '/api/user/balance',
    
    // Agency endpoints
    ADD_HOST: '/api/agency/add-host',
    GET_HOSTS: '/api/agency/hosts',
    GET_HOST_INCOME: '/api/agency/host-income',
    
    // Admin endpoints
    GET_ALL_USERS: '/api/admin/users',
    CREATE_GIFT: '/api/admin/gifts',
  }
};

// Helper function to build full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper for API calls with token
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = getApiUrl(endpoint);
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};
