import axios from 'axios';

const SERVER_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default api; 