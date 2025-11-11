import React, { useState, useEffect } from 'react';
import api from '../../../../../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NewMortgageForm({
    applicationId,
    applicationType,
    applicationData,
    handleCancel
}) {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isLookingForMortgage, setIsLookingForMortgage] = useState('');
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

    const [files, setFiles] = useState(applicationData.uploaded_files || {});

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (applicationData) {
            if (applicationType === 'new') {
                setCustomerName(applicationData.form_data.customerName || '');
                setCustomerEmail(applicationData.form_data.customerEmail || '');
                setCustomerPhone(applicationData.form_data.customerPhone || '');
                setIsLookingForMortgage(applicationData.form_data.isLookingForMortgage || '');
                setNewMortgageType(applicationData.form_data.newMortgageType || '');
                setFoundProperty(applicationData.form_data.foundProperty || '');
                setDepositAmount(applicationData.form_data.depositAmount || '');
                setPurchasePrice(applicationData.form_data.purchasePrice || '');
                setLoanToValue2(applicationData.form_data.loanToValue2 || '');
                setLoanAmount(applicationData.form_data.loanAmount || '');
                setSourceOfDeposit(applicationData.form_data.sourceOfDeposit || '');
                setLoanTerm(applicationData.form_data.loanTerm || '');
                setNewPaymentMethod(applicationData.form_data.newPaymentMethod || '');
                setReference2(applicationData.form_data.reference2 || '');
            }
        }
    }, [applicationData, applicationType]);

    useEffect(() => {
        if (applicationType === 'new' && loanAmount > 0 && purchasePrice > 0) {
            const calculatedLTV = (purchasePrice - depositAmount) / purchasePrice * 100;
            setLoanToValue2(calculatedLTV.toFixed(2));
        } else if (applicationType === 'new') {
            setLoanToValue2(0);
        }
    }, [loanAmount, purchasePrice, applicationType]);

    const handleSave = async () => {
        let payload = {};

        if (applicationType === 'new') {
            payload = {
                customerName,
                customerEmail,
                customerPhone,
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

        const formData = new FormData();
        formData.append('form_data', JSON.stringify(payload));

        Object.entries(files).forEach(([key, file]) => {
            if (file instanceof File) {
                formData.append('files', file);
                formData.append('file_keys', key);
            }
        });

        try {
            setLoading(true); 
            await api.put(`/update-mortgage-with-docs/${applicationId}`, formData);
            toast.success('Application updated successfully!');
            navigate('/admin/my-applications');
        } catch (error) {
            console.error('Error updating mortgage:', error);
            toast.error('Failed to update application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <table className="user-details-table">
            <tbody>
                <tr>
                    <th>Application ID</th>
                    <td>{applicationId}</td>
                </tr>
                <tr className="st-item">
                    <th><label>Are you looking for a mortgage?</label></th>
                    <td>
                        <select className="inp-data" value={isLookingForMortgage} onChange={(e) => setIsLookingForMortgage(e.target.value)}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </td>
                </tr>
                <tr className="st-item">
                    <th><label>Customer Name</label></th>
                    <td>
                        <input className="inp-data" type="text" placeholder="Enter Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                    </td>
                </tr>
                <tr className="st-item">
                    <th><label>Customer Email</label></th>
                    <td>
                        <input className="inp-data" type="email" placeholder="Enter Customer Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
                    </td>
                </tr>
                <tr className="st-item">
                    <th><label>Phone</label></th>
                    <td>
                        <input className="inp-data" type="number" placeholder="Enter Customer Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
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

                {["id_proof", "address_proof", "bank_statement", "payslip"].map((docType) => (
                    <tr key={docType} className="st-item">
                        <th>{docType.replace("_", " ").toUpperCase()}</th>
                        <td>
                            {files[docType] && (
                                <div style={{ marginBottom: "5px" }}>
                                    <a
                                        href={files[docType].download_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {files[docType].file_name}
                                    </a>
                                </div>
                            )}

                            <input
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        setFiles((prev) => ({ ...prev, [docType]: e.target.files[0] }));
                                    }
                                }}
                                disabled={loading}
                            />
                        </td>
                    </tr>
                ))}

                <tr className="st-item">
                    <th><label>Reference</label></th>
                    <td><input type="text" className='inp-data' placeholder='If Any' value={reference2} onChange={(e) => setReference2(e.target.value)} /></td>
                </tr>
                <tr className="st-item">
                    <td><button style={{ "background": "red", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleCancel} disabled={loading}>Cancel</button></td>
                    <td><button style={{ "background": "green", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleSave}>
                            {loading ? (
                                <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Updating...
                                </>
                            ) : (
                                "Save"
                            )}
                        </button></td>
                </tr>
            </tbody>
        </table>
    );
}
