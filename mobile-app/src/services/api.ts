import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend URL'inizi buraya yazın
const API_URL = 'https://mobile-url-shortener.netlify.app/api'; // Geliştirme için
// const API_URL = 'https://your-app.netlify.app/api'; // Production için

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekle
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;
