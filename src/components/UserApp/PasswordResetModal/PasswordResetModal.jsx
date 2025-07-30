import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import api from '../../../api';
import { toast } from 'react-toastify';

const PasswordResetModal = ({ show, onHide, emailRequired = true, defaultEmail = '' }) => {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/user/password-reset-request', { email });
      toast.success('Password reset link sent to your email.');
      onHide();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {emailRequired && (
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordResetModal;
