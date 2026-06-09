import axios from 'axios';

// Configuración centralizada de Axios apuntando a tu servidor Node.js
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, // Si el servidor tarda más de 10 segundos, cancela la petición
});

// INTERCEPTOR: Este truco inyecta el token JWT automáticamente en los Headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;