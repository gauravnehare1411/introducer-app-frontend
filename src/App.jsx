import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import MortgageReferralForm from './components/MortgageReferralForm';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MyReferrals from './components/MyReferrals';
import ProtectedRoute from './ProtectedRoute';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import AdminDashboard from './components/AdminApp/AdminDashboard';
import UserDetails from './components/AdminApp/UserDetails';
import AppNavbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    alert("Logout successful!");
    window.location.href = '/introducer/login';
  };

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
    };
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <Router basename="/introducer">
      <AppNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<RegisterPage onRegister={() => setIsLoggedIn(true)} />} />
          <Route
            path="/refer"
            element={
              <ProtectedRoute>
                <MortgageReferralForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-referrals"
            element={
              <ProtectedRoute>
                <MyReferrals />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/user/:referralId" element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
