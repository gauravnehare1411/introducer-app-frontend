import React, { useState } from 'react';
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const RegisterPage = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactnumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', formData);
      setShowModal(true);
      setError('');
    } catch (err) {
      const detail = err.response?.data?.detail || 'Unknown error';
      setError('Registration failed: ' + detail);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const form = new FormData();
      form.append('email', formData.email);
      form.append('code', verificationCode);

      const res = await api.post('/verify-code', form);

      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      onRegister();
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert('Verification failed: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  const handleResendCode = async () => {
    try {
      await api.post('/resend-code', { email: formData.email });
      setResendStatus('Verification code resent successfully.');
    } catch (err) {
      setResendStatus('Failed to resend code: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <Container fluid className="bg-light py-5 px-2">
      <div className="d-flex justify-content-center">
        <Card className="shadow-lg p-4 w-100" style={{ maxWidth: '700px', borderRadius: '20px' }}>
          <Card.Body>
            <h3 className="text-center mb-3" style={{ color: '#0d6efd' }}>
              Register as an Introducer
            </h3>
            <p className="text-muted text-center mb-4">
              Join us as an introducer to refer mortgage clients, track referrals, and earn rewards.
              Get started by filling out the form below.
            </p>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactnumber"
                  value={formData.contactnumber}
                  onChange={handleChange}
                  placeholder="Your contact number"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </Form.Group>
              {error && <div className="text-danger mb-3 text-center">{error}</div>}
              <Button type="submit" className="w-100" variant="primary">
                Register
              </Button>
            </Form>
            <div className="text-center mt-4">
              <span className="text-secondary">Already registered?</span>{' '}
              <Link to="/login" className="text-decoration-none" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                Login here
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Modal for verification code */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the 6-digit code sent to <strong>{formData.email}</strong></p>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleVerifyCode}>Verify & Complete Registration</Button>
        </Modal.Footer>
        <Form.Group className="mt-3">
          <Button variant="link" onClick={handleResendCode} className="p-2">
            Resend Code
          </Button>
          {resendStatus && (
            <div className="mt-2 p-2 text-muted small">{resendStatus}</div>
          )}
        </Form.Group>
      </Modal>
    </Container>
  );
};

export default RegisterPage;