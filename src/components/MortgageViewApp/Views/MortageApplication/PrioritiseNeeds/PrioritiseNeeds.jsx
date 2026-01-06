import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from "../../../../MortgageApp/store";
import '../../../Views/DataDisplay.css';

export default function PrioritiseNeeds() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("prioritiseNeedsData");
  }, [fetchFormData]);

  const renderNeedsSection = (needsData, title) => {
    if (!needsData) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        
        <div className="details-grid">
          <div className="detail-item full-width">
            <span className="detail-label">Important Features:</span>
            <span className="detail-value">{needsData.importantFeatures || 'Not specified'}</span>
          </div>
          
          <div className="detail-item full-width">
            <span className="detail-label">Reason for Importance:</span>
            <span className="detail-value">{needsData.importanceReason || 'Not specified'}</span>
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
        {formData?.prioritiseNeedsData?.applicant ? (
          renderNeedsSection(formData.prioritiseNeedsData.applicant, 'Applicant Priorities')
        ):(
          <span className="no-detail-label">No data provided</span>
        )}
        
        {formData?.prioritiseNeedsData?.partner && 
          renderNeedsSection(formData.prioritiseNeedsData.partner, 'Partner Priorities')}
      </div>
    </div>
  );
}