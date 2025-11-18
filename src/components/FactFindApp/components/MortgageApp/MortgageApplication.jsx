import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MortgageApplication.css';
import useMortgageStore from '../../../../mortgageStore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import api from '../../../../api';
import { toast } from 'react-toastify';

const MortgageApplicationForm = () => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const isCustomer = userRoles.includes('customer');
  
  const { updateMortgage } = useMortgageStore();
  const navigate = useNavigate();

  // States for mortgage details
  const [hasMortgage, setHasMortgage] = useState(null);
  const [isLookingForMortgage, setLookForMortgage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [estPropertyValue, setEstPropertyValue] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [loanToValue1, setLoanToValue1] = useState('');
  const [furtherAdvance, setfurtherAdvance] = useState('');
  const [mortgageType, setMortgageType] = useState('');
  const [productRateType, setProductRateType] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [newMortgageType, setNewMortgageType] = useState('');
  const [foundProperty, setFoundProperty] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [depositAmount, setDepositAmount] =useState('');
  const [loanToValue2, setLoanToValue2] = useState('');
  const [sourceOfDeposit, setSourceOfDeposit] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [reference1, setReference1] = useState('');
  const [reference2, setReference2] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const viewResponses = () => {
    navigate("/mortgage/applications");
  };

  useEffect(() => {
    if (mortgageAmount > 0){
      const calculatedLTV = ( mortgageAmount / estPropertyValue) * 100;
      setLoanToValue1(calculatedLTV.toFixed(2));
    } else{
      setLoanToValue1(0);
    }
  }, [mortgageAmount, estPropertyValue]);

  useEffect(() => {
    if (purchasePrice > 0) {
      const calculatedLTV = ((purchasePrice - depositAmount) / purchasePrice * 100);
      setLoanToValue2(calculatedLTV.toFixed(2));
    } else {
      setLoanToValue2(0);
    }
  }, [depositAmount, purchasePrice]);

  
  const submitData = async () => {

    if (!isCheckboxChecked) {
      toast.error('Please agree to the terms before submitting.');
      return;
    }

    if (hasMortgage === null) {
      toast.error('Please select whether you have a mortgage.');
      return;
    }
  
    if (hasMortgage) {
      if (!paymentMethod || !estPropertyValue || !mortgageType || !mortgageAmount || !productRateType) {
        toast.error('Please fill out all the fields related to your mortgage.');
        return;
      }
  
      if (productRateType === 'fixed' && !renewalDate) {
        toast.error('Please enter the mortgage renewal or fixed-term end date.');
        return;
      }
    } else {
      if (isLookingForMortgage === null) {
        toast.error('Please specify if you are looking for a new mortgage.');
        return;
      }
  
      if (isLookingForMortgage) {
        if (!newMortgageType || !purchasePrice || !loanAmount || !sourceOfDeposit || !loanTerm || !newPaymentMethod || !foundProperty || !depositAmount ) {
          toast.error('Please fill out all the fields for a new mortgage.');
          return;
        }
      }
    }
    
    const data = hasMortgage
      ? {
          hasMortgage,
          paymentMethod,
          estPropertyValue,
          mortgageAmount,
          loanToValue1,
          furtherAdvance,
          mortgageType,
          productRateType,
          renewalDate,
          reference1,
        }
      : {
          hasMortgage,
          isLookingForMortgage,
          newMortgageType,
          foundProperty,
          depositAmount,
          purchasePrice,
          loanToValue2,
          loanAmount,
          sourceOfDeposit,
          loanTerm,
          newPaymentMethod,
          reference2,
        };

    try {
      const response = await api.post(
        `/add_mortgage_data`,
        data
      );
      console.log('Response:', response.data);
      const stringifiedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
      );
      updateMortgage(stringifiedData);
      setShowQuestions(false);
      setIsCheckboxChecked(false);
      toast.success('Data submitted successfully.');
      navigate('/mortgage');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit data.');
    }
  };

  const handleMortgageSelection = (value) => {
    setHasMortgage(value);
    if (value === false) {
      setLookForMortgage(null);
    }
  };

  const handleBack = () => {
    setShowQuestions(false);
  };

  const startApplication = () => {
    setShowQuestions(true);
  };

  if (!isLoggedIn || !isCustomer) {
    return (
      <div className="main-div">
        <div className="text-center mt-5">
          <h3>Access Restricted</h3>
          <p>This mortgage application form is only available for customers.</p>
          {isLoggedIn && (
            <p>Your current roles: {userRoles.join(', ')}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="home">
        {showQuestions ? (
          <>
            <table className="table w-75">
              <tr className="st-item">
                <td><label>Do you have an existing mortgage?</label></td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="mortgage"
                      value="yes"
                      required
                      onChange={() => handleMortgageSelection(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mortgage"
                      value="no"
                      onChange={() => handleMortgageSelection(false)}
                    />
                    No
                  </label>
                </td>
              </tr>
              {hasMortgage !== null && (
                <>
                  {hasMortgage && (
                    <>                 
                      <tr className="st-item"> 
                        <td><label>Payment Method</label></td>
                        <td>
                            <select className="inp-data" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                              <option value="">Select</option>
                              <option value="repayment">Repayment</option>
                              <option value="interest only">Interest Only</option>
                              <option value="part and part">Part and Part / Split</option>
                            </select>
                        </td>
                      </tr>
                      <tr className="st-item">
                        <td><label>Estimated Property Value</label></td>
                        <td>
                        <input className="inp-data" type="number" placeholder="Enter Property Value" value={estPropertyValue} onChange={(e) => setEstPropertyValue(e.target.value)} required />
                        </td>
                      </tr>
                      <tr className="st-item">
                        <td><label>Mortgage Amount</label></td>
                        <td><input className="inp-data" type="number" placeholder="Enter Amount" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} required /></td>
                      </tr>
                      <tr className="st-item">
                        <td><label>Loan To Value</label></td>
                        <td>{loanToValue1} %</td>
                      </tr>
                      <tr className="st-item">
                        <td><label>Further Advance</label></td>
                        <td><input className="inp-data" type="number" placeholder="If Any" value={furtherAdvance} onChange={(e) => setfurtherAdvance(e.target.value)} required /></td>
                      </tr>
                      <tr className="st-item"> 
                        <td><label>Mortgage Type</label></td>
                        <td>
                          <select className="inp-data" value={mortgageType} onChange={(e) => setMortgageType(e.target.value)} required>          
                            <option value="">Select</option>
                            <option value="residential">Residential</option>
                            <option value="consumer buy to let">Consumer Buy to Let</option>
                            <option value="company buy to let">Company Buy to Let</option>
                          </select>
                        </td>
                      </tr>
                      <tr className="st-item">
                        <td><label>Product Rate Type</label></td>
                        <td>
                            <select className="inp-data" value={productRateType} onChange={(e) => setProductRateType(e.target.value)}>
                              <option value="">Select</option>
                              <option value="fixed">Fixed</option>
                              <option value="variable">Variable</option>
                              <option value="tracker">Tracker</option>
                            </select>
                        </td>
                      </tr>
                      {productRateType === 'fixed' && (
                      <tr className="st-item">
                        <td><label>Mortgage renewal or fixed term end date:</label></td> 
                        <td>
                          <input 
                            className="inp-data" 
                            type="date" 
                            placeholder="date" 
                            value={renewalDate} 
                            onChange={(e) => setRenewalDate(e.target.value)} 
                            required 
                          />
                        </td>
                      </tr>
                    )}
                    <tr className="st-item">
                      <td><label>Reference</label></td>
                      <td><input type="text" className='inp-data' placeholder='If Any' value={reference1} onChange={(e) => setReference1(e.target.value)} /></td>
                    </tr>              
                    </>
                  )}
                  {!hasMortgage && (
                    <>                  
                      <tr className="st-item">
                        <td><label>Are you looking for a new mortgage?</label></td>
                        <td>
                          <label>
                            <input type="radio" name="look-for-mortgage" value="yes" required onChange={() => setLookForMortgage(true)} />
                            Yes
                          </label>
                          <label>
                            <input type="radio" name="look-for-mortgage" value="no" onChange={() => setLookForMortgage(false)}/>
                            No
                          </label>
                        </td>
                      </tr>                  
                      {isLookingForMortgage !== null && (
                        <>
                          {isLookingForMortgage && (
                            <>
                              <p>You are at right place, we will help you to find best mortgage deal.</p>
                              <tr className="st-item">
                                <td><label>Mortgage Type</label></td>
                                <td>
                                  <select className="inp-data" value={newMortgageType} onChange={(e) => setNewMortgageType(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="residential">Residential</option>
                                    <option value="consumer buy to let">Consumer Buy to Let</option>
                                    <option value="company buy to let">Company Buy to Let</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Have you found the property?</label></td>
                                <td>
                                  <label>
                                    <input type="radio" name="have-found-property" value={foundProperty} required onChange={() => setFoundProperty("Yes")} />
                                    Yes
                                  </label>
                                  <label>
                                    <input type="radio" name="have-found-property" value={foundProperty} onChange={() => setFoundProperty("No")}/>
                                    No
                                  </label>
                                </td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Purchase Price</label></td>
                                <td><input
                                  type="number"
                                  className="inp-data"
                                  placeholder="Enter your Purchase Price"
                                  value={purchasePrice}
                                  onChange={(e) => setPurchasePrice(e.target.value)}
                                />
                                </td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Loan Amount</label></td>
                                <td><input
                                  type="number"
                                  className="inp-data"
                                  placeholder="Enter Loan Amount"
                                  value={loanAmount}
                                  onChange={(e) => setLoanAmount(e.target.value)}
                                />
                                </td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Approximate Deposit Amount</label></td>
                                <td><input type="number" className='inp-data' placeholder='Enter Deposit Amount' value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)}/></td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Loan To Value</label></td>
                                <td>{ loanToValue2 } %</td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Source of Deposit</label></td>
                                <td>
                                  <select className="inp-data" value={sourceOfDeposit} onChange={(e) => setSourceOfDeposit(e.target.value)} required>
                                    <option value="">Select</option>
                                    <option value="savings">Savings</option>
                                    <option value="other">Other</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Loan Term in Years</label></td>
                                <td><input type="number" className='inp-data' placeholder='Years' value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} /></td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Payment Method</label></td>
                                <td>
                                  <select className="inp-data" value={newPaymentMethod} onChange={(e) => setNewPaymentMethod(e.target.value)} required>
                                  <option value="">Select</option>
                                    <option value="repayment">Repayment</option>
                                    <option value="interest only">Interest Only</option>
                                    <option value="part and part">Part and Part / Split</option>
                                  </select>
                                </td>
                              </tr>
                              <tr className="st-item">
                                <td><label>Reference</label></td>
                                <td><input type="text" className='inp-data' placeholder='if any' value={reference2} onChange={(e) => setReference2(e.target.value)} /></td>
                              </tr>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </table>
            
            <div className="nav-buttons">
              <div>
                <label htmlFor="agreement-checkbox">
                <input
                  type="checkbox"
                  id="agreement-checkbox"
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                />
                &nbsp;By submitting this form, you agree to our processing of your personal data in accordance with GDPR and our Privacy Policy.
                </label>
              </div>
            </div>
            <div className="nav-buttons">
              <div>
                <button className="back-but" onClick={handleBack}>Back</button>
              </div>
              <div>
                  <button className="submit-but" onClick={submitData}>Submit</button>
              </div>
            </div>
          </>
        ) : (
          <div className="thank-you-message">
            <h6>Fill your mortgage details here and track your applications.</h6>
            <div className="navigation-buttons">
              <button className="edit-resp" onClick={startApplication}>Apply</button>
              <button className="view-resp" onClick={viewResponses}>View Applications</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageApplicationForm;