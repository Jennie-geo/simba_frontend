import React, { Fragment } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
//you loose nothing by serving the lord, instead you have everything to gain.

const Overview
    = () => {
        return (
            <Fragment className='transaction'>
                <div className="auth-inner-transition">
                    <div className='table_header'>
                        <h3>Transaction</h3>
                        <button className="btn" style={{ width: "200px", backgroundColor: "#167bff", padding: "1px", color: 'white', textDecoration: 'none' }}><Link to="/create-transaction"
                            style={{ color: 'white', textDecoration: 'none' }}>NEW TRANSACTION</Link></button>
                    </div>

                    <div className='value-output'>
                        <h6 className='transaction-form'>ID</h6>
                        <h6 className='transaction-form'>From</h6>
                        <h6 className='transaction-form'>To</h6>
                        <h6 className='transaction-form'>Value</h6>
                        <h6 className='transaction-form'>Currency</h6>
                        <h6 className='transaction-form'>Created At</h6>
                        <h6 className='transaction-form'>Created At</h6>
                    </div>
                </div>
            </Fragment>
        )
    }

// const Header = styled.div`
//     display: flex;
//     justify-content: space-around,
//     `

export default Overview
