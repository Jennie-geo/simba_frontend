import React, { useState, useContext, useRef } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../index.css';
import PropTypes from 'prop-types'
import { contextObj } from './Context';
import { useNavigate } from "react-router-dom";
import validate from "../validateForm";



function Login() {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitBtn = useRef(null)

    const { loginSuccessful } = useContext(contextObj)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setErrors(validate)
        submitBtn.current.disabled = true;
        submitBtn.current.innerText = 'Please wait...'
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`,
                {
                    method: "POST",
                    headers: {
                        //Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                }
            );
            //handling edge cases error
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData, "auth")
                throw new Error(errorData);
            }
            //retreiving response from the server
            const resData = await response.json();
            //save token to session
            loginSuccessful(null, resData.token);
            navigate('/overview')


        }
        catch (err) {
            alert('Error occurred while trying to login.')
            console.log(err)
            submitBtn.current.disabled = false;
            submitBtn.current.innerText = 'Login'
        }

    }
    const HandleEmail = (e) => {
        setEmail(e.target.value)
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="auth-inner">
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={HandleEmail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={HandlePassword} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button ref={submitBtn} className="btn btn-primary btn-block" onClick={handleSubmit}>Login</button>

            </div>
        </form>
    );

}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
export default Login