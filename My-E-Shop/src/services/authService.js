// IMPORTANT: Make sure you rename this file from 'authService' to 'authService.js'
import api from './api';

const login = async (username, password) => {
  const response = await api.post('/auth/signin', { username, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const signup = (username, email, password) => {
  return api.post('/auth/signup', {
    username,
    email,
    password,
    role: ['user'],
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    return null;
  }
};

const authService = {
  login,
  signup,
  logout,
  getCurrentUser,
};

export default authService;
