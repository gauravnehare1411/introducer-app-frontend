// InnerApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDetails from './components/UserDetails';
import Applications from './components/Applications';
import Customers from './components/inc/Customers';
import FactFindApp from './FactFindApp/FactFindApp';
import CustomerApplications from './components/CustomerApplications';


const AdminApp = () => {
  return (
    <div className="inner-app">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/user/:referralId" element={<UserDetails />} />
        <Route path="/customer-applications" element={<Applications />} />
        <Route path="/customers" element={<Customers />} />
        <Route path='/all-customer-applications' element={<CustomerApplications />} />
        <Route path="/my-applications/*" element={<FactFindApp />} />
      </Routes>
    </div>
  );
};

export default AdminApp;