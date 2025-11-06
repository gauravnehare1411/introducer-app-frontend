import { FaTrash, FaSpinner } from "react-icons/fa";

export default function FrontMortgage({mortgageData, setSelectedMortgage, handleDelete, showExistingMortgages, loading}) {
  return (
    <div className="profile-row">
        <span className="profile-label"> { showExistingMortgages? "Existing " : "New " }Mortgage Applications</span>
        {mortgageData.length > 0 ? (
            <div className="mortgage-details table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mortgageData.map((mortgage, index) => (
                      <tr key={mortgage._id} onClick={() => setSelectedMortgage(mortgage)} style={{ cursor: 'pointer' }}>
                        <td>{mortgage._id.slice(-6)}</td>
                        <td>{mortgage.form_data.customerName || "N/A"}</td>
                        <td>{mortgage.form_data.customerEmail || "N/A"}</td>
                        <td>{mortgage.form_data.customerPhone || "N/A"}</td>
                        <td>
                          {loading ? (
                            <FaSpinner className="text-danger spin" />
                          ):(
                            <FaTrash 
                            className="text-danger p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(mortgage._id)
                            }}
                            title="Delete" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            ) : (
            <p>No existing mortgage applications available</p>
        )}
    </div>
  );
}
