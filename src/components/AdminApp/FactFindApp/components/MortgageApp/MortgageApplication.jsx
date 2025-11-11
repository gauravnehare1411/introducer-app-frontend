import React, { useState, useEffect } from 'react';
import './MortgageApplication.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HasMortgageForm from './MortgageApplication/inc/HasMortgageForm';
import IsLookingForMortgage from './MortgageApplication/inc/IsLookingForMortgage';

const MortgageApplicationForm = () => {
  
  const navigate = useNavigate();

  // States for mortgage details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
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

  
  const handleNext = async () => {

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

    const cleanedRenewalDate =
      productRateType === 'fixed' ? renewalDate : '';
    
    const data = hasMortgage
      ? {
          customerName,
          customerEmail,
          customerPhone,
          hasMortgage,
          paymentMethod,
          estPropertyValue,
          mortgageAmount,
          loanToValue1,
          furtherAdvance,
          mortgageType,
          productRateType,
          renewalDate: cleanedRenewalDate,
          reference1,
        }
      : {
          customerName,
          customerEmail,
          customerPhone,
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

    localStorage.setItem("mortgageFormData", JSON.stringify(data));
    navigate("/admin/my-applications/upload-documents");
  };

  const handleMortgageSelection = (value) => {
    setHasMortgage(value);
    if (value === false) {
      setLookForMortgage(null);
    }
  };

  return (
    <div className="main-div">
      <div className="home">
          <h2 className='pb-3'>Customer Application Form</h2>
            <table className="table w-75">
              <tr className="st-item">
                <td><label>Customer Name</label></td>
                <td><input className="inp-data" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder='Enter Customer Name' required /></td>
              </tr>
              <tr className="st-item">
                <td><label>Email</label></td>
                <td><input className="inp-data" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder='Enter Customer Email' required /></td>
              </tr>
              <tr className="st-item">
                <td><label>Phone Number</label></td>
                <td><input className="inp-data" type="number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder='Enter Phone Number' required /></td>
              </tr>
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
                      <HasMortgageForm
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        estPropertyValue={estPropertyValue}
                        setEstPropertyValue={setEstPropertyValue}
                        mortgageAmount={mortgageAmount}
                        loanToValue1 = {loanToValue1}
                        setMortgageAmount={setMortgageAmount}
                        furtherAdvance={furtherAdvance}
                        setfurtherAdvance={setfurtherAdvance}
                        mortgageType={mortgageType}
                        setMortgageType={setMortgageType}
                        productRateType={productRateType}
                        setProductRateType={setProductRateType}
                        renewalDate={renewalDate}
                        setRenewalDate={setRenewalDate}
                        reference1={reference1}
                        setReference1={setReference1}
                      />
                    </>
                  )}
                  {!hasMortgage && (
                    <>                  
                      <tr className="st-item">
                        <td><label>Are you looking for a new mortgage?</label></td>
                        <td>
                          <label>
                            <input type="radio" name="look-for-mortgage" alue="yes" required onChange={() => setLookForMortgage(true)} />
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
                            <IsLookingForMortgage
                              newMortgageType={newMortgageType}
                              setNewMortgageType={setNewMortgageType}
                              foundProperty={foundProperty}
                              setFoundProperty={setFoundProperty}
                              purchasePrice={purchasePrice}
                              setPurchasePrice={setPurchasePrice}
                              loanAmount={loanAmount}
                              setLoanAmount={setLoanAmount}
                              depositAmount={depositAmount}
                              setDepositAmount={setDepositAmount}
                              loanToValue2={loanToValue2}
                              sourceOfDeposit={sourceOfDeposit}
                              setSourceOfDeposit={setSourceOfDeposit}
                              loanTerm={loanTerm}
                              setLoanTerm={setLoanTerm}
                              newPaymentMethod={newPaymentMethod}
                              setNewPaymentMethod={setNewPaymentMethod}
                              reference2={reference2}
                              setReference2={setReference2}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </table>
            
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-outline-danger" onClick={() => {
                localStorage.removeItem("mortgageFormData");
                navigate('/admin/my-applications');
              }}>Cancel</button>
              &nbsp;
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
      </div>
    </div>
  );
};

export default MortgageApplicationForm;