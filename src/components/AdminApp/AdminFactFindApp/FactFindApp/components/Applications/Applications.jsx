import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Applications.css';
import api from '../../../../../../api';
import { toast } from 'react-toastify';
import { Button, } from 'react-bootstrap';
import FrontMortgage from './inc/FrontMortgage';
import ShowNewMortgageDetails from './inc/ShowNewMortgageDetails';
import ShowExMortgageDetails from './inc/ShowExMortgageDetails';

export default function Applications() {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedMortgage, setSelectedMortgage] = useState(null);
  const [selectedNewMortgage, setSelectedNewMortgage] = useState(null);
  const navigate = useNavigate();
  const [showExistingMortgages, setShowExistingMortgages] = useState(true);
  const [showNewMortgages, setShowNewMortgages] = useState(false);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('/admin/mortgage-applications');
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching mortgage applications:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleEditApplication = (application) => {
    if (application.form_data.hasMortgage === 'true') {
      navigate('/admin/my-applications/edit-mortgage', {
        state: {
          applicationId: application._id,
          applicationData: application,
          applicationType: 'existing'
        }
      });
    } else if (application.form_data.isLookingForMortgage === 'true') {
      navigate('/admin/my-applications/edit-mortgage', {
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
      setLoading(true);
      await api.delete(`/admin/mortgage-application/${applicationId}`);
      setUserDetails(prev => prev.filter(app => app._id !== applicationId));
      setSelectedMortgage(null);
      setSelectedNewMortgage(null);
      toast.success("Application deleted successfully.");
    } catch (error) {
      console.error('Error deleting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowExistingMortgages = () => {
    setShowExistingMortgages(true);
    setShowNewMortgages(false);
  }

  const handleShowNewMortgages = () => {
    setShowExistingMortgages(false);
    setShowNewMortgages(true);
  }

  if (!userDetails) return <p>Loading mortgage applications...</p>;


  const existingMortgages = userDetails.filter(
    app => app.form_data && app.form_data.hasMortgage === "true"
  );

  const newMortgages = userDetails.filter(
    app => app.form_data && app.form_data.isLookingForMortgage === "true"
  );

  return (
    <div>
      <div style={{ display: "flex", height: "auto" }}>
        <div className="profile-container" >

          <div className="admin-buttons-container">
            <Button
              variant="danger"
              className="admin-back-btn"
              onClick={() => navigate('/admin')}
            >
              Back
            </Button>

            <div className="admin-mortgage-btns">
              <Button
                variant={showExistingMortgages ? "primary" : "outline-secondary"}
                className="admin-mortgage-btn"
                onClick={handleShowExistingMortgages}
              >
                Existing
              </Button>

              <Button
                variant={showNewMortgages ? "primary" : "outline-secondary"}
                className="admin-mortgage-btn"
                onClick={handleShowNewMortgages}
              >
                New
              </Button>
            </div>
          </div>


          {showExistingMortgages && (
            <FrontMortgage mortgageData={existingMortgages} setSelectedMortgage={setSelectedMortgage} handleDelete={handleDelete} showExistingMortgages={showExistingMortgages} loading={loading} />
          )}

          {showNewMortgages && (
            <FrontMortgage mortgageData={newMortgages} setSelectedMortgage={setSelectedNewMortgage} handleDelete={handleDelete} showExistingMortgages={showExistingMortgages} />
          )}

          {selectedMortgage && (
            <ShowExMortgageDetails selectedMortgage={selectedMortgage} handleEditApplication={handleEditApplication} setSelectedMortgage={setSelectedMortgage} />
          )}

          {selectedNewMortgage && (
            <ShowNewMortgageDetails selectedNewMortgage={selectedNewMortgage} handleEditApplication={handleEditApplication} setSelectedNewMortgage={setSelectedNewMortgage} />
          )}

          <div className="profile-buttons">
            <button className="profile-button back-button" onClick={() => navigate('/admin/my-applications/form')}>
              Add Customer Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}