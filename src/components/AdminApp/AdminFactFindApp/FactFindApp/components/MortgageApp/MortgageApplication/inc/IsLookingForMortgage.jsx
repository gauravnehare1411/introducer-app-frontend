export default function IsLookingForMortgage({
    newMortgageType,
    setNewMortgageType,
    foundProperty,
    setFoundProperty,
    purchasePrice,
    setPurchasePrice,
    loanAmount,
    setLoanAmount,
    depositAmount,
    setDepositAmount,
    loanToValue2,
    sourceOfDeposit,
    setSourceOfDeposit,
    loanTerm,
    setLoanTerm,
    newPaymentMethod,
    setNewPaymentMethod,
    reference2,
    setReference2
}) {
    return (
        <>
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
                        <input type="radio" name="have-found-property" value={foundProperty} onChange={() => setFoundProperty("No")} />
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
                <td><input type="number" className='inp-data' placeholder='Enter Deposit Amount' value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} /></td>
            </tr>
            <tr className="st-item">
                <td><label>Loan To Value</label></td>
                <td>{loanToValue2} %</td>
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
    );
}
