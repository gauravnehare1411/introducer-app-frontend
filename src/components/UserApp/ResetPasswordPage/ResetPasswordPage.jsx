// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import api from '../../../api';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post('/user/reset-password', {
        token,
        new_password: password,
      });

      toast.success('Password has been reset successfully.');
      navigate('/sign-in');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light d-flex justify-content-center align-items-start py-5 px-2" style={{ minHeight: '100vh' }}>
      <Card className="p-5 shadow-lg w-100" style={{ maxWidth: '480px', borderRadius: '1rem', backgroundColor: '#ffffff' }}>
        <div className="text-center mb-4">
          <FaLock size={40} className="text-primary mb-2" />
          <h4 className="text-dark">Set a New Password</h4>
          <p className="text-muted small mb-0">Please choose a strong, new password to continue.</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="shadow-sm"
            />
          </Form.Group>
          <Button type="submit" className="w-100" variant="primary" disabled={loading}>
            {loading ? 'Resetting...' : 'Change Password'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
