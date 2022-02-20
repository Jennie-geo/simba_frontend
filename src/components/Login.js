import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../index.css';
import PropTypes from 'prop-types'

// import { loginUser } from '../loginUser';

async function loginUser(credentials) {
    return fetch('localhost:3800/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function Login({ setToken }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="auth-inner">
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block"><Link to="/overview">Submit</Link></button>

            </div>
        </form>
    );

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login