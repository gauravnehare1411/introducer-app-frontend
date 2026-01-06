import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../../api';
import { toast } from 'react-toastify';
import "./EditMortgage.css";

export default function EditMortgage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationId, applicationData, applicationType } = location.state || {};

    // State for existing mortgage
    const [paymentMethod, setPaymentMethod] = useState('');
    const [estPropertyValue, setEstPropertyValue] = useState('');
    const [mortgageAmount, setMortgageAmount] = useState('');
    const [loanToValue1, setLoanToValue1] = useState('');
    const [furtherAdvance, setFurtherAdvance] = useState('');
    const [mortgageType, setMortgageType] = useState('');
    const [productRateType, setProductRateType] = useState('');
    const [renewalDate, setRenewalDate] = useState('');
    const [reference1, setReference1] = useState('');

    // State for new mortgage
    const [isLookingForMortgage, setIsLookingForMortgage] = useState(false);
    const [newMortgageType, setNewMortgageType] = useState('');
    const [foundProperty, setFoundProperty] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [loanToValue2, setLoanToValue2] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [sourceOfDeposit, setSourceOfDeposit] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [newPaymentMethod, setNewPaymentMethod] = useState('');
    const [reference2, setReference2] = useState('');

    useEffect(() => {
        if (applicationData) {
            console.log(applicationData.newMortgageType);
            if (applicationType === 'existing') {
                // Populate existing mortgage fields
                setPaymentMethod(applicationData.paymentMethod || '');
                setEstPropertyValue(applicationData.estPropertyValue || '');
                setMortgageAmount(applicationData.mortgageAmount || '');
                setLoanToValue1(applicationData.loanToValue1 || '');
                setFurtherAdvance(applicationData.furtherAdvance || '');
                setMortgageType(applicationData.mortgageType || '');
                setProductRateType(applicationData.productRateType || '');
                setRenewalDate(applicationData.renewalDate ? applicationData.renewalDate.split('T')[0] : '');
                setReference1(applicationData.reference1 || '');
            } else {
                // Populate new mortgage fields
                setIsLookingForMortgage(applicationData.isLookingForMortgage);
                setNewMortgageType(applicationData.newMortgageType || '');
                setFoundProperty(applicationData.foundProperty || '');
                setDepositAmount(applicationData.depositAmount || '');
                setPurchasePrice(applicationData.purchasePrice || '');
                setLoanToValue2(applicationData.loanToValue2 || '');
                setLoanAmount(applicationData.loanAmount || '');
                setSourceOfDeposit(applicationData.sourceOfDeposit || '');
                setLoanTerm(applicationData.loanTerm || '');
                setNewPaymentMethod(applicationData.newPaymentMethod || '');
                setReference2(applicationData.reference2 || '');
            }
        }
    }, [applicationData, applicationType]);

    // Calculate LTV for existing mortgage
    useEffect(() => {
        if (applicationType === 'existing' && mortgageAmount > 0 && estPropertyValue > 0) {
            const calculatedLTV = (mortgageAmount / estPropertyValue) * 100;
            setLoanToValue1(calculatedLTV.toFixed(2));
        } else if (applicationType === 'existing') {
            setLoanToValue1(0);
        }
    }, [mortgageAmount, estPropertyValue, applicationType]);

    useEffect(() => {
        if (applicationType === 'new' && loanAmount > 0 && purchasePrice > 0) {
            const calculatedLTV = (loanAmount / purchasePrice) * 100;
            setLoanToValue2(calculatedLTV.toFixed(2));
        } else if (applicationType === 'new') {
            setLoanToValue2(0);
        }
    }, [loanAmount, purchasePrice, applicationType]);

    const handleSave = async () => {
        let payload = {};

        if (applicationType === 'existing') {
            payload = {
                paymentMethod,
                estPropertyValue: parseFloat(estPropertyValue),
                mortgageAmount: parseFloat(mortgageAmount),
                loanToValue1: parseFloat(loanToValue1),
                furtherAdvance,
                mortgageType,
                productRateType,
                renewalDate: productRateType === 'fixed' ? renewalDate : null,
                reference1,
            };
        } else {
            payload = {
                isLookingForMortgage,
                newMortgageType,
                foundProperty,
                depositAmount: parseFloat(depositAmount),
                purchasePrice: parseFloat(purchasePrice),
                loanToValue2: parseFloat(loanToValue2),
                loanAmount: parseFloat(loanAmount),
                sourceOfDeposit,
                loanTerm: parseInt(loanTerm),
                newPaymentMethod,
                reference2,
            };
        }

        try {
            await api.put(`/user/mortgage-application/${applicationId}`, payload);
            toast.success('Application updated successfully!');
            const roles = JSON.parse(localStorage.getItem("roles") || "[]");
            if (roles.includes('admin')) {
                navigate('/admin/all-customer-applications');
            } else {
                navigate('/mortgage/applications');
            }
        } catch (error) {
            console.error('Error updating mortgage:', error);
            toast.error('Failed to update application. Please try again.');
        }
    };

    const handleCancel = () => {
        const roles = JSON.parse(localStorage.getItem("roles") || "[]");
        if (roles.includes('admin')) {
            navigate('/admin/all-customer-applications');
        } else {
            navigate('/mortgage/applications');
        }
    };

    if (!applicationData) {
        return <div className="user-details-container">No application data found</div>;
    }

    return (
        <div className="user-details-container">
            <h2 className="mortgage-details-title" style={{ "marginTop": "50px" }}>
                Edit {applicationType === 'existing' ? 'Existing' : 'New'} Mortgage Application
            </h2>

            {applicationType === 'existing' ? (
                <table className="user-details-table">
                    <tbody>
                        <tr className='st-item'>
                            <th>Application ID</th>
                            <td>{applicationId}</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Has mortgage?</label></th>
                            <td>Yes</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Payment Method</label></th>
                            <td>
                                <select className="inp-data" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="repayment">Repayment</option>
                                    <option value="interest only">Interest Only</option>
                                    <option value="part and part">Part and Part</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Estimated Property Value (£)</label></th>
                            <td>
                                <input className="inp-data" type="number" placeholder="Enter Property Value" value={estPropertyValue} onChange={(e) => setEstPropertyValue(e.target.value)} required />
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Mortgage Amount (£)</label></th>
                            <td><input className="inp-data" type="number" placeholder="Enter Amount" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} required /></td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Loan to Value (%)</label></th>
                            <td>{loanToValue1}</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Further Advance</label></th>
                            <td>
                                <select className="inp-data" value={furtherAdvance} onChange={(e) => setFurtherAdvance(e.target.value)}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Mortgage Type</label></th>
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
                            <th><label>Product Rate Type</label></th>
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
                                <th><label>Renewal Date</label></th>
                                <td>
                                    <input
                                        className="inp-data"
                                        type="date"
                                        value={renewalDate}
                                        onChange={(e) => setRenewalDate(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                        )}
                        <tr className="st-item">
                            <th><label>Reference</label></th>
                            <td><input type="text" className='inp-data' placeholder='If Any' value={reference1} onChange={(e) => setReference1(e.target.value)} /></td>
                        </tr>
                        <tr className="st-item">
                            <td><button style={{ "background": "red", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleCancel}>Cancel</button></td>
                            <td><button style={{ "background": "green", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleSave}>Save</button></td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <table className="user-details-table">
                    <tbody>
                        <tr className="st-item">
                            <th>Application ID</th>
                            <td>{applicationId}</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Are you looking for a mortgage?</label></th>
                            <td>
                                <td>
                                    <label>
                                        <input type="radio" name="look-for-mortgage" alue="yes" checked={isLookingForMortgage === true} required onChange={() => setIsLookingForMortgage(true)} />
                                        Yes
                                    </label>
                                    <label>
                                        <input type="radio" name="look-for-mortgage" value="no" checked={isLookingForMortgage === false} onChange={() => setIsLookingForMortgage(false)} />
                                        No
                                    </label>
                                </td>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Mortgage Type</label></th>
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
                            <th><label>Have you found a property?</label></th>
                            <td>
                                <select className="inp-data" value={foundProperty} onChange={(e) => setFoundProperty(e.target.value)}>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Deposit Amount (£)</label></th>
                            <td>
                                <input className="inp-data" type="number" placeholder="Enter Deposit Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} required />
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Purchase Price (£)</label></th>
                            <td>
                                <input className="inp-data" type="number" placeholder="Enter Purchase Price" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required />
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Loan to Value (%)</label></th>
                            <td>{loanToValue2}</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Loan Amount (£)</label></th>
                            <td>
                                <input className="inp-data" type="number" placeholder="Enter Loan Amount" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Source of Deposit</label></th>
                            <td>
                                <select className="inp-data" value={sourceOfDeposit} onChange={(e) => setSourceOfDeposit(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="savings">Savings</option>
                                    <option value="other">Other</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Loan Term (Years)</label></th>
                            <td>
                                <input className="inp-data" type="number" placeholder="Enter Loan Term" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} required />
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Payment Method</label></th>
                            <td>
                                <select className="inp-data" value={newPaymentMethod} onChange={(e) => setNewPaymentMethod(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="repayment">Repayment</option>
                                    <option value="interest only">Interest Only</option>
                                    <option value="part and part">Part and Part / Split</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Reference</label></th>
                            <td><input type="text" className='inp-data' placeholder='If Any' value={reference2} onChange={(e) => setReference2(e.target.value)} /></td>
                        </tr>
                        <tr className="st-item">
                            <td><button style={{ "background": "red", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleCancel}>Cancel</button></td>
                            <td><button style={{ "background": "green", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleSave}>Save</button></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}