import React, { useContext } from 'react';
import useAxios from 'axios-hooks';
import { contextObj } from './Context';
import '../index.css';
import './Modal.css';

const Modal = ({ closeModal }) => {
    const contextData = useContext(contextObj);
    const [axiosUserResponse] = useAxios({
        url: `${process.env.REACT_APP_BACKEND_URL}/user/getUser`,
        headers: { 'Authorization': `bearer ${contextData.data.token}` }
    })

    let userData = []
    if (!axiosUserResponse.error) {
        userData = axiosUserResponse.data.user;

    }

    return <div className='modalBackground' >
        <div className='modalContainer' style={{ backgroundColor: "white", color: "black" }}>
            <div className='titleCloseBtn'>
                <button onClick={() => closeModal(false)}> X </button>
            </div>
            <div className='title'><h2>Select an account name below</h2></div>
            {userData.map(user => (
                <div className="body" >
                    <div className='firstName' style={{ marginRight: "12px" }}>{user.firstName}</div>
                    <div className='lastName'>{user.lastName}</div>
                </div>
            ))}
            <div className='footer'>
                <button onClick={() => closeModal(false)} id="cancelBtn">Cancel</button>
                <button>Continue</button>
            </div>
        </div>
    </div>
}

export default Modal
