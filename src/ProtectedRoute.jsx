import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('role');
  const location = useLocation();

  const isAllowed = token && allowedRoles.includes(userRole);

  return isAllowed ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
