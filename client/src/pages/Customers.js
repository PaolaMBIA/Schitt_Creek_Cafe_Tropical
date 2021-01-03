import React, { useState } from 'react';
import {StyleAddCustomers} from '../styles/styled-components/StyleAddCustomers';

import axios from 'axios';


const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api/customer/search`
})

export default function Customers(props) {
    const [state, setState] = useState({customers: []});
    // const [name, setName] = useState("");
    const [type, setType] = useState("");


    const addCustomer = async (e) =>{
        e.preventDefault();
        
        try {
            let data = await api.get('', {
            params: {
                type_customer: type,          
            },
        }).then(({data}) => data);

        setState({customers: data});
        console.log(data);
        } catch(err){
            console.log(err);
        }
    }

    return(
        <StyleAddCustomers>
            <div className="container">
                <h4>Search customer</h4>
                <form action="" onSubmit={addCustomer}>
                    {/* <input 
                        placeholder="Enter customer" 
                        name="name" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    /> */}
                    <label htmlFor="type">Type of customer</label>
                    <input 
                        placeholder="Enter type of customer" 
                        name="type" 
                        id="type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />
                    <div id="buttons">
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className="containerfluide">
            <div className="results">
                <h4>Results</h4> 
                <div> 
                    <table>
                        <thead>
                            <tr>
                                <th>Customers</th>
                                <th>Types</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.customers.map(cust => 
                                    <tr key={cust.id}>
                                        <td key={cust.id}>{cust.name_customer}</td>
                                        <td key={cust.id}>{cust.type_customer}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </StyleAddCustomers>
    );
};


