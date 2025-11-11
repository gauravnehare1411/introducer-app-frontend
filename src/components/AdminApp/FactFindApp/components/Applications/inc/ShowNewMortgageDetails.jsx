import React from 'react';

export default function ShowNewMortgageDetails({selectedNewMortgage, handleEditApplication, setSelectedNewMortgage}) {
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
            <tr><th>Name</th><td>{selectedNewMortgage.form_data.customerName}</td></tr>
            <tr><th>Email</th><td>{selectedNewMortgage.form_data.customerEmail}</td></tr>
            <tr><th>Phone</th><td>{selectedNewMortgage.form_data.customerPhone}</td></tr>
            <tr><th>Is Looking For Mortgage</th><td>{selectedNewMortgage.form_data.isLookingForMortgage ? 'Yes' : 'No'}</td></tr>
            <tr><th>New Mortgage Type</th><td>{selectedNewMortgage.form_data.newMortgageType}</td></tr>
            <tr><th>Have you found the property?</th><td>{selectedNewMortgage.form_data.foundProperty}</td></tr>
            <tr><th>Deposit Amount</th><td>{selectedNewMortgage.form_data.depositAmount}</td></tr>
            <tr><th>Purchase Price</th><td>{selectedNewMortgage.form_data.purchasePrice}</td></tr>
            <tr><th>Loan to value</th><td>{selectedNewMortgage.form_data.loanToValue2} %</td></tr>
            <tr><th>Loan Amount</th><td>{selectedNewMortgage.form_data.loanAmount}</td></tr>
            <tr><th>Source of Deposit</th><td>{selectedNewMortgage.form_data.sourceOfDeposit}</td></tr>
            <tr><th>Loan Term</th><td>{selectedNewMortgage.form_data.loanTerm} Years</td></tr>
            <tr><th>Payment Method</th><td>{selectedNewMortgage.form_data.newPaymentMethod}</td></tr>
            <tr><th>ID Proof</th><td><a href={selectedNewMortgage?.uploaded_files?.id_proof?.download_link}>{selectedNewMortgage?.uploaded_files?.id_proof?.file_name}</a></td></tr>
            <tr><th>Address Proof</th><td><a href={selectedNewMortgage?.uploaded_files?.address_proof?.download_link}>{selectedNewMortgage?.uploaded_files?.address_proof?.file_name}</a></td></tr>
            <tr><th>Bank Statement</th><td><a href={selectedNewMortgage?.uploaded_files?.bank_statement?.download_link}>{selectedNewMortgage?.uploaded_files?.bank_statement?.file_name}</a></td></tr>
            <tr><th>Payslip</th><td><a href={selectedNewMortgage?.uploaded_files?.payslip?.download_link}>{selectedNewMortgage?.uploaded_files?.payslip?.file_name}</a></td></tr>
            <tr><th>Reference</th><td>{selectedNewMortgage.form_data.reference2}</td></tr>
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
