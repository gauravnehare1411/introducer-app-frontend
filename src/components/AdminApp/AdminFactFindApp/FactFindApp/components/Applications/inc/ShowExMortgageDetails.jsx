
export default function ShowExMortgageDetails({selectedMortgage, handleEditApplication, setSelectedMortgage}) {
  return (
    <div className="mortgage-detail-popup">
        <div className="popup-header">
            <h2>Existing Mortgage Details</h2>
            <button 
              className="close-x-button"
              onClick={() => setSelectedMortgage(null)}
            >
              X
            </button>
        </div>
        <table>
            <tr><th>Application ID</th><td>{selectedMortgage._id}</td></tr>
            <tr><th>Customer ID</th><td>{selectedMortgage.customerId}</td></tr>
            <tr><th>Name</th><td>{selectedMortgage.form_data.customerName}</td></tr>
            <tr><th>Email</th><td>{selectedMortgage.form_data.customerEmail}</td></tr>
            <tr><th>Phone</th><td>{selectedMortgage.form_data.customerPhone}</td></tr>
            <tr><th>Status</th><td>{selectedMortgage.status}</td></tr>
            <tr><th>Created Date</th><td>{new Date(selectedMortgage.created_at).toLocaleDateString()}</td></tr>
            <tr><th>Has Mortgage</th><td>{selectedMortgage.form_data.hasMortgage ? 'Yes' : 'No'}</td></tr>
            <tr><th>Payment Method</th><td>{selectedMortgage.form_data.paymentMethod}</td></tr>
            <tr><th>Estimated Property Value</th><td>{selectedMortgage.form_data.estPropertyValue}</td></tr>
            <tr><th>Mortgage Amount</th><td>{selectedMortgage.form_data.mortgageAmount}</td></tr>
            <tr><th>Loan to value</th><td>{selectedMortgage.form_data.loanToValue1} %</td></tr>
            <tr><th>Further Advance</th><td>{selectedMortgage.form_data.furtherAdvance}</td></tr>
            <tr><th>Mortgage Type</th><td>{selectedMortgage.form_data.mortgageType}</td></tr>
            <tr><th>Product Rate Type</th><td>{selectedMortgage.form_data.productRateType}</td></tr>
            <tr><th>ID Proof</th><td><a href={selectedMortgage?.uploaded_files?.id_proof?.download_link}>{selectedMortgage?.uploaded_files?.id_proof?.file_name}</a></td></tr>
            <tr><th>Address Proof</th><td><a href={selectedMortgage?.uploaded_files?.address_proof?.download_link}>{selectedMortgage?.uploaded_files?.address_proof?.file_name}</a></td></tr>
            <tr><th>Bank Statement</th><td><a href={selectedMortgage?.uploaded_files?.bank_statement?.download_link}>{selectedMortgage?.uploaded_files?.bank_statement?.file_name}</a></td></tr>
            <tr><th>Payslip</th><td><a href={selectedMortgage?.uploaded_files?.payslip?.download_link}>{selectedMortgage?.uploaded_files?.payslip?.file_name}</a></td></tr>
            <tr><th>Reference</th><td>{selectedMortgage.form_data.reference1 || "-"}</td></tr>
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
