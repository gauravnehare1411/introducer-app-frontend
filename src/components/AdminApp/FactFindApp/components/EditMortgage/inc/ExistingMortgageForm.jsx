import React, { useState, useEffect } from 'react';
import api from '../../../../../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ExistingMortgageForm({
    applicationId,
    applicationType,
    applicationData,
    handleCancel
}) {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [estPropertyValue, setEstPropertyValue] = useState('');
    const [mortgageAmount, setMortgageAmount] = useState('');
    const [loanToValue1, setLoanToValue1] = useState('');
    const [furtherAdvance, setFurtherAdvance] = useState('');
    const [mortgageType, setMortgageType] = useState('');
    const [productRateType, setProductRateType] = useState('');
    const [renewalDate, setRenewalDate] = useState('');
    const [reference1, setReference1] = useState('');

    const [files, setFiles] = useState(applicationData.uploaded_files || {});

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (applicationData) {
            if (applicationType === 'existing') {
                const fd = applicationData.form_data || {} ;
                setCustomerName(fd.customerName || '');
                setCustomerEmail(fd.customerEmail || '');
                setCustomerPhone(fd.customerPhone || '');
                setPaymentMethod(fd.paymentMethod || '');
                setEstPropertyValue(fd.estPropertyValue || '');
                setMortgageAmount(fd.mortgageAmount || '');
                setLoanToValue1(fd.loanToValue1 || '');
                setFurtherAdvance(fd.furtherAdvance || '');
                setMortgageType(fd.mortgageType || '');
                setProductRateType(fd.productRateType || '');
                setRenewalDate(fd.renewalDate ? fd.renewalDate.split('T')[0] : '');
                setReference1(fd.reference1 || '');
            }
        }
    }, [applicationData, applicationType]);

    useEffect(() => {
        if (applicationType === 'existing' && mortgageAmount > 0 && estPropertyValue > 0) {
            const calculatedLTV = (mortgageAmount / estPropertyValue) * 100;
            setLoanToValue1(calculatedLTV.toFixed(2));
        } else if (applicationType === 'existing') {
            setLoanToValue1(0);
        }
    }, [mortgageAmount, estPropertyValue, applicationType]);

    const handleSave = async () => {
        let payload = {};

        if (applicationType === 'existing') {
            payload = {
                hasMortgage: applicationData.form_data.hasMortgage,
                customerName,
                customerEmail,
                customerPhone,
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
        }

        const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

        for (const [key, file] of Object.entries(files)) {
            if (file instanceof File && file.size > MAX_SIZE) {
                toast.error(`"${key}" must be less than 4 MB.`);
                return;
            }
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
            await api.put(`/update-mortgage-with-docs/${applicationId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
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
                <tr className='st-item'>
                    <th>Application ID</th>
                    <td>{applicationId}</td>
                </tr>
                <tr className="st-item">
                    <th><label>Has mortgage?</label></th>
                    <td>Yes</td>
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
                        <input className="inp-data" type="text" placeholder="Enter Property Value" value={estPropertyValue} onChange={(e) => setEstPropertyValue(e.target.value)} required />
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
                        <input type="number" className="inp-data" value={furtherAdvance} onChange={(e) => setFurtherAdvance(e.target.value)} placeholder='If any' />
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
                    <td><input type="text" className='inp-data' placeholder='If Any' value={reference1} onChange={(e) => setReference1(e.target.value)} /></td>
                </tr>
                <tr className="st-item">
                    <td><button style={{ "background": "red", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleCancel} disabled={loading}>Cancel</button></td>
                    <td>
                        <button style={{ "background": "green", "border": 'none', "color": 'white', "padding": '5px' }} onClick={handleSave}>
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
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
