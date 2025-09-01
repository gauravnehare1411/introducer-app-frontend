import React from 'react';
import { Button } from 'react-bootstrap';

const NavigationButtons = ({ onBack, onSubmit, showBack = true, showSubmit = true }) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      {showBack && (
        <Button variant="outline-secondary" onClick={onBack}>
          Back
        </Button>
      )}
      {showSubmit && (
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;