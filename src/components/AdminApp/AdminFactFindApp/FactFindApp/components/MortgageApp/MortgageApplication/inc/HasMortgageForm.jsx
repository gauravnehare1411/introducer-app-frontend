export default function HasMortgageForm({
    paymentMethod,
    setPaymentMethod,
    estPropertyValue,
    setEstPropertyValue,
    mortgageAmount,
    loanToValue1,
    setMortgageAmount,
    furtherAdvance,
    setfurtherAdvance,
    mortgageType,
    setMortgageType,
    productRateType,
    setProductRateType,
    renewalDate,
    setRenewalDate,
    reference1,
    setReference1
}) {
    return (
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
    );
}
