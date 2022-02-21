import React, { useState, useContext } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../index.css';
import PropTypes from 'prop-types'
import { contextObj } from './Context';
import { useNavigate } from "react-router-dom";
//import { loginUser } from '../loginUser';



function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //console.log(email, password, 'checking.....')

    const { loginSuccessful } = useContext(contextObj)
    const navigate = useNavigate();

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }
    function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            firstName: formData.firstName,
            email: formData.email
        };
        const token = formData.password;
        fetch('http://localhost:3800/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify({
                ...formData,
                email: formData.email
            })
        }).then((res) => res.json()).then((data) => {
            loginSuccessful(formData, data.token);
        }).catch((err) => console.log(err))
        navigate('/overview')
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:3800/api/v1/user/login',
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     //Accept: "application/json",
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     email: email,
    //                     password: password
    //                 }),
    //             }
    //         );
    //         //handling edge cases error
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.log(errorData, "auth")
    //             throw new Error(errorData);
    //         }
    //         //retreiving response
    //         const resData = await response.json();
    //         console.log(resData, "response")

    //     }
    //     catch (err) {
    //         throw new Error(err)
    //     }

    //}
    // const HandleEmail = (e) => {
    //     setEmail(e.target.value)
    // }
    // const HandlePassword = (e) => {
    //     setPassword(e.target.value)
    // }
    return (
        <form onSubmit={handleSubmit}>
            <div className="auth-inner">
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={handleChange} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>

            </div>
        </form>
    );

}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
export default Login