import React, { useState } from 'react';
import Select from 'react-select';
import AddCustomers from "./AddCustomers";
import Bill from './Bill';
import {StyleAddOrder} from '../../styles/styled-components/StyleAddOrder';

const axios = require('axios').default;

//value for cooking level
const options = [
    {value: 1, label: 'level 1'},
    {value: 2, label: 'level 2'},
    {value: 3, label: 'level 3'},
    {value: 4, label: 'level 4'},
    {value: 5, label: 'level 5'},
    {value: 6, label: 'level 6'},
    {value: 7, label: 'level 7'},
    {value: 8, label: 'level 8'},
    {value: 9, label: 'level 9'},
    {value: 10, label: 'level 10'},
];

//value for the customer's tone
const optionsTone = [
    {value: 'Angry', label: 'Angry'},
    {value: 'Happy', label: 'Happy'},
    {value: 'Pregnant', label: 'Pregnant'},
    {value: 'Bored', label: 'Bored'},
    {value: 'Overwhelmed', label: 'Overwhelmed'},
    {value: 'Moody', label: 'Moody'},
    {value: 'Excited', label: 'Excited'},
]

const AddOrders = ({TheOrderId, TheCustomerId}) => {
    const [food, setFood] = useState("");
    const [drink, setDrink] = useState("");
    const [priceFood, setPriceFood] = useState("");
    const [priceDrink, setPriceDrink] = useState("");
    const [levelCookedness, setLevelCookedness] = useState("");
    const [tone, setTone] = useState("");

    const [orderFalse, setorderFalse] = useState(false);
    const [orderTrue, setorderTrue] = useState(true);
    const [bill, setbill] = useState(false);

    function open(){
        setorderFalse(true);
        setorderTrue(false);
        setbill(false);
    };

    function switchBill(){
        setorderFalse(false);
        setorderTrue(false);
        setbill(true);
    }

    function addOrder(e) {
        e.preventDefault();
        
        //patch the order item into the order
        axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/order/add-order/${TheOrderId}`,
            withCredentials: true,
            data: {
                customerId: TheCustomerId,
                food: food,
                drink: drink,
                priceFood:  priceFood,
                priceDrink: priceDrink,
                level_cookedness: levelCookedness.value,
                tone: tone.value,
            },
        }).then((res) => {
            if(res.data.errors){
                alert("problem!!");
            }
            else{
                alert("order added");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    //changing the cooking level state
    const handleChange = levelCookedness =>{
        setLevelCookedness(levelCookedness);
        console.log(levelCookedness.value);
    }

    //changing the tone state
    const handleChangeTone = tone =>{
        setTone(tone);
        console.log(tone.value);
    }

    return(
        <StyleAddOrder>
            {
                //appears when we want to add another customer in the order
                orderFalse &&
                <div >
                    {
                            <AddCustomers 
                                TheOrderId = {TheOrderId}
                            />
                    }
                    {/* <AddCustomers TheOrderId = {state.newOrder._id}/> */}
                </div> 
            }
            {
                //main screen 
                orderTrue &&
                    <div>
                        <div className="containeur">
                            <h4>New Order</h4>
                            <form id="form" action="" onSubmit={addOrder}>
                                <div className="food">
                                    <div >
                                        <label htmlFor="food">Food</label>
                                        <input 
                                        id="food"
                                        placeholder="Enter food" 
                                        name="food" 
                                        required="required"
                                        onChange={(e) => setFood(e.target.value)}
                                        value={food}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pricef">Price</label>
                                        <input 
                                        id="pricef"
                                        placeholder="Enter price of food" 
                                        name="priceFood" 
                                        required="required"
                                        onChange={(e) => setPriceFood(e.target.value)}
                                        value={priceFood}
                                        />
                                    </div>
                                </div>
                                <div className="drink">
                                    <div>
                                        <label htmlFor="drink">Drink</label>
                                        <input 
                                        id="drink"
                                        placeholder="Enter drink" 
                                        name="drink" 
                                        required="required"
                                        onChange={(e) => setDrink(e.target.value)}
                                        value={drink}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="priced">Price</label>
                                        <input 
                                        id="priced"
                                        placeholder="Enter price of drink" 
                                        name="priceDrink" 
                                        required="required"
                                        onChange={(e) => setPriceDrink(e.target.value)}
                                        value={priceDrink}
                                        />
                                    </div>
                                </div>
                                <div className="option">
                                    <div className="option1">
                                        <label>Level cookedness</label>
                                        <Select 
                                            value={levelCookedness}
                                            onChange={handleChange} 
                                            options={options}
                                        />
                                    </div>
                                    <div className="option2">
                                        <label>Tone</label>
                                        <Select 
                                            value={tone}
                                            onChange={handleChangeTone} 
                                            options={optionsTone}
                                        />
                                    </div>
                                </div>
                                <div id="buttons">
                                    <button className="button" type="submit">Submit</button>
                                </div>
                            </form>
                            <button id="buttonFlui" onClick={open}>add customer</button>
                            <button id="buttonBill" onClick={switchBill}>Bill --</button>
                        </div>
                    </div>
            } 
            {
                //appears when we click on "bill"
                bill &&
                <Bill TheOrderId = {TheOrderId} />
            }
        </StyleAddOrder>
    );
};

export default AddOrders;
