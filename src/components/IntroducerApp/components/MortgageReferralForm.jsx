import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import api from '../../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MortgageReferralForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', referralPhone: '', referralEmail: '', purpose: '', comment: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await api.post('/submit-referral', formData);
      
      toast.success('Referral submitted successfully!');
      setFormData({firstName: '', lastName: '', referralPhone: '', referralEmail: '', purpose: '', comment: ''});
      navigate('/introducer')
    } catch (error) {
      if (error.response) {
          toast.error('Something went wrong. Please try again later.');
        }
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '700px' }}>
      <Card.Body>
        <h2 className="text-center mb-1">REFER FRIENDS & FAMILY</h2>
        <br />
        <h5>Referral Information</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Label>Name *</Form.Label>
              <Form.Control type="text" placeholder="First" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Col>
            <Col>
              <Form.Label style={{ visibility: 'hidden' }}>Last</Form.Label>
              <Form.Control type="text" placeholder="Last" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>Phone *</Form.Label>
              <Form.Control type="tel" name="referralPhone" value={formData.referralPhone} onChange={handleChange} required />
            </Col>
            <Col>
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" name="referralEmail" value={formData.referralEmail} onChange={handleChange} required />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Purpose</Form.Label>
            <Form.Select name="purpose" value={formData.purpose} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="purchase">Purchase</option>
              <option value="remortgage">Remortgage</option>
              <option value="buy-to-let">Buy-to-let</option>
              <option value="first-time-buyer">First-time buyer</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control as="textarea" name="comment" value={formData.comment} onChange={handleChange} rows={3} />
          </Form.Group>
          <Row className="mt-4">
            <Col className="d-flex justify-content-start">
              <Button variant="secondary" onClick={() => window.history.back()}>Back</Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MortgageReferralForm;