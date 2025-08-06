import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner, Button, Col, Row, Modal } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const MyReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW: modal state
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [details, setDetails] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await api.get('/my-referrals');
        setReferrals(res.data);
      } catch (err) {
        console.error('Failed to fetch referrals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  const parseCreatedAt = (v) => {
    if (!v) return null;
    if (typeof v === 'string') {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof v === 'object' && v.$date) {
      const d = new Date(v.$date);
      return isNaN(d.getTime()) ? null : d;
    }
    try {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  };

  const formatCreatedAtUK = (v) => {
    const d = parseCreatedAt(v);
    if (!d) return '—';
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/London',
    }).format(d);
  };

  // NEW: open details modal and fetch full record
  const openDetails = async (ref) => {
    setShowDetails(true);
    setDetailsLoading(true);
    setDetails(null);
    try {
      // Use whatever id field you have: r.id, r._id, r.referralId.
      const id = ref.id || ref._id || ref.referralId;
      // Adjust the endpoint name if different in your backend
      const { data } = await api.get(`/referrals/${id}`);
      setDetails(data);
    } catch (e) {
      console.error('Failed to fetch referral details:', e);
      // Fallback: at least show the row data we already have
      setDetails(ref);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setShowDetails(false);
    setDetails(null);
  };

  return (
    <Card className="mx-auto mt-4 shadow" style={{ maxWidth: '900px' }}>
      <Card.Body>
        <h4 className="mb-4 text-center">My Referrals</h4>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : referrals.length === 0 ? (
          <p className="text-center">No referrals found.</p>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th style={{width: 60}}>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r, index) => (
                <tr
                  key={r.id || r._id || index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => openDetails(r)}
                  title="Click to view details"
                >
                  <td>{index + 1}</td>
                  <td>{r.firstName} {r.lastName}</td>
                  <td>{r.referralEmail}</td>
                  <td>{r.status}</td>
                  <td>{formatCreatedAtUK(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>

      <Row className="px-3 pb-3">
        <Col xs="6" className="text-start">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </Col>
        <Col xs="6" className="text-end">
          <Button variant="success" onClick={() => navigate('/refer')}>
            Refer Friend or Family
          </Button>
        </Col>
      </Row>

      {/* Details Modal */}
      <Modal show={showDetails} onHide={closeDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>Referral Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsLoading ? (
            <div className="text-center py-3">
              <Spinner animation="border" />
            </div>
          ) : !details ? (
            <div className="text-center text-muted">No details available</div>
          ) : (
            <div className="small">
              <Row className="mb-2">
                <Col md={5} className="text-muted">Name</Col>
                <Col md={7}>{details.firstName} {details.lastName}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={5} className="text-muted">Email</Col>
                <Col md={7}>{details.referralEmail}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={5} className="text-muted">Contact Number</Col>
                <Col md={7}>{details.contactnumber || details.referralPhone || '—'}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={5} className="text-muted">Status</Col>
                <Col md={7}>{details.status}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={5} className="text-muted">Created At</Col>
                <Col md={7}>{formatCreatedAtUK(details.created_at)}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={5} className="text-muted">Comment</Col>
                <Col md={7} style={{ whiteSpace: 'pre-wrap' }}>
                  {details.comment || details.notes || '—'}
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetails}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default MyReferrals;
