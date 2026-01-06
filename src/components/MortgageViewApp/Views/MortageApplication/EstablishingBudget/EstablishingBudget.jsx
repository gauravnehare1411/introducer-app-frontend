import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from "../../../../MortgageApp/store";
import '../../../Views/DataDisplay.css';

export default function EstablishingBudget() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("establishBudgetData");
  }, [fetchFormData]);

  const renderBudgetSection = (establishBudgetData, title) => {
    if (!establishBudgetData) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Plans to Repay Early:</span>
            <span className="detail-value">{establishBudgetData.netDisposableIncome}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Plans to Move Home:</span>
            <span className="detail-value">{establishBudgetData.monthlyMortgageAllocation}</span>
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
        {formData?.establishBudgetData?.applicant ? (
          renderBudgetSection(formData.establishBudgetData.applicant, 'Applicant Budget')
        ):(
          <span className="no-detail-label">No data provided</span>
        )}
        
        {formData?.establishBudgetData?.partner && 
          renderBudgetSection(formData.establishBudgetData.partner, 'Partner Budget')}
      </div>
    </div>
  );
}