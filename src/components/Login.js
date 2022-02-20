import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import '../index.css';

function Login() {
    return (
        <form>
            <div className="auth-inner">
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
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
export default Login