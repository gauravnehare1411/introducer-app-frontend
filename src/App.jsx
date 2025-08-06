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
import ResetPasswordPage from './components/UserApp/ResetPasswordPage/ResetPasswordPage';
import EditProfile from './components/UserApp/EditProfile/EditProfile';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Applications from './components/AdminApp/Applications';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
      setUserRole(localStorage.getItem('role'));
    };
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <Router basename="/introducer">
      <AppNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={userRole} setUserRole={setUserRole}/>
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={
            <LoginPage 
              onLogin={
                () => {
                  setIsLoggedIn(true);
                  setUserRole(localStorage.getItem('role'));
                }}
            />} 
          />
          <Route path="/register" element={
            <RegisterPage 
              onRegister={
                () => {
                  setIsLoggedIn(true);
                  setUserRole(localStorage.getItem('role'));
                }}
            />}  
          />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route
            path="/refer"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <MortgageReferralForm />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/my-referrals"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <MyReferrals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/user/:referralId"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Applications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
