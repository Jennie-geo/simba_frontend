import React, { useState, useEffect } from "react";
export function SignUp() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    //   const [error, setError] = useState()

    useEffect(() => {

    }, [])
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3800/api/v1/user/user_signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "appliction/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
            })
            if (!response.ok) {
                const errorDate = await response.json()
                throw new Error(errorDate)
            }
            const resp = await response.json()
            console.log('successful', resp)
        } catch (err) {
            console.log(err)
        }
    }
    const HandleSetFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const HandleSetLastName = (e) => {
        setLastName(e.target.value)
    }
    const HandleSetEmail = (e) => {
        setFirstName(e.target.value)
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="auth-inner">
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name='firstName' onChange={HandleSetFirstName} />
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name='lastName' onChange={HandleSetLastName} />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={HandleSetEmail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" password='password' onChange={HandlePassword} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </div>
        </form>
    );
}
export default SignUp