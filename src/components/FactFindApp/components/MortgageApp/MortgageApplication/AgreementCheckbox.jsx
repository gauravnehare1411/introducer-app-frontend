import React from 'react';
import { Form } from 'react-bootstrap';

const AgreementCheckbox = ({ isChecked, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Check
        type="checkbox"
        id="agreement-checkbox"
        label="By submitting this form, you agree to our processing of your personal data in accordance with GDPR and our Privacy Policy."
        checked={isChecked}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default AgreementCheckbox;