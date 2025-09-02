import React, { useState, useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useMortgageStore from '../../../../../mortgageStore';
import api from '../../../../../api';
import AccessControl from './AccessControl';
import WelcomeScreen from './WelcomeScreen';
import ExistingMortgageForm from './ExistingMortgageForm';
import NewMortgageForm from './NewMortgageForm';
import AgreementCheckbox from './AgreementCheckbox';
import NavigationButtons from './NavigationButtons';

const MortgageApplicationForm = () => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const isCustomer = userRoles.includes('customer');
  
  const { updateMortgage } = useMortgageStore();
  const navigate = useNavigate();

  // State management
  const [hasMortgage, setHasMortgage] = useState(null);
  const [isLookingForMortgage, setLookForMortgage] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    paymentMethod: '',
    estPropertyValue: '',
    mortgageAmount: '',
    furtherAdvance: '',
    mortgageType: '',
    productRateType: '',
    renewalDate: '',
    newMortgageType: '',
    foundProperty: '',
    purchasePrice: '',
    loanAmount: '',
    depositAmount: '',
    sourceOfDeposit: '',
    loanTerm: '',
    newPaymentMethod: '',
    reference1: '',
    reference2: '',
  });

  // Calculated values
  const [loanToValue1, setLoanToValue1] = useState('');
  const [loanToValue2, setLoanToValue2] = useState('');

  const viewResponses = () => {
    navigate("/mortgage/applications");
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate LTV effects
  useEffect(() => {
    if (formData.mortgageAmount > 0 && formData.estPropertyValue > 0) {
      const calculatedLTV = (formData.mortgageAmount / formData.estPropertyValue) * 100;
      setLoanToValue1(calculatedLTV.toFixed(2));
    } else {
      setLoanToValue1(0);
    }
  }, [formData.mortgageAmount, formData.estPropertyValue]);

  useEffect(() => {
    if (formData.purchasePrice > 0) {
      const calculatedLTV = ((formData.purchasePrice - formData.depositAmount) / formData.purchasePrice * 100);
      setLoanToValue2(calculatedLTV.toFixed(2));
    } else {
      setLoanToValue2(0);
    }
  }, [formData.depositAmount, formData.purchasePrice]);

  // Submit data function
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
      if (!formData.paymentMethod || !formData.estPropertyValue || !formData.mortgageType || 
          !formData.mortgageAmount || !formData.productRateType) {
        toast.error('Please fill out all the fields related to your mortgage.');
        return;
      }
  
      if (formData.productRateType === 'fixed' && !formData.renewalDate) {
        toast.error('Please enter the mortgage renewal or fixed-term end date.');
        return;
      }
    } else {
      if (isLookingForMortgage === null) {
        toast.error('Please specify if you are looking for a new mortgage.');
        return;
      }
  
      if (isLookingForMortgage) {
        if (!formData.newMortgageType || !formData.purchasePrice || !formData.loanAmount || 
            !formData.sourceOfDeposit || !formData.loanTerm || !formData.newPaymentMethod || 
            !formData.foundProperty || !formData.depositAmount) {
          toast.error('Please fill out all the fields for a new mortgage.');
          return;
        }
      }
    }
    
    const data = hasMortgage
      ? {
          hasMortgage,
          paymentMethod: formData.paymentMethod,
          estPropertyValue: formData.estPropertyValue,
          mortgageAmount: formData.mortgageAmount,
          loanToValue1,
          furtherAdvance: formData.furtherAdvance,
          mortgageType: formData.mortgageType,
          productRateType: formData.productRateType,
          renewalDate: formData.renewalDate,
          reference1: formData.reference1,
        }
      : {
          hasMortgage,
          isLookingForMortgage,
          newMortgageType: formData.newMortgageType,
          foundProperty: formData.foundProperty,
          depositAmount: formData.depositAmount,
          purchasePrice: formData.purchasePrice,
          loanToValue2,
          loanAmount: formData.loanAmount,
          sourceOfDeposit: formData.sourceOfDeposit,
          loanTerm: formData.loanTerm,
          newPaymentMethod: formData.newPaymentMethod,
          reference2: formData.reference2,
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

  return (
    <AccessControl 
      isLoggedIn={isLoggedIn} 
      isCustomer={isCustomer} 
      userRoles={userRoles}
    >
      <Container className="my-4">
        {showQuestions ? (
          <>
            <Table bordered className="w-75 mx-auto">
              <tbody>
                <tr>
                  <td><Form.Label>Do you have an existing mortgage?</Form.Label></td>
                  <td>
                    <Form.Check
                      inline
                      type="radio"
                      name="mortgage"
                      label="Yes"
                      value="yes"
                      onChange={() => handleMortgageSelection(true)}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      name="mortgage"
                      label="No"
                      value="no"
                      onChange={() => handleMortgageSelection(false)}
                    />
                  </td>
                </tr>
                {hasMortgage !== null && (
                  <>
                    {hasMortgage && (
                      <ExistingMortgageForm 
                        formData={formData}
                        onInputChange={handleInputChange}
                        calculatedValues={{ loanToValue1 }}
                      />
                    )}
                    {!hasMortgage && (
                      <>                  
                        <tr>
                          <td><Form.Label>Are you looking for a new mortgage?</Form.Label></td>
                          <td>
                            <Form.Check
                              inline
                              type="radio"
                              name="look-for-mortgage"
                              label="Yes"
                              value="yes"
                              onChange={() => setLookForMortgage(true)}
                            />
                            <Form.Check
                              inline
                              type="radio"
                              name="look-for-mortgage"
                              label="No"
                              value="no"
                              onChange={() => setLookForMortgage(false)}
                            />
                          </td>
                        </tr>                  
                        {isLookingForMortgage !== null && isLookingForMortgage && (
                          <NewMortgageForm 
                            formData={formData}
                            onInputChange={handleInputChange}
                            calculatedValues={{ loanToValue2 }}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </Table>
            
            <AgreementCheckbox 
              isChecked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            />
            
            <NavigationButtons 
              onBack={handleBack}
              onSubmit={submitData}
            />
          </>
        ) : (
          <WelcomeScreen 
            onStartApplication={startApplication}
            onViewResponses={viewResponses}
          />
        )}
      </Container>
    </AccessControl>
  );
};

export default MortgageApplicationForm;