import React, { useState } from 'react';
import AddOrders from './AddOrders';
import {StyleAddCustomers} from '../../styles/styled-components/StyleAddCustomers';


const axios = require('axios').default;


const AddCustomers = ({TheOrderId}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const [state, setState] = useState({newCustomer: []});
    const [addCustomers, setAddCustomer] = useState(true);
    const [orderButton, setOrderButton] = useState(false);
    const [addOrder, setAddOrder] = useState(false);


    function addCustomer(e) {
        e.preventDefault();
        // post the customer's name and type in database
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/customer/`,
            withCredentials: true,
            data: {
                name_customer: name,
                type_customer: type
            },
        }).then((res) => {
            if(res.data.errors){
                alert("problem!!");
            }
            else{
                setState({newCustomer: [res.data]})
                alert("customer added");
            }
        }).catch((err)=>{
            console.log(err);
        });

        setOrderButton(true);
    }

    //change state
    function open(){
        setAddCustomer(false);
        setOrderButton(false);
        setAddOrder(true);
    }

    return(
        <StyleAddCustomers>
            {
                //add name and type of customer
                addCustomers &&
                <div className="container">
                <h4>New customer</h4>
                <form action="" onSubmit={addCustomer}>
                    <label htmlFor="name">Name</label>
                    <input 
                        placeholder="Enter customer" 
                        name="name" 
                        id="name"
                        required="required"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label htmlFor="type">Type</label>
                    <input 
                        placeholder="Enter type of customer" 
                        name="type" 
                        id="type"
                        required="required"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />
                    <div id="buttons">
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
                {
                    //is show when the customer was add
                    orderButton && 
                    <div id="bout"><button className="button1" onClick={open}>Associate an order</button></div>
                }
            </div>               
            }
            {
                //is show when we click on "associate an order"
                addOrder && 
                state.newCustomer.map(cus => 
                    <AddOrders
                        key={cus.toString()} 
                        TheCustomerId = {cus._id}
                        TheOrderId={TheOrderId}
                    />)
            }     
        </StyleAddCustomers>
    );
};

export default AddCustomers;


