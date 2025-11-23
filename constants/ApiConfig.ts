// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_URL || 'https://c7097ad8-0daa-460b-a96b-ab143929004a-00-2ua20pwpvr1he.pike.replit.dev',
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh-token',
    LOGOUT: '/api/auth/logout',
    GET_ME: '/api/auth/me',

    // Live endpoints
    START_LIVE: '/api/live/start',
    END_LIVE: '/api/live/end',
    JOIN_LIVE: '/api/live/', // append :roomId/join
    GET_ACTIVE_LIVES: '/api/live/active',
    GET_LIVE_DETAILS: '/api/live/', // append :roomId
    GET_LIVE_HOURS_STATS: '/api/live/hours/stats',

    // Gift endpoints
    SEND_GIFT: '/api/gift/send',
    GET_GIFTS: '/api/gift',
    GET_GIFT_HISTORY: '/api/gift/history',

    // User endpoints
    GET_PROFILE: '/api/user/profile/', // append :userId
    UPDATE_PROFILE: '/api/user/profile',
    UPDATE_AVATAR: '/api/user/avatar',
    UPDATE_NICKNAME: '/api/user/nickname',
    UPDATE_SEX: '/api/user/sex',
    UPDATE_AGE: '/api/user/age',
    UPDATE_BIO: '/api/user/bio',
    GET_USER_LEVEL: '/api/user/level/', // append :userId
    GET_USER_INCOME: '/api/user/income/', // append :userId
    GET_USER_FANS: '/api/user/fans/', // append :userId
    GET_USER_COINS: '/api/user/coins',

    // Agency endpoints
    CREATE_AGENCY: '/api/agency/create',
    ADD_HOST: '/api/agency/hosts',
    GET_HOSTS: '/api/agency/hosts',
    GET_AGENCY_INCOME: '/api/agency/income',
    GET_HOST_PERFORMANCE: '/api/agency/hosts/', // append :hostId/performance

    // Admin endpoints
    GET_ALL_USERS: '/api/admin/users',
    TOGGLE_USER_STATUS: '/api/admin/users/', // append :userId/status
    CREATE_GIFT: '/api/admin/gifts',
    GET_ALL_INCOME: '/api/admin/income',
    GET_ANALYTICS: '/api/admin/analytics',
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