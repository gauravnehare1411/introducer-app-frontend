import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import api from '../../../../api';
import { toast } from 'react-toastify';

export default function Application() {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedMortgage, setSelectedMortgage] = useState(null);
  const [selectedNewMortgage, setSelectedNewMortgage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('/user/mortgage-applications');
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching mortgage applications:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleEditApplication = (application) => {
    if (application.hasMortgage) {
      navigate('/mortgage/edit-existing-mortgage', { 
        state: { 
          applicationId: application._id,
          applicationData: application,
          applicationType: 'existing'
        } 
      });
    } else {
      navigate('/mortgage/edit-existing-mortgage', { 
        state: { 
          applicationId: application._id,
          applicationData: application,
          applicationType: 'new'
        } 
      });
    }
  };

  const handleDelete = async (applicationId) => {
    try {
      await api.delete(`/user/mortgage-application/${applicationId}`);
      setUserDetails(prev => prev.filter(app => app._id !== applicationId));
      setSelectedMortgage(null);
      setSelectedNewMortgage(null);
      toast.success("Application deleted successfully.");
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  if (!userDetails) return <p>Loading mortgage applications...</p>;

  const existingMortgages = userDetails.filter(app => app.hasMortgage === true);
  const newMortgages = userDetails.filter(app => app.hasMortgage === false);

  return (
    <div>
      <div style={{ display: "flex", height: "auto" }}>
        <div className="profile-container">
          <h1>Your Mortgage Applications</h1>
          
          <div className="profile-row">
            <span className="profile-label">Existing Mortgage Applications</span>
            {existingMortgages.length > 0 ? (
              <div className="mortgage-details">
                {existingMortgages.map((mortgage, index) => (
                  <div key={mortgage._id} className="mortgage-item">
                    <button
                      className="mortgage-button"
                      onClick={() => setSelectedMortgage(mortgage)}
                    >
                      View Application-{(index+1)}
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(mortgage._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No existing mortgage applications available</p>
            )}
          </div>

          <div className="profile-row">
            <span className="profile-label">New Mortgage Applications</span>
            {newMortgages.length > 0 ? (
              <div className="new-mortgage-details">
                {newMortgages.map((newMortgage, index) => (
                  <div key={newMortgage._id} className="new-mortgage-item">
                    <button
                      className="mortgage-button"
                      onClick={() => setSelectedNewMortgage(newMortgage)}
                    >
                      View Application-{(index+1)}
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(newMortgage._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No new mortgage applications available</p>
            )}
          </div>

          {selectedMortgage && (
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
                <tr><th>Renewal Date</th><td>{selectedMortgage.renewalDate}</td></tr>
                <tr><th>Reference</th><td>{selectedMortgage.reference1}</td></tr>
                <tr>
                  <td colSpan="2">
                    <button className="mortgage-edit-button" onClick={() => handleEditApplication(selectedMortgage)}>
                      Edit
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          )}

          {selectedNewMortgage && (
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
                <tr><th>Status</th><td>{selectedNewMortgage.status}</td></tr>
                <tr><th>Created Date</th><td>{new Date(selectedNewMortgage.created_at).toLocaleDateString()}</td></tr>
                <tr><th>Is Looking For Mortgage</th><td>{selectedNewMortgage.isLookingForMortgage ? 'Yes' : 'No'}</td></tr>
                <tr><th>New Mortgage Type</th><td>{selectedNewMortgage.newMortgageType}</td></tr>
                <tr><th>Have you found the property?</th><td>{selectedNewMortgage.foundProperty}</td></tr>
                <tr><th>Deposit Amount</th><td>{selectedNewMortgage.depositAmount}</td></tr>
                <tr><th>Purchase Price</th><td>{selectedNewMortgage.purchasePrice}</td></tr>
                <tr><th>Loan to value</th><td>{selectedNewMortgage.loanToValue2} %</td></tr>
                <tr><th>Loan Amount</th><td>{selectedNewMortgage.loanAmount}</td></tr>
                <tr><th>Source of Deposit</th><td>{selectedNewMortgage.sourceOfDeposit}</td></tr>
                <tr><th>Loan Term</th><td>{selectedNewMortgage.loanTerm} Years</td></tr>
                <tr><th>Payment Method</th><td>{selectedNewMortgage.newPaymentMethod}</td></tr>
                <tr><th>Reference</th><td>{selectedNewMortgage.reference2}</td></tr>
                <tr>
                  <td colSpan="2">
                    <button className="mortgage-edit-button" onClick={() => handleEditApplication(selectedNewMortgage)}>
                      Edit
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          )}
          
          <div className="profile-buttons">
            <button className="profile-button back-button" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}