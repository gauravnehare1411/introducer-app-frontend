import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Spinner, Form } from 'react-bootstrap';

const ReferralDetailsModal = ({
  show,
  onHide,
  referral,
  onSaveStatus,
  formatCreatedAt,
}) => {
  const [statusDraft, setStatusDraft] = useState('Pending');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (referral) {
      setStatusDraft(referral.status || 'Pending');
    } else {
      setStatusDraft('Pending');
    }
  }, [referral, show]);

  const handleSave = async () => {
    if (!referral?._id) return;
    try {
      setSaving(true);
      await onSaveStatus(statusDraft);
      onHide();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Referral Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!referral ? (
          <div className="text-center py-3"><Spinner animation="border" /></div>
        ) : (
          <div className="small">
            <Row className="mb-2">
              <Col md={5} className="text-muted">Name</Col>
              <Col md={7}>{referral.firstName} {referral.lastName}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={5} className="text-muted">Email</Col>
              <Col md={7}>{referral.referralEmail}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={5} className="text-muted">Phone</Col>
              <Col md={7}>{referral.referralPhone || '—'}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={5} className="text-muted">Purpose</Col>
              <Col md={7}>{referral.purpose || '—'}</Col>
            </Row>
            <Row className="mb-2">
              <Col md={5} className="text-muted">Comment</Col>
              <Col md={7} style={{ whiteSpace: 'pre-wrap' }}>{referral.comment || '—'}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={5} className="text-muted">Created At</Col>
              <Col md={7}>{formatCreatedAt(referral.created_at)}</Col>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={saving}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving || !referral}>
          {saving ? 'Saving…' : 'Save Status'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReferralDetailsModal;
