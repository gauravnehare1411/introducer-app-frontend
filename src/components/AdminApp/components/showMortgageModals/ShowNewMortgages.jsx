import React from 'react';
 
export default function ShowNewMortgageDetails({ selectedMortgage, setSelectedMortgage, handleEditApplication }) {
  return (
    <div className="mortgage-detail-popup">
      <div className="popup-header">
        <h2>New Mortgage Application Details</h2>
        <button
          className="close-x-button"
          onClick={() => setSelectedMortgage(null)}
        >
          X
        </button>
      </div>
      <table>
        <tr><th>Application ID</th><td>{selectedMortgage._id}</td></tr>
        <tr><th>Customer ID</th><td>{selectedMortgage.user_id}</td></tr>
        <tr><th>Is Looking For Mortgage</th><td>{selectedMortgage.isLookingForMortgage ? 'Yes' : 'No'}</td></tr>
        <tr><th>New Mortgage Type</th><td>{selectedMortgage.newMortgageType}</td></tr>
        <tr><th>Have you found the property?</th><td>{selectedMortgage.foundProperty}</td></tr>
        <tr><th>Deposit Amount</th><td>{selectedMortgage.depositAmount}</td></tr>
        <tr><th>Purchase Price</th><td>{selectedMortgage.purchasePrice}</td></tr>
        <tr><th>Loan to value</th><td>{selectedMortgage.loanToValue2} %</td></tr>
        <tr><th>Loan Amount</th><td>{selectedMortgage.loanAmount}</td></tr>
        <tr><th>Source of Deposit</th><td>{selectedMortgage.sourceOfDeposit}</td></tr>
        <tr><th>Loan Term</th><td>{selectedMortgage.loanTerm} Years</td></tr>
        <tr><th>Payment Method</th><td>{selectedMortgage.newPaymentMethod}</td></tr>
        <tr><th>Reference</th><td>{selectedMortgage.reference2}</td></tr>
        <tr><th>Status</th><td>{selectedMortgage.status}</td></tr>
        <tr><th>Created Date</th><td>{new Date(selectedMortgage.created_at).toLocaleDateString()}</td></tr>
        <tr>
          <td colSpan="2">
            <button className="mortgage-edit-button" onClick={() => handleEditApplication(selectedMortgage)}>
              Edit
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}