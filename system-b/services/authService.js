import axios from 'axios';

// Configure axios defaults
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to update token on each request
apiClient.interceptors.request.use(async (config) => {
  // Optionally, you can implement logic here to refresh token before each request
  return config;
});

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired (401 error) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = 'http://localhost:3002';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

class AuthService {
  // Check authentication status
  static async checkAuthStatus() {
    try {
      const response = await apiClient.get('/auth/status');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return { authenticated: false };
      }
      throw error;
    }
  }

  // Logout user
  static async logout() {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  }

  // Get user info
  static async getUserInfo(userId) {
    try {
      const response = await apiClient.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw error;
    }
  }

  // Get all users
  static async getAllUsers() {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw error;
    }
  }

  // Update user profile
  static async updateUserProfile(userId, profileData) {
    try {
      const response = await apiClient.put(`/user/${userId}`, profileData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw error;
    }
  }

  // Change password
  static async changePassword(userId, passwordData) {
    try {
      const response = await apiClient.put(`/user/${userId}/password`, passwordData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw error;
    }
  }
}

export default AuthService;