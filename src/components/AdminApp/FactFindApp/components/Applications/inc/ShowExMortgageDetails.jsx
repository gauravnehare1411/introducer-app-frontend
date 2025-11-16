
export default function ShowExMortgageDetails({selectedMortgage, handleEditApplication, setSelectedMortgage}) {
    const mortgage = selectedMortgage.form_data;
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
            <tr><th>Status</th><td>{selectedMortgage.status}</td></tr>
            <tr><th>Created Date</th><td>{new Date(selectedMortgage.created_at).toLocaleDateString()}</td></tr>
            <tr><th>Has Mortgage</th><td>{mortgage.hasMortgage ? 'Yes' : 'No'}</td></tr>
            <tr><th>Payment Method</th><td>{mortgage.paymentMethod}</td></tr>
            <tr><th>Estimated Property Value</th><td>{mortgage.estPropertyValue}</td></tr>
            <tr><th>Mortgage Amount</th><td>{mortgage.mortgageAmount}</td></tr>
            <tr><th>Loan to value</th><td>{mortgage.loanToValue1} %</td></tr>
            <tr><th>Further Advance</th><td>{mortgage.furtherAdvance}</td></tr>
            <tr><th>Mortgage Type</th><td>{mortgage.mortgageType}</td></tr>
            <tr><th>Product Rate Type</th><td>{mortgage.productRateType}</td></tr>
            <tr><th>Reference</th><td>{mortgage.reference1 || "-"}</td></tr>
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
