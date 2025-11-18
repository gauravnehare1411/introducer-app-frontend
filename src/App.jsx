import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import AppNavbar from './components/Navbar/Navbar';
import ResetPasswordPage from './components/UserApp/ResetPasswordPage/ResetPasswordPage';
import EditProfile from './components/UserApp/EditProfile/EditProfile';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FactFindApp from './components/FactFindApp/FactFindApp';
import AdminApp from './components/AdminApp/AdminApp';
import IntroducerApp from './components/IntroducerApp/IntroducerApp';
import IntroducerRegister from './components/IntroducerRegister';
import HomePage from './components/HomePage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles') || '[]'));

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
      setUserRoles(JSON.parse(localStorage.getItem('roles') || '[]'));
    }; 
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <Router basename='portal'>
      <AppNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRoles={userRoles} setUserRoles={setUserRoles}/>
      <Container style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path='/' element={ <HomePage isLoggedIn={isLoggedIn} userRoles={userRoles} /> } />
          <Route path="/sign-in" element={
            <LoginPage
              onLogin={
                () => {
                  setIsLoggedIn(true);
                  setUserRoles(JSON.parse(localStorage.getItem('roles') || '[]'));
                }}
            />}
          />

          <Route path="/customer/sign-up" element={
            <RegisterPage 
              onRegister={
                () => {
                  setIsLoggedIn(true);
                  setUserRoles(JSON.parse(localStorage.getItem('roles') || '[]'));
                }}
            />}
          />

          <Route path="/introducer/sign-up" element={
            <IntroducerRegister
              onRegister={
                () => {
                  setIsLoggedIn(true);
                  setUserRoles(JSON.parse(localStorage.getItem('roles') || '[]'));
                }}
            />}
          />

          <Route path='/reset-password' element={<ResetPasswordPage />} />

          <Route
            path="/introducer/*"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <IntroducerApp />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute allowedRoles={['customer', 'user', 'admin']}>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/mortgage/*'
            element={
              <ProtectedRoute allowedRoles={['customer', 'admin']}>
                <FactFindApp />
              </ProtectedRoute>
            }
            >
          </Route>
        </Routes>
      </Container>
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
