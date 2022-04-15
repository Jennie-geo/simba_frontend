import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import '../index.css';
import { contextObj } from './Context';
import useAxios from 'axios-hooks';
import Modal from './Modal';

const Create_transaction = (props) => {
    const [show, setShow] = useState(false)

    const contextData = useContext(contextObj);
    const [axiosResponse] = useAxios({
        url: `http://localhost:3800/transact/api/v1/createTransaction`,

            method: 'POST',
            headers: { 
                'Authorization': `bearer ${contextData.data.token}`
            },        
    body: JSON.stringify({
        //continue from here.
    })
    })

    if(!axiosResponse) {

    }
    return (
        <form className='auth-inner-transition'>
            <div className="table table-dark">

                <h2>Start Transaction</h2>
                <div>
                    <label>From</label>
                    <input type="text" className="form-control" placeholder="Enter sender account no" />
                </div>
                <div>
                    <label style={{ marginRight: "10px" }}>To</label>
                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setShow(true)}>
                        choose target
                    </button> */}
                    <button type="button" onClick={() => setShow(true)}>choose target</button>
                    {/* // pace your open props below */}
                    <Modal title="My modal" onClose={() => setShow(false)} show={show}> <p>This is the modal body</p> </Modal>
                    <div>
                        <input type="text" className="form-control" placeholder="receiver account number" />
                    </div>
                </div>
                <div>
                    <label>Value</label>
                    <input type="text" className="form-control" placeholder="Enter amount" />
                </div>
                <div>
                    <label>Source Currency</label>
                    <div className='input-field'>
                        <input type="text" className="form-control" placeholder="select currency type" />
                        <select defaultValue={'DEFAULT'}>
                            <option value='DEFAULT'>choose</option>
                            <option value='USD'>USD</option>
                            <option value='EUR'>EUR</option>
                            <option selected value='NGN'>NGN</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label>Target Currency</label>
                    <div className='input-field'>
                        <input type="text" className="form-control" placeholder="select currency type" />
                        <select defaultValue={'DEFAULT'}>
                            <option value='DEFAULT'>choose</option>
                            <option value='USD'>USD</option>
                            <option value='EUR'>EUR</option>
                            <option selected value='NGN'>NGN</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block"><Link to="/overview" style={{ color: '#fff', textDecoration: 'none' }}>Send</Link></button>
            </div>
        </form>
    )
}

export default Create_transaction