import {React, useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditNewMortgage() {
    const location = useLocation();
    const navigate = useNavigate();
    const newMortgage = location.state;
    const [newMortgageType, setNewMortgageType] = useState(newMortgage.newMortgageType);
    const [foundProperty, setFoundProperty] = useState(newMortgage.foundProperty);
    const [purchasePrice, setPurchasePrice] = useState(newMortgage.purchasePrice);
    const [loanAmount, setLoanAmount] = useState(newMortgage.loanAmount);
    const [depositAmount, setDepositAmount] =useState(newMortgage.depositAmount);
    const [loanToValue2, setLoanToValue2] = useState(newMortgage.loanToValue2);
    const [sourceOfDeposit, setSourceOfDeposit] = useState(newMortgage.sourceOfDeposit);
    const [loanTerm, setLoanTerm] = useState(newMortgage.loanTerm);
    const [newPaymentMethod, setNewPaymentMethod] = useState(newMortgage.newPaymentMethod);
    const [reference2, setReference2] = useState(newMortgage.reference2);

    useEffect(() => {
        if (purchasePrice > 0) {
          const calculatedLTV = ((purchasePrice - depositAmount) / purchasePrice * 100);
          setLoanToValue2(calculatedLTV.toFixed(2));
        } else {
          setLoanToValue2(0);
        }
      }, [depositAmount, purchasePrice]);

    const handleSave = async () => {
        const payload = {
            id: newMortgage.id,
            isLookingForMortgage: newMortgage.isLookingForMortgage,
            newMortgageType,
            foundProperty,
            purchasePrice,
            loanAmount,
            depositAmount,
            loanToValue2,
            sourceOfDeposit,
            loanTerm,
            newPaymentMethod,
            reference2,
        };

        console.log(payload);
    
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/update-new-mortgage/${newMortgage.user_id}`, 
                payload
            );
            alert(response.data.message)
            if (newMortgage.isAdmin){
                navigate('/myclients');
            }

            else if (newMortgage.isUser){
                navigate('/response');
            }
             
        } catch (error) {
            console.error('Error updating mortgage:', error);
            alert('Failed to update mortgage. Please try again.');
        }
    };

    const handleCancel = () =>{
        if (newMortgage.isAdmin){
            navigate('/myclients');
        }

        else if (newMortgage.isUser){
            navigate('/response');
        }
    }
    return (
        <div className="user-details-container">
                <h2 className="mortgage-details-title" style={{"marginTop": "50px"}}>Mortgage Details</h2>
                <table className="user-details-table">
                    <tbody>
                    <tr>
                        <th>User ID</th>
                        <td>{newMortgage.user_id}</td>
                    </tr>
                    <tr>
                        <th>Mortgage ID</th>
                        <td>{newMortgage.id}</td>
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
                    <tr>
                        <th><label>Have you found the property?</label></th>
                        <td>
                            <label>
                              <input type="radio" name="have-found-property" value={foundProperty} required onChange={() => setFoundProperty("Yes")} />
                              Yes
                            </label>
                            &nbsp;
                            <label>
                              <input type="radio" name="have-found-property" value={foundProperty} onChange={() => setFoundProperty("No")}/>
                              No
                            </label>
                        </td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Purchase Price</label></th>
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
                        <th><label>Loan Amount</label></th>
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
                        <th><label>Approximate Deposit Amount</label></th>
                        <td><input type="number" className='inp-data' placeholder='Enter Deposit Amount' value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)}/></td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Loan To Value</label></th>
                        <td>{ loanToValue2 } %</td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Source of Deposit</label></th>
                        <td>
                            <select className="inp-data" value={sourceOfDeposit} onChange={(e) => setSourceOfDeposit(e.target.value)} required>
                              <option value="">Select</option>
                              <option value="savings">Savings</option>
                              <option value="other">Other</option>
                            </select>
                        </td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Loan Term in Years</label></th>
                        <td><input type="number" className='inp-data' placeholder='Years' value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} /></td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Payment Method</label></th>
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
                        <th><label>Reference</label></th>
                        <td><input type="text" className='inp-data' placeholder='If Any' value={reference2} onChange={(e) => setReference2(e.target.value)} /></td>
                    </tr>
                    <tr className="st-item">
                        <td><button style={{"background": "red", "border": 'none', "color": 'white', "padding": '5px'}} onClick={ handleCancel }>Cancle</button></td>
                        <td><button style={{"background": "green", "border": 'none', "color": 'white', "padding": '5px'}} onClick={ handleSave } >Save</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };
