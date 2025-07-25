import React from 'react';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token'); // Adjust key as needed

  return (
    <Container className="py-5">
      <Card className="text-center shadow-lg mb-4">
        <Card.Header as="h1" className="text-white" style={{backgroundColor: '#2a3d94ff'}}>Welcome to AAI Financials!</Card.Header>
        <Card.Body>
          <Card.Text className="fs-5">
            Where we prioritize your financial journey with trust, transparency, and expertise.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow">
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-3">About Us</Card.Title>
          <Card.Text>
            As independent mortgage advisors, we have a holistic view of the mortgage market, giving us access to a wide range of lenders and products. This allows us to tailor solutions that best fit your unique needs.
            <br /><br />
            Whether you're buying your first home, remortgaging, or exploring investment opportunities, we are here to secure the best deal for you.
            <br /><br />
            Our commitment is to guide you every step of the way, making the process smooth and stress-free while ensuring you achieve your homeownership goals with confidence. Let's build your future together.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="justify-content-center">
        {!isLoggedIn ? (
          <>
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate('/login')}>Login</Button>
            </Col>
            <Col xs="auto">
              <Button variant="outline-primary" onClick={() => navigate('/register')}>Register</Button>
            </Col>
          </>
        ) : (
          <>
            <Col xs="auto">
              <Button variant="success" onClick={() => navigate('/refer')}>Refer Friend or Family</Button>
            </Col>
            <Col xs="auto">
              <Button variant="info" onClick={() => navigate('/my-referrals')}>My Referrals</Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
