import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const AccessControl = ({ isLoggedIn, isCustomer, userRoles, children }) => {
  if (!isLoggedIn || !isCustomer) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <Alert variant="danger">
            <h3>Access Restricted</h3>
            <p>This mortgage application form is only available for customers.</p>
            {isLoggedIn && (
              <p>Your current roles: {userRoles.join(', ')}</p>
            )}
          </Alert>
        </div>
      </Container>
    );
  }
  
  return children;
};

export default AccessControl;