import React, {useRef, useState} from 'react';
import Modal from '../components/compo/Modal';
import table from '../styles/assets/table.jpg';
import AddCustomers from "../components/compo/AddCustomers";
import '../styles/sass/style.scss';

import {StyleHome} from '../styles/styled-components/StyleHome';

import axios from 'axios';


const Home = () => {
    const buttonOpen = useRef(null);
    const modalElement = useRef(null);

    let number;

    const [state, setState] = useState({newOrder: []});
    const [homeFalse, sethomeFalse] = useState(false);
    const [numberAdd, setnumberAdd] = useState(true);
    const [homeTrue, sethomeTrue] = useState(true);


    function addNumber(e) {
        e.preventDefault();
        console.log('Add number !!', e.target.number.value);
        number = e.target.number.value;

        modalElement.current.style.display = 'none';
        sethomeTrue(false);
        setnumberAdd(false);
        sethomeFalse(true);

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/order/`,
            withCredentials: true,
            data: {
                nbr_customer: number,
            },
        }).then((res) => {
            if(res.data.errors){
                alert("problem!!");
            }else{
                setState({newOrder: [res.data]});
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
            {
                homeFalse &&
                <div >
                    {
                        state.newOrder.map(or => 
                            <AddCustomers 
                                key={or.toString()}
                                TheOrderId = {or._id}
                            />)
                    }
                    {/* <AddCustomers TheOrderId = {state.newOrder._id}/> */}
                </div> 
            }
            {
                homeTrue && 
                <StyleHome>
                    <h3>ROOM</h3>
                    <div className="container">
                        <div className="table">
                            <img src={table}  ref={buttonOpen} alt="table"/>
                            <h5>Table 1</h5>
                        </div>
                        <div className="table">
                            <img src={table} alt="table"/>
                            <h5>Table 2</h5>
                        </div>
                        <div className="table1">
                            <img src={table} alt="table"/>
                            <h5>Table 3</h5>
                        </div>
                        <div className="table">
                            <img src={table} alt="table"/>
                            <h5>Table 4</h5>
                        </div>
                        <div className="table">
                            <img src={table} alt="table"/>
                            <h5>Table 5</h5>
                        </div>
                    </div>
                </StyleHome>
            }

            {
                numberAdd && 
                <StyleHome>
                    <div id="numberModal" ref={modalElement}>
                        <Modal addNumber={addNumber} buttonOpen={buttonOpen} modalElement={modalElement}/>
                    </div>
                </StyleHome>
            }

        </div>
    );
};

export default Home;