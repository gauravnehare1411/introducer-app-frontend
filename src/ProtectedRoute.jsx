import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const location = useLocation();

  return isLoggedIn
    ? children
    : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
