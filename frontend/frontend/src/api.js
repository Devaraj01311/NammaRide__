import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Frontend env variable
  withCredentials: true, // Send cookies for auth
});

export default api;
