import { useEffect, useState } from "react";
import api from "../../../api";
import { Container, Table, Spinner, Alert, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ShowExistingMortgageDetails from "./showMortgageModals/ShowExistingMortgages";
import ShowNewMortgageDetails from "./showMortgageModals/ShowNewMortgages";

export default function CustomerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMortgage, setSelectedMortgage] = useState(null);
  const [showFilter, setShowFilter] = useState("all");
  const navigate = useNavigate();
  
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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/admin/all-applications-by-user/`);
        setApplications(res.data || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredApplications = applications.filter((app) => {
    if (showFilter === "existing") return app.hasMortgage === true;
    if (showFilter === "new") return app.isLookingForMortgage === true;
    return true;
  });

  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="p-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  

  return (
    <>
      <Container className="py-5">
        <div className="admin-buttons-container">
          <Button
            variant="danger"
            className="admin-back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <ButtonGroup>
            <Button
              variant={showFilter === "existing" ? "primary" : "outline-secondary"}
              className="admin-mortgage-btn"
              onClick={() => setShowFilter("existing")}
            >
              Existing
            </Button>

            <Button
              variant={showFilter === "new" ? "primary" : "outline-secondary"}
              className="admin-mortgage-btn"
              onClick={() => setShowFilter("new")}
            >
              New
            </Button>

            <Button
              variant={showFilter === "all" ? "primary" : "outline-secondary"}
              className="admin-mortgage-btn"
              onClick={() => setShowFilter("all")}
            >
              All
            </Button>
          </ ButtonGroup>
        </div>

        <h2 className="mb-4">Customer Applications</h2>

        {filteredApplications.length === 0 ? (
          <Alert variant="info">No applications found.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Mortgage Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((reg) => (
                <tr
                  key={reg._id}
                  onClick={() => setSelectedMortgage(reg)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{reg._id}</td>
                  <td>{reg.user_email}</td>
                  <td>{reg.mortgageType || reg.newMortgageType}</td>
                  <td>{reg.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {selectedMortgage && selectedMortgage.hasMortgage && (
          <ShowExistingMortgageDetails
            selectedMortgage={selectedMortgage}
            setSelectedMortgage={setSelectedMortgage}
            handleEditApplication={handleEditApplication}
          />
        )}

        {selectedMortgage && selectedMortgage.isLookingForMortgage && (
          <ShowNewMortgageDetails
            selectedMortgage={selectedMortgage}
            setSelectedMortgage={setSelectedMortgage}
            handleEditApplication={handleEditApplication}
          />
        )}
      </Container>
    </>
  );
}
