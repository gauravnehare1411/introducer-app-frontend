import React from 'react';
import { Form, Table } from 'react-bootstrap';

const NewMortgageForm = ({ 
  formData, 
  onInputChange, 
  calculatedValues 
}) => {
  const {
    newMortgageType,
    foundProperty,
    purchasePrice,
    loanAmount,
    depositAmount,
    sourceOfDeposit,
    loanTerm,
    newPaymentMethod,
    reference2
  } = formData;
  
  const { loanToValue2 } = calculatedValues;

  return (
    <>
      <tr>
        <td colSpan={2}>
          <p className="my-3">You are at the right place, we will help you to find the best mortgage deal.</p>
        </td>
      </tr>
      <tr>
        <td><Form.Label>Mortgage Type</Form.Label></td>
        <td>
          <Form.Select 
            value={newMortgageType} 
            onChange={(e) => onInputChange('newMortgageType', e.target.value)}
          >
            <option value="">Select</option>
            <option value="residential">Residential</option>
            <option value="consumer buy to let">Consumer Buy to Let</option>
            <option value="company buy to let">Company Buy to Let</option>
          </Form.Select>
        </td>
      </tr>
      <tr>
        <td><Form.Label>Have you found the property?</Form.Label></td>
        <td>
          <Form.Check
            inline
            type="radio"
            name="have-found-property"
            label="Yes"
            value="Yes"
            checked={foundProperty === "Yes"}
            onChange={() => onInputChange('foundProperty', "Yes")}
          />
          <Form.Check
            inline
            type="radio"
            name="have-found-property"
            label="No"
            value="No"
            checked={foundProperty === "No"}
            onChange={() => onInputChange('foundProperty', "No")}
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Purchase Price</Form.Label></td>
        <td>
          <Form.Control
            type="number"
            placeholder="Enter your Purchase Price"
            value={purchasePrice}
            onChange={(e) => onInputChange('purchasePrice', e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Loan Amount</Form.Label></td>
        <td>
          <Form.Control
            type="number"
            placeholder="Enter Loan Amount"
            value={loanAmount}
            onChange={(e) => onInputChange('loanAmount', e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Approximate Deposit Amount</Form.Label></td>
        <td>
          <Form.Control 
            type="number" 
            placeholder='Enter Deposit Amount' 
            value={depositAmount} 
            onChange={(e) => onInputChange('depositAmount', e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Loan To Value</Form.Label></td>
        <td>{loanToValue2} %</td>
      </tr>
      <tr>
        <td><Form.Label>Source of Deposit</Form.Label></td>
        <td>
          <Form.Select 
            value={sourceOfDeposit} 
            onChange={(e) => onInputChange('sourceOfDeposit', e.target.value)} 
            required
          >
            <option value="">Select</option>
            <option value="savings">Savings</option>
            <option value="other">Other</option>
          </Form.Select>
        </td>
      </tr>
      <tr>
        <td><Form.Label>Loan Term in Years</Form.Label></td>
        <td>
          <Form.Control 
            type="number" 
            placeholder='Years' 
            value={loanTerm} 
            onChange={(e) => onInputChange('loanTerm', e.target.value)} 
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Payment Method</Form.Label></td>
        <td>
          <Form.Select 
            value={newPaymentMethod} 
            onChange={(e) => onInputChange('newPaymentMethod', e.target.value)} 
            required
          >
            <option value="">Select</option>
            <option value="repayment">Repayment</option>
            <option value="interest only">Interest Only</option>
            <option value="part and part">Part and Part / Split</option>
          </Form.Select>
        </td>
      </tr>
      <tr>
        <td><Form.Label>Reference</Form.Label></td>
        <td>
          <Form.Control 
            type="text" 
            placeholder='if any' 
            value={reference2} 
            onChange={(e) => onInputChange('reference2', e.target.value)} 
          />
        </td>
      </tr>
    </>
  );
};

export default NewMortgageForm;