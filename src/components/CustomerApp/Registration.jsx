import React, { useState } from "react";
import { Container, Button, Form, Card, Modal } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import api from "../../api";

export default function Registration({ onRegister }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactnumber: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', formData);
      setShowModal(true);
      setError('');
    } catch (err) {
      const detail = err.response?.data?.detail || 'Unknown error';
      setError('Registration failed: ' + detail);
      toast.error('Registration failed: ' + detail);
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
      localStorage.setItem('role', res.data.role);
      onRegister();
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
        console.log(err);
      toast.error('Verification failed: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  const handleResendCode = async () => {
    try {
      await api.post('/resend-code', { email: formData.email });
      setResendStatus('Verification code resent successfully.');
      toast.info('Verification code resent successfully.');
    } catch (err) {
      setResendStatus('Failed to resend code: ' + (err.response?.data?.detail || 'Unknown error'));
      toast.error('Failed to resend code');
    }
  };

  return (
    <Container fluid className="bg-light py-5 px-2">
      <div className="d-flex justify-content-center">
        <Card className="shadow-lg p-4 w-100" style={{ maxWidth: "500px", borderRadius: "20px" }}>
          <Card.Body>
            <h2 className="text-center mb-3" style={{ color: '#391856' }}>Start Your Journey</h2>
            <p className="text-center mb-4">Please provide your details to create your account</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange} 
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange} 
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="contactnumber" 
                  placeholder="Enter your contact number" 
                  value={formData.contactnumber}
                  onChange={handleChange} 
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  placeholder="Enter a password" 
                  value={formData.password}
                  onChange={handleChange} 
                  required
                />
              </Form.Group>
              {error && <div className="text-danger mb-3 text-center">{error}</div>}
              <Button 
                type="submit" 
                style={{ width: "100%", backgroundColor: "#F15808", border: "none" }}
              >
                Register
              </Button>
            </Form>
            <div className="text-center mt-4">
              <span className="text-secondary">Already registered?</span>{' '}
              <Link to="/login" className="text-decoration-none" style={{ color: '#FF6210', fontWeight: 'bold' }}>
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
          <Form.Group className="mt-3">
            <Button variant="link" onClick={handleResendCode} className="p-0">
              Resend Code
            </Button>
            {resendStatus && (
              <div className="mt-2 p-2 text-muted small">{resendStatus}</div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleVerifyCode}
            style={{ backgroundColor: "#F15808", border: "none" }}
          >
            Verify & Complete Registration
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}