import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from "../../../../MortgageApp/store";
import '../../../Views/DataDisplay.css';

export default function ApplicationType() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("applicationTypeData");
  }, [fetchFormData]);

  const formatLoanPurposes = (purposes) => {
    if (!purposes || !Array.isArray(purposes)) return 'Not specified';
    return purposes.join(', ');
  };

  const renderApplicationTypeSection = (appData, title) => {
    if (!appData) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="details-grid">
          <div className="detail-item full-width">
            <span className="detail-label">Loan Purpose(s):</span>
            <span className="detail-value">{formatLoanPurposes(appData.loanPurpose)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Loan Type:</span>
            <span className="detail-value">{appData.loanType || 'Not specified'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="data-display-page">
      <div className="form-buttons">
        <div className="form-buttons-card">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="back-button"
            aria-label="Go back to previous page"
          >
            Back
          </button>
        </div>
      </div>

      <div className="data-container">
        {formData?.applicationTypeData?.applicant ? ( 
          renderApplicationTypeSection(formData.applicationTypeData.applicant, 'Applicant Application Type')
        ):(
          <span className="no-detail-label">No data provided</span>
        )}
        
        {formData?.applicationTypeData?.partner && 
          renderApplicationTypeSection(formData.applicationTypeData.partner, 'Partner Application Type')}
      </div>
    </div>
  );
}