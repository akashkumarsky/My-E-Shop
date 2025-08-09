import axios from 'axios';

// Set up the base URL for your Spring Boot application
const API_URL = 'http://localhost:8888/api';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to add the JWT token to every outgoing request if it exists.
 * This is the key to authenticating your API calls.
 */
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
