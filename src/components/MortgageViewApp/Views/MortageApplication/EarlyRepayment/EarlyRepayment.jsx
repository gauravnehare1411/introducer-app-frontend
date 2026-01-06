import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from "../../../../MortgageApp/store";
import '../../../Views/DataDisplay.css';

export default function EarlyRepayment() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("earlyRepaymentData");
  }, [fetchFormData]);

  const renderRepaymentSection = (repaymentData, title) => {
    if (!repaymentData) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Plans to Repay Early:</span>
            <span className="detail-value">{repaymentData.repayPlans || 'No'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Plans to Move Home:</span>
            <span className="detail-value">{repaymentData.moveHome || 'No'}</span>
          </div>
          
          {repaymentData.ercExplanation && (
            <div className="detail-item full-width">
              <span className="detail-label">ERC Explanation:</span>
              <span className="detail-value">{repaymentData.ercExplanation}</span>
            </div>
          )}
          
          {repaymentData.preferredReason && (
            <div className="detail-item full-width">
              <span className="detail-label">Preferred Reason:</span>
              <span className="detail-value">{repaymentData.preferredReason}</span>
            </div>
          )}
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
        {formData?.earlyRepaymentData?.applicant ? (
          renderRepaymentSection(formData.earlyRepaymentData.applicant, 'Applicant Early Repayment Info')
        ):(
          <span className="no-detail-label">No data provided</span>
        )}
        
        {formData?.earlyRepaymentData?.partner && 
          renderRepaymentSection(formData.earlyRepaymentData.partner, 'Partner Early Repayment Info')}
      </div>
    </div>
  );
}