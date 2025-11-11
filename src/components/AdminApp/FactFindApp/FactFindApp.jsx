import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MortgageApplicationForm from './components/MortgageApp/MortgageApplication';
import Applications from './components/Applications/Applications';
import EditMortgage from './components/EditMortgage/EditMortgage';
import UploadDocuments from './components/MortgageApp/Documents/UploadDocuments';

const FactFindApp = () => {
  return (
    <div className="inner-app">
      <Routes>
        <Route path="/" element={<Applications />} />
        <Route path='/form' element={<MortgageApplicationForm />} />
        <Route path='/edit-mortgage' element={<EditMortgage />} />
        <Route path='/upload-documents' element={<UploadDocuments />} />
      </Routes>
    </div>
  );
};

export default FactFindApp;