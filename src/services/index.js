import axios from 'axios';

const baseURL = 'http://localhost:3333';
export const photoURL = `${baseURL}/public/uploads/`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
