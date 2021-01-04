import React, { useState } from 'react';
import axios from 'axios';
import {StyleAddOrder} from '../styles/styled-components/StyleAddOrder';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api/order`
});

const Statistic = () => {
    let totalMoney = 0;
    const [totaux, setTotaux] = useState("...");
    const [state, setState] = useState({orders: []});

    const open = async () =>{          
        try {
            let data = await api.get('/diner', {
        }).then(({data}) => data);

        setState({orders: data});
        console.log(data);
        } catch(err){
            console.log(err);
        }
    }
    
    function calculate(){
        state.orders.map(calcul =>
            totalMoney += calcul.total
        );

        setTotaux(totalMoney);
 
    }

    return(
        <StyleAddOrder>
            <div className="containeur">
                <div id="buttons">
                    <button className="button" onClick={open}>Click here </button>
                </div>  
                <h4>Results</h4>
                <div>
                    <table>
                        <tr>
                            <th>Date</th>
                            {
                                state.orders.map(gaga =>
                                    <td>
                                    {    
                                        gaga.createdAt
                                    }                          
                                    </td>
                                ) 
                            }

                        </tr>
                        <tr>
                            <th>Money</th>
                            {
                                state.orders.map(gaga =>
                                    <td>$
                                    {    
                                        gaga.total
                                    }                          
                                    </td>
                                ) 
                            }
                        </tr>
                    </table>
                    <div id="buttons">
                        {
                            <p>Twyla serve __"{state.orders.length}"__   8-rated overcooked in the last 6 month </p>
                        }
                    </div>
                    <div >
                        <button className="button" onClick={calculate}>See total</button>
                    </div>
                    
                    <div>
                        {
                            <p>We earned __"${totaux}"__ </p>
                        }
                    </div>
                </div>
            </div>
        </StyleAddOrder>
    );
};

export default Statistic;
