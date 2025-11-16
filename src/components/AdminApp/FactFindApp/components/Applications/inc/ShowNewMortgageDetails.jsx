import React from 'react';

export default function ShowNewMortgageDetails({selectedNewMortgage, handleEditApplication, setSelectedNewMortgage}) {
  const mortgage = selectedNewMortgage.form_data;
  return (
    <div className="mortgage-detail-popup">
        <div className="popup-header">
            <h2>New Mortgage Application Details</h2>
            <button 
              className="close-x-button"
              onClick={() => setSelectedNewMortgage(null)}
            >
              X
            </button>
        </div>
        <table>
            <tr><th>Application ID</th><td>{selectedNewMortgage._id}</td></tr>
            <tr><th>Customer ID</th><td>{selectedNewMortgage.customerId}</td></tr>
            <tr><th>Name</th><td>{mortgage.customerName}</td></tr>
            <tr><th>Email</th><td>{mortgage.customerEmail}</td></tr>
            <tr><th>Phone</th><td>{mortgage.customerPhone}</td></tr>
            <tr><th>Is Looking For Mortgage</th><td>{mortgage.isLookingForMortgage ? 'Yes' : 'No'}</td></tr>
            <tr><th>New Mortgage Type</th><td>{mortgage.newMortgageType}</td></tr>
            <tr><th>Have you found the property?</th><td>{mortgage.foundProperty}</td></tr>
            <tr><th>Deposit Amount</th><td>{mortgage.depositAmount}</td></tr>
            <tr><th>Purchase Price</th><td>{mortgage.purchasePrice}</td></tr>
            <tr><th>Loan to value</th><td>{mortgage.loanToValue2} %</td></tr>
            <tr><th>Loan Amount</th><td>{mortgage.loanAmount}</td></tr>
            <tr><th>Source of Deposit</th><td>{mortgage.sourceOfDeposit}</td></tr>
            <tr><th>Loan Term</th><td>{mortgage.loanTerm} Years</td></tr>
            <tr><th>Payment Method</th><td>{mortgage.newPaymentMethod}</td></tr>
            <tr><th>ID Proof</th><td><a href={selectedNewMortgage?.uploaded_files?.id_proof?.download_link}>{selectedNewMortgage?.uploaded_files?.id_proof?.file_name}</a></td></tr>
            <tr><th>Address Proof</th><td><a href={selectedNewMortgage?.uploaded_files?.address_proof?.download_link}>{selectedNewMortgage?.uploaded_files?.address_proof?.file_name}</a></td></tr>
            <tr><th>Bank Statement</th><td><a href={selectedNewMortgage?.uploaded_files?.bank_statement?.download_link}>{selectedNewMortgage?.uploaded_files?.bank_statement?.file_name}</a></td></tr>
            <tr><th>Payslip</th><td><a href={selectedNewMortgage?.uploaded_files?.payslip?.download_link}>{selectedNewMortgage?.uploaded_files?.payslip?.file_name}</a></td></tr>
            <tr><th>Reference</th><td>{mortgage.reference2}</td></tr>
            <tr><th>Status</th><td>{selectedNewMortgage.status}</td></tr>
            <tr><th>Created Date</th><td>{new Date(selectedNewMortgage.created_at).toLocaleDateString()}</td></tr>
            <tr>
                <td colSpan="2">
                    <button className="mortgage-edit-button" onClick={() => handleEditApplication(selectedNewMortgage)}>
                    Edit
                    </button>
                </td>
            </tr>
        </table>
    </div>
  );
}
