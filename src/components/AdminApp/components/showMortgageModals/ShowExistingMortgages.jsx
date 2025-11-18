
export default function ShowExistingMortgageDetails({ selectedMortgage, setSelectedMortgage, handleEditApplication }) {
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
        <tr><th>Customer ID</th><td>{selectedMortgage.user_id}</td></tr>
        <tr><th>Status</th><td>{selectedMortgage.status}</td></tr>
        <tr><th>Created Date</th><td>{new Date(selectedMortgage.created_at).toLocaleDateString()}</td></tr>
        <tr><th>Has Mortgage</th><td>{selectedMortgage.hasMortgage ? 'Yes' : 'No'}</td></tr>
        <tr><th>Payment Method</th><td>{selectedMortgage.paymentMethod}</td></tr>
        <tr><th>Estimated Property Value</th><td>{selectedMortgage.estPropertyValue}</td></tr>
        <tr><th>Mortgage Amount</th><td>{selectedMortgage.mortgageAmount}</td></tr>
        <tr><th>Loan to value</th><td>{selectedMortgage.loanToValue1} %</td></tr>
        <tr><th>Further Advance</th><td>{selectedMortgage.furtherAdvance}</td></tr>
        <tr><th>Mortgage Type</th><td>{selectedMortgage.mortgageType}</td></tr>
        <tr><th>Product Rate Type</th><td>{selectedMortgage.productRateType}</td></tr>
        <tr><th>Reference</th><td>{selectedMortgage.reference1 || "-"}</td></tr>
        <tr><td colSpan="2">
          <button className="mortgage-edit-button" onClick={() => handleEditApplication(selectedMortgage)}>
            Edit
          </button>
        </td></tr>
      </table>
    </div>
  );
}
