import React, { useState } from 'react';
import Select from 'react-select';
import {StyleAddOrder} from '../../styles/styled-components/StyleAddOrder';

const axios = require('axios').default;

const options = [
    {value: 'Group', label: 'Group'},
    {value: 'Person', label: 'Person'},
    {value: 'Ratios', label: 'Ratios'},
];

const Bill = ({TheOrderId}) => {
    const [feedback, setFeedback] = useState("");
    const [splitBill, setSplitBill] = useState("");
    const [state, setState] = useState({total: []});

    const [billTrue, setBillTrue] = useState(false);
    const [totalBi, setTotalBi] = useState(true);

    function open(){
        setBillTrue(true);
        setTotalBi(false);

        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/order/total/${TheOrderId}`,
        }).then((res) => {
            if(res.data.errors){
                alert("error");
            }
            else{
                setState({total: [...res.data]});
            }
        }).catch((err)=>{
            console.log(err);
        })
    };

    function EndOrder(e) {
        e.preventDefault();

        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/order/${TheOrderId}`,
            withCredentials: true,
            data: {
                bill: parseInt(state.total.map(totalB => 
                        totalB.totalBill
                ), 10),
                split_bill: splitBill.value,
                feedback: feedback
            },
        }).then((res) => {
            if(res.data.errors){
                alert("problem!!");
            }
            else{
                alert("thank for order");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleChange = splitBill =>{
        setSplitBill(splitBill);
        console.log(splitBill.value);
    }

    return(
        <StyleAddOrder>
            {
                billTrue &&
                    <div>
                        <div className="containeur">
                            <form id="form1" action="" onSubmit={EndOrder}>
                                <div>
                                    <h4>Total bill</h4>
                                    {
                                        state.total.map(totalB => 
                                            <div>
                                                <h5>$<strong>{totalB.totalBill}</strong></h5>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="option3">
                                    <label>Split of the bill</label>
                                    <Select 
                                        value={splitBill}
                                        onChange={handleChange} 
                                        options={options}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="feedback">Feedback</label>
                                    <textarea 
                                        id="feedback"
                                        name="feedback"
                                        placeholder="Enter feedback"
                                        rows={7}
                                        required="required"
                                        onChange={(e) => setFeedback(e.target.value)}
                                        value={feedback}
                                    />
                                </div>
                                <div id="buttons">
                                    <button className="button" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
            } 
            {
                totalBi &&
                <div className="buttonTotalBill">
                    <button id ="buttonTotal" onClick={open}>Click here to see the total of bill</button>
                </div>
                
            }
        </StyleAddOrder>
    );
};

export default Bill;
