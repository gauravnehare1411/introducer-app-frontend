// InnerApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MortgageApplicationForm from './components/MortgageApp/MortgageApplication/MortgageApplicationForm';
import Applications from './components/Applications/Applications';
import EditMortgage from './components/EditMortgage/EditMortgage';
import EditNewMortgage from './components/EditNewMortgage/EditNewMortgage';

const FactFindApp = () => {
  return (
    <div className="inner-app">
      <Routes>
        <Route path="/" element={<MortgageApplicationForm />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/edit-existing-mortgage' element={<EditMortgage />} />
      </Routes>
    </div>
  );
};

export default FactFindApp;