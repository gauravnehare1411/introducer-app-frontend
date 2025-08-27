import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyReferrals from './components/MyReferrals';
import MortgageReferralForm from './components/MortgageReferralForm';


const IntroducerApp = () => {
  return (
    <div className="inner-app">
      <Routes>
        <Route path="/refer" element={<MortgageReferralForm />} />
        <Route path="/" element={<MyReferrals />} />
      </Routes>
    </div>
  );
};

export default IntroducerApp;