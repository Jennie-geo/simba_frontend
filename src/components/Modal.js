import React from 'react'
import '../index.css';
import './Modal.css';

const Modal = ({ closeModal }) => {
    return <div className='modalBackground' >
        <div className='modalContainer' style={{ backgroundColor: "white", color: "black" }}>
            <div className='titleCloseBtn'>
                <button onClick={() => closeModal(false)}> X </button>
            </div>
            <div className='title'><h2>Select an account name below</h2></div>
            <div className="body">
                <div className='firstName'>Jennifer</div>
                <div className='lastName'>Isintume</div>
            </div>
            <div className='footer'>
                <button onClick={() => closeModal(false)} id="cancelBtn">Cancel</button>
                <button>Continue</button>
            </div>
        </div>
    </div>
}

export default Modal
