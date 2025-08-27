// InnerApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDetails from './components/UserDetails';
import Applications from './components/Applications';
import Registrations from './components/Registrations';


const AdminApp = () => {
  return (
    <div className="inner-app">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/user/:referralId" element={<UserDetails />} />
        <Route path="/applications" element={<Applications />} />
         <Route path="/registrations" element={<Registrations />} />
      </Routes>
    </div>
  );
};

export default AdminApp;