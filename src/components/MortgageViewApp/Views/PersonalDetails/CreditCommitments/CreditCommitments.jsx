import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormStore from "../../../../MortgageApp/store";
import '../../../Views/DataDisplay.css';

export default function CreditCommitments() {
  const { formData, fetchFormData } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData("creditCommitmentsData");
  }, [fetchFormData]);

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '£0';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(amount));
  };

  const renderCommitment = (commitment, index) => {
    return (
      <div key={`commitment-${index}`} className="commitment-card">
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Credit Type:</span>
            <span className="detail-value">{commitment.creditType || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Lender:</span>
            <span className="detail-value">{commitment.lenderName || 'Not specified'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Outstanding Amount:</span>
            <span className="detail-value">{formatCurrency(commitment.amountOutstanding)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Monthly Payment:</span>
            <span className="detail-value">{formatCurrency(commitment.monthlyRepayment)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Remaining Term:</span>
            <span className="detail-value">{commitment.monthsOutstanding || '0'} months</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Considering Consolidation:</span>
            <span className="detail-value">{commitment.consideringConsolidation || 'No'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Repay Before Mortgage:</span>
            <span className="detail-value">{commitment.repayBeforeMortgage || 'No'}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCommitmentsSection = (data, title) => {
    if (!data || data.hasExCreditCommit !== 'Yes' || !data.creditCommitments?.length) return null;

    return (
      <div className={`details-card ${title.includes('Partner') ? 'partner-card' : ''}`}>
        <h2>{title}</h2>
        {data.creditCommitments.map((commitment, index) => (
          renderCommitment(commitment, index)
        ))}
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
        {formData?.creditCommitmentsData?.applicant ? (
          renderCommitmentsSection(formData.creditCommitmentsData.applicant, 'Applicant Credit Commitments')
        ):(
          <span className="no-detail-label">No data provided</span>
        )}
        
        {formData?.creditCommitmentsData?.partner && 
          renderCommitmentsSection(formData.creditCommitmentsData.partner, 'Partner Credit Commitments')}
      </div>
    </div>
  );
}