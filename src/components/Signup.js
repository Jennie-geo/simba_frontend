import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export function SignUp() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    useEffect(() => {

    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            console.log(firstName, "fuirstnnamr")
            const response = await fetch('http://localhost:3800/api/v1/user/user_signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
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
            navigate('/sign-in')
        } catch (err) {
            console.log(err)
        }
    }
    // const handleValidation = () => {
    //     let formIsValid = true;
    //     //Name
    //     if (!firstName) {
    //         formIsValid = false;
    //         errors[firstName] = 'Cannot be empty'
    //     }
    //     if (typeof firstName !== "undefined") {
    //         if (!firstName.match(/^[a-zA-Z]+$/)) {
    //             formIsValid = false;
    //             errors[firstName] = "Only letters";
    //         }
    //     }
    //lstName
    //     if (!lastName) {
    //         formIsValid = false;
    //         errors[lastName] = 'Cannot be empty'
    //     }
    //     if (typeof firstName !== "undefined") {
    //         if (!lastName.match(/^[a-zA-Z]+$/)) {
    //             formIsValid = false;
    //             errors[lastName] = "Only letters";
    //         }
    //     }
    // }
    // const contactSubmit = (e) => {
    //     e.preventDefault();

    //     if (this.handleValidation()) {
    //       alert("Form submitted");
    //     } else {
    //       alert("Form has errors.");
    //     }
    //   }
    // const validateFullName = () => {
    //     if (!new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/).test(firstName)) {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             firstName: 'Enter a valid first Name'
    //         }));
    //         return false;
    //     } else {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             firstName: '',
    //         }));
    //         return true;
    //     }
    // };

    // const validatelastName = () => {
    //     if (!new RegExp(/^[a-zA-Z]+ [a-zA-Z]+$/).test(lastName)) {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             lastName: 'Enter a valid last Name'
    //         }));
    //         return false;
    //     } else {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             lastName: '',
    //         }));
    //         return true;
    //     }
    // };

    // const validatelastEmail = () => {
    //     if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             email: 'Enter a valid email'
    //         }));
    //         return false;
    //     } else {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             email: '',
    //         }));
    //         return true;
    //     }
    // };
    // const validatePassword = () => {
    //     if (!new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})').test(password)) {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             password: 'Enter a valid email'
    //         }));
    //         return false;
    //     } else {
    //         setErrors((prevState) => ({
    //             ...prevState,
    //             password: '',
    //         }));
    //         return true;
    //     }
    // };


    const HandleSetFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const HandleSetLastName = (e) => {
        setLastName(e.target.value)
    }
    const HandleSetEmail = (e) => {
        setEmail(e.target.value)
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
                    Already registered? <a href="/sign-in">sign in</a>
                </p>
            </div>
        </form>
    );
}
export default SignUp