import axios from 'axios';

// Configure axios defaults
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

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