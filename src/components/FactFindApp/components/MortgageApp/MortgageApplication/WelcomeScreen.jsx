import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const WelcomeScreen = ({ onStartApplication, onViewResponses }) => {
  return (
    <Container>
      <Card className="text-center p-4">
        <Card.Body>
          <Card.Title>Mortgage Application</Card.Title>
          <Card.Text>
            Fill your mortgage details here and track your applications.
          </Card.Text>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" onClick={onStartApplication}>
              Apply
            </Button>
            <Button variant="outline-primary" onClick={onViewResponses}>
              View Applications
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WelcomeScreen;