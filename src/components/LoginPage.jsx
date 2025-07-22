import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new URLSearchParams();
      data.append('username', formData.email);
      data.append('password', formData.password);

      const res = await api.post('/token', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);

      onLogin();
      alert("Login successful!!");
      navigate('/');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.detail || 'Wrong email or password'));
    }
  };

  return (
    <div className="d-flex justify-content-center bg-light py-5 px-2 min-vh-100">
      <Card className="shadow-lg w-100 mx-2 px-3 py-4" style={{ maxWidth: '700px', backgroundColor: '#f0f8ff', borderRadius: '20px' }}>
        <Card.Body>
          <h3 className="text-center mb-3" style={{ color: '#0d6efd' }}>Login as an Introducer</h3>
          <p className="text-muted text-center mb-4">
            Introducers are professionals or partners who refer potential mortgage clients to us.
            By logging in, you can submit referrals, track their progress, and earn rewards for each successful referral.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            {error && <div className="text-danger mb-3 text-center">{error}</div>}
            <Button type="submit" className="w-100" variant="primary">
              Login
            </Button>
          </Form>
          <div className="text-center mt-4">
            <span className="text-secondary">Not registered as an introducer?</span>{' '}
            <Link to="/register" className="text-decoration-none" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
              Click here to register
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
