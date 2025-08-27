import axios from 'axios';

const api = axios.create({
  baseURL: 'https://introducer-app-backend.onrender.com',
});

// Interceptor to attach token

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const skipAuth = ['/token', '/register'];
    const isAuthEndpoint = skipAuth.some((url) => config.url.includes(url));

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token attached');
      } else {
        console.log('🚫 Token not attached');
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;