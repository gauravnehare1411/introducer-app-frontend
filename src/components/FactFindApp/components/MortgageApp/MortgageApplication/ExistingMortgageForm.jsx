import React from 'react';
import { Form, Table, Row, Col } from 'react-bootstrap';

const ExistingMortgageForm = ({ 
  formData, 
  onInputChange, 
  calculatedValues 
}) => {
  const {
    paymentMethod,
    estPropertyValue,
    mortgageAmount,
    furtherAdvance,
    mortgageType,
    productRateType,
    renewalDate,
    reference1
  } = formData;
  
  const { loanToValue1 } = calculatedValues;

  return (
    <>
      <tr>
        <td><Form.Label>Payment Method</Form.Label></td>
        <td>
          <Form.Select 
            value={paymentMethod} 
            onChange={(e) => onInputChange('paymentMethod', e.target.value)}
          >
            <option value="">Select</option>
            <option value="repayment">Repayment</option>
            <option value="interest only">Interest Only</option>
            <option value="part and part">Part and Part / Split</option>
          </Form.Select>
        </td>
      </tr>
      <tr>
        <td><Form.Label>Estimated Property Value</Form.Label></td>
        <td>
          <Form.Control 
            type="number" 
            placeholder="Enter Property Value" 
            value={estPropertyValue} 
            onChange={(e) => onInputChange('estPropertyValue', e.target.value)} 
            required 
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Mortgage Amount</Form.Label></td>
        <td>
          <Form.Control 
            type="number" 
            placeholder="Enter Amount" 
            value={mortgageAmount} 
            onChange={(e) => onInputChange('mortgageAmount', e.target.value)} 
            required 
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Loan To Value</Form.Label></td>
        <td>{loanToValue1} %</td>
      </tr>
      <tr>
        <td><Form.Label>Further Advance</Form.Label></td>
        <td>
          <Form.Control 
            type="number" 
            placeholder="If Any" 
            value={furtherAdvance} 
            onChange={(e) => onInputChange('furtherAdvance', e.target.value)} 
          />
        </td>
      </tr>
      <tr>
        <td><Form.Label>Mortgage Type</Form.Label></td>
        <td>
          <Form.Select 
            value={mortgageType} 
            onChange={(e) => onInputChange('mortgageType', e.target.value)} 
            required
          >
            <option value="">Select</option>
            <option value="residential">Residential</option>
            <option value="consumer buy to let">Consumer Buy to Let</option>
            <option value="company buy to let">Company Buy to Let</option>
          </Form.Select>
        </td>
      </tr>
      <tr>
        <td><Form.Label>Product Rate Type</Form.Label></td>
        <td>
          <Form.Select 
            value={productRateType} 
            onChange={(e) => onInputChange('productRateType', e.target.value)}
          >
            <option value="">Select</option>
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
            <option value="tracker">Tracker</option>
          </Form.Select>
        </td>
      </tr>
      {productRateType === 'fixed' && (
        <tr>
          <td><Form.Label>Mortgage renewal or fixed term end date:</Form.Label></td> 
          <td>
            <Form.Control 
              type="date" 
              value={renewalDate} 
              onChange={(e) => onInputChange('renewalDate', e.target.value)} 
              required 
            />
          </td>
        </tr>
      )}
      <tr>
        <td><Form.Label>Reference</Form.Label></td>
        <td>
          <Form.Control 
            type="text" 
            placeholder='If Any' 
            value={reference1} 
            onChange={(e) => onInputChange('reference1', e.target.value)} 
          />
        </td>
      </tr>
    </>
  );
};

export default ExistingMortgageForm;