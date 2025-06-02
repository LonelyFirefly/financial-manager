import axios from 'axios';
import { once } from 'lodash';

// In development, use the full URL. In production, use relative path
const SERVER_URL = import.meta.env.PROD ? '/api' : import.meta.env.VITE_API_URL;

const createApiInstance = () =>
  axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

const api = once(createApiInstance)();

export default api;
