// src/utils/api.js
import axios from 'axios';

// Base URL for your backend API (replace with your backend URL)
const API_URL = 'https://tasktrackerapi-ff1x.onrender.com/api';

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
