import axios from 'axios';

const api = axios.create({
  baseURL: 'https://administered-maintenance-car-vienna.trycloudflare.com/',
});

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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const skipAuth = ['/token', '/register'];
    const isAuthEndpoint = skipAuth.some((url) => config.url.includes(url));

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    
    const originalRequest = error.config;
    const skipAuth = ['/token', '/register'];
    const isAuthEndpoint = skipAuth.some(url => originalRequest.url.includes(url));
    
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      
      if (isRefreshing) {
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
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken || refreshToken === 'null' || refreshToken === 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        window.location.href = '/app/sign-in';
        return Promise.reject(error);
      }
      
      try {
        const response = await axios.post(
          'https://administered-maintenance-car-vienna.trycloudflare.com/token/refresh',
          { refresh_token: refreshToken }
        );
        
        const { access_token, refresh_token, token_type, expires_in, roles } = response.data;
        
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('token_type', token_type);
        localStorage.setItem('expires_in', expires_in);

        if (roles) {
          localStorage.setItem('roles', JSON.stringify(roles));
        }
        
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        processQueue(null, access_token);
        
        return api(originalRequest);
      } catch (refreshError) {
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