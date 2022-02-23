import React, { Fragment, useContext, useEffect } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { contextObj } from './Context';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
// import styled from 'styled-components';
//you loose nothing by serving the lord, instead you have everything to gain.

const Overview
    = () => {
        const navigate = useNavigate();
        const contextData = useContext(contextObj);
        const [axiosResponse, refetch] = useAxios({
            url: `${process.env.REACT_APP_BACKEND_URL}/user/getAUser`,
            headers: { 'Authorization': `bearer ${contextData.data.token}` }
        })
        const [transactionResponse] = useAxios({
            url: 'http://localhost:3800/transact/api/v1/getTransaction',
            headers: { 'Authorization': `bearer ${contextData.data.token}` }
        })

        if (axiosResponse.loading) {
            return <h2>Getting data... Please wait.</h2>
        }

        if (!axiosResponse.loading && axiosResponse.error) {
            if (contextData.data.token) {
                refetch()
                return <h2>Getting data... Please wait.</h2>
            } else {
                console.log('refetch failed:', contextData)
                contextData.logout()
            }
            return <div>
                <h1>Page Load Error</h1>
                <p>Unable to get your data.<Link to='/sign-in' style={{ color: '#fff' }}>Click here to login</Link></p>
            </div>

        }

        const userData = axiosResponse.data;

        let transactionData = []
        if (!transactionResponse.loading && !transactionResponse.error) {
            transactionData = transactionResponse.data.msg
        }

        return (
            <>
                <div className='transaction'>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <h1 style={{ marginRight: '15px' }}>Welcome! </h1>
                        <h4 style={{ marginTop: '10px' }}>{userData.details.firstName} {userData.details.lastName}</h4>
                    </div>
                    <div className="auth-inner-transition">
                        <div className='table_header'>
                            <h3>Transaction</h3>
                            <button className="btn" style={{ width: "200px", backgroundColor: "#167bff", padding: "1px", color: 'white', textDecoration: 'none' }}><Link to="/create-transaction"
                                style={{ color: 'white', textDecoration: 'none' }}>NEW TRANSACTION</Link></button>
                        </div>
                        <div className='mt-4'>
                            <table className='table table-dark'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Value</th>
                                        <th>Source Currency</th>
                                        <th>Target Currency</th>
                                        <th>Exchange Rate</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionData.map(transaction => (
                                        <tr>
                                            <td>{transaction._id}</td>
                                            <td style={{ marginLeft: '-2rem' }}>{transaction.senderAccount_nr}</td>
                                            <td >{transaction.receiverAccount_nr}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.source_currency}</td>
                                            <td>{transaction.target_currency}</td>
                                            <td>{transaction.exchange_rate}</td>
                                            <td>{transaction.createdAt}</td>
                                            <td>{transaction.updatedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>

        )
    }
export default Overview
