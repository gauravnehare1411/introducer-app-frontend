import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../../api';

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedUser = location.state?.user;

  const [form, setForm] = useState({
    name: '',
    email: '',
    contactnumber: '',
    referralId: '',
  });

  useEffect(() => {
    if (!passedUser) {
      navigate(-1);
      return;
    }
    setForm({
      name: passedUser?.name || '',
      email: passedUser?.email || '',
      contactnumber: (passedUser?.contactnumber ?? '').toString(),
      referralId: passedUser?.referralId || '',
    });
  }, [passedUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (updates) => {
    try {
        await api.put('/user/me', updates);
        toast.success('Profile updated successfully');
    } catch (e) {
        toast.error(e?.response?.data?.detail || 'Failed to update profile');
        throw e;
    }
    };

  const canSave = useMemo(() => {
    return form.name.trim().length > 0;
  }, [form.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      name: form.name,
      contactnumber: form.contactnumber,
      email: form.email,
    };
    await onSave?.(updates);
    navigate(-1);
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">Edit Profile</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactnumber"
                value={form.contactnumber}
                onChange={handleChange}
                placeholder="e.g. +44 7522 405709"
              />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} disabled />
            </Col>

            <Col md={6} className="mb-3">
              <Form.Label>Referral ID</Form.Label>
              <Form.Control type="text" name="referralId" value={form.referralId} disabled />
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={!canSave}>
              Save Changes
            </Button>
            <Button type="button" variant="outline-secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditProfile;
