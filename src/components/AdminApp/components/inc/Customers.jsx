import { useEffect, useState } from "react";
import api from "../../../../api";
import { Container, Table, Spinner, Alert, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/admin/users/${"customer"}`);
        setRegistrations(res.data || []);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("Failed to load registrations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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

  const handleRowClick = (userId) => {
    navigate(`/admin/customer-applications/${userId}`);
  }

  const totalCustomers = registrations.length;

  return (
    <>
    <Container className="py-5">
      <h2 className="mb-4">Customers</h2>
      <Badge className="m-2 p-2" bg="primary" pill title="Total users">Total Customers - {totalCustomers}</Badge>

      {registrations.length === 0 ? (
        <Alert variant="info">No registrations found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>referralId</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id} onClick={() => handleRowClick(reg.userId)}>
                <td>{reg.name}</td>
                <td>{reg.email}</td>
                <td>{reg.contactnumber}</td>
                <td className="text-capitalize">{reg.referralId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
    </>
  );
}
