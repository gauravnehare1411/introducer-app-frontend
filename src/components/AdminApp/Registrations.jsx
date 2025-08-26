import { useEffect, useState } from "react";
import api from "../../api";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/registrations");
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

  return (
    <Container className="py-5">
      <h2 className="mb-4">Registrations</h2>

      {registrations.length === 0 ? (
        <Alert variant="info">No registrations found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Mortgage Type</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.fullname}</td>
                <td>{reg.email}</td>
                <td>{reg.phone}</td>
                <td className="text-capitalize">{reg.mortgageType}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
