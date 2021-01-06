import React, { useState } from 'react';
import axios from 'axios';

//import style
import {StyleAddCustomers} from '../styles/styled-components/StyleAddCustomers';


const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api/customer/search`
})

export default function Customers() {
    const [state, setState] = useState({customers: []});
    // const [name, setName] = useState("");
    const [type, setType] = useState("");


    const addCustomer = async (e) =>{
        e.preventDefault();
        
        //query data from database
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
                    {/* show query results */}
                    <table>
                        <thead>
                            <tr>
                                <th>Customers</th>
                                <th>Types</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.customers.map((cust, index) => 
                                    <tr key={index}>
                                        <td>{cust.name_customer}</td>
                                        <td>{cust.type_customer}</td>
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


