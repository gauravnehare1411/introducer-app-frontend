import React from 'react';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access_token');

  return (
    <Container className="py-5">
      <Card className="text-center shadow-lg mb-4">
        <Card.Header as="h1" style={{backgroundColor: '#f3f3f5ff', color: '#391856'}}>Welcome to AAI Financials!</Card.Header>
        <Card.Body>
          <Card.Text className="fs-5">
            Where we prioritize your financial journey with trust, transparency, and expertise.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow">
        <Card.Body>
          <Card.Text>
            As independent mortgage advisors, we have a holistic view of the mortgage market, giving us access to a wide range of lenders and products. This allows us to tailor solutions that best fit your unique needs.
            <br /><br />
            Whether you're buying your first home, remortgaging, or exploring investment opportunities, we are here to secure the best deal for you.
            <br /><br />
            Our commitment is to guide you every step of the way, making the process smooth and stress-free while ensuring you achieve your homeownership goals with confidence.
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
          </>
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
