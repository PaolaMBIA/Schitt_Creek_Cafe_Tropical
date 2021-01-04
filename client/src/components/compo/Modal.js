import React, {useEffect, useState} from "react";
import {StyleModal} from '../../styles/styled-components/StyleModal';

export default function Modal(props) {
    const [number, setNumber] = useState("");

    function close() {
        props.modalElement.current.style.display = 'none';
    }
    function open() {
        props.modalElement.current.style.display = 'block';
    }

    useEffect(() => {
        props.buttonOpen.current.onclick = open;
    });

return (
    <StyleModal>
        <div className="container">
            <h4>Number of customer</h4>
            <form action="" id='numberForm' onSubmit={e => props.addNumber(e)}>
                <input 
                    placeholder="Enter number" 
                    name="number" 
                    required="required"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                />
                <div id="buttons">
                    <button className="button1" type="submit">Submit</button>
                    <button className="button2" type="button" onClick={close}>Cancel</button>
                </div>
            </form>
        </div>
    </StyleModal>
);
}