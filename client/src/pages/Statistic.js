import React, { useState } from 'react';
import axios from 'axios';

import CanvasJSReact from '../assets/canvasjs.react';

//var CanvasJSReact = require('./canvasjs.react');
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
//let Component = React.Component;


const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api/order`
});



const Statistic = () => {
    let totalMoney = 0;
    const [totaux, setTotaux] = useState("...");
    const [state, setState] = useState({ orders: [] });
    const [meanV, setMean] = useState(null);
    const [canva, setCanva] = useState(false);
    //const [dataPoints, setDataPoints] = useState({dataPoints: []})  

    function open(){   

        //query data from database       
        try {
            api.get('/diner', {
            }).then(({data}) => {let d= data
                setState({orders: d});
            });
     
        } catch(err){
            console.log(err);
        }

        setCanva(true); 
    };

    const dataPoints = state.orders.map(dataP =>{
      return  {label : dataP.createdAt, y: dataP.total}
    });

    function mean(){   

        //query data from database       
        try {
            api.get('/mean', {
            }).then(({data}) => {let d= data
                setMean(d);
            });
     
        } catch(err){
            console.log(err);
        }

        console.log(meanV); 
    };
    
    //sum the total bill and set the money earned
    function calculate(){
        state.orders.map(calcul =>
            totalMoney += calcul.total
        );
        setTotaux(totalMoney);
    }
    //{ x:  new Date("2019-03-01"), y:  state.orders.length },

    const options = {
        
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "statistic of 8-rated overcooked"
        },
        axisX:{
            title: "Date",
            valueFormatString: "DD MMM HH MM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Price (in DOLLAR)",
            valueFormatString: "$##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "€" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
 
        data: [{
            type: "area",
            xValueFormatString: "DD MMM  HH MM",
            yValueFormatString: "€##0.00",
            dataPoints: dataPoints
        }],

        
    }

    return(
        <>
        <div>
            {
                canva &&
            <CanvasJSChart options = {options}
            //  onRef = {ref => this.chart = ref} 
             />
            }

        </div>
        <div>
            <div className="containeur">
                <div id="buttons">
                    <button className="button" onClick={open}>Click here </button>
                </div>  
                <h4>Results</h4>
                {/* show the query results */}
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Date</th>
                                {
                                    state.orders.map((gaga, index) =>
                                        <td key={index}>
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
                                    state.orders.map((gaga, index) =>
                                        <td key={index}>$
                                        {    
                                            gaga.total
                                        }                          
                                        </td>
                                    ) 
                                }
                            </tr>
                        </tbody>
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
                        
                    <div>
                        <button className="button" onClick={mean}>See mean Value</button>
                    </div>
                    <div>
                        {
                            <p>Mean __"${meanV}"__ </p>
                        }
                    </div>
                </div>
            </div>
        </div>

        </>
    );
};

export default Statistic;
