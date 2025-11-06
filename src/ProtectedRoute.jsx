import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('access_token');
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const location = useLocation();

  const isAllowed = token && userRoles.some(role => allowedRoles.includes(role));

  return isAllowed ? children : <Navigate to="/customer/sign-up" state={{ from: location }} replace />;
};

export default ProtectedRoute;