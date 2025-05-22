import axios from 'axios';

// In development, use the full URL. In production, use relative path
const SERVER_URL = import.meta.env.PROD ? '/api' : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default api;