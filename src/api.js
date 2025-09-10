import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Variables for token refresh management
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const skipAuth = ['/token', '/register'];
    const isAuthEndpoint = skipAuth.some((url) => config.url.includes(url));

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token attached to:', config.url);
    } else {
      console.log('🚫 Token not attached to:', config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.log('❌ Error:', error.response?.status, error.config?.url);
    console.log('🔄 Checking for refresh token...');
    
    const originalRequest = error.config;
    
    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('🔄 Attempting token refresh...');
      
      if (isRefreshing) {
        console.log('⏳ Refresh already in progress, adding to queue');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      // DEBUG: Check what's actually in localStorage
      console.log('🔍 LocalStorage contents:');
      console.log('access_token:', localStorage.getItem('access_token'));
      console.log('refresh_token:', localStorage.getItem('refresh_token'));
      console.log('roles:', localStorage.getItem('roles'));
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      // FIX: Better check for refresh token existence
      if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        console.log('❌ No valid refresh token available');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        window.location.href = '/app/sign-in';
        return Promise.reject(error);
      }
      
      try {
        console.log('🔄 Requesting new tokens with refresh token');
        
        // Request new tokens using refresh token
        const response = await axios.post(
          'https://introducer-app-backend.onrender.com/token/refresh',
          { refresh_token: refreshToken }
        );
        
        console.log('✅ Token refresh successful:', response.data);
        
        const { access_token, refresh_token, roles } = response.data;
        
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        
        if (roles) {
          localStorage.setItem('roles', JSON.stringify(roles));
        }
        
        // Update the authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        // Process any queued requests
        processQueue(null, access_token);
        
        // Retry the original request
        console.log('🔄 Retrying original request:', originalRequest.url);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError.response?.data);
        // Refresh token is invalid, redirect to login
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        window.location.href = '/app/sign-in';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;