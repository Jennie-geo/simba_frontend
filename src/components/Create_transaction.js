import React from 'react'
import { Link } from 'react-router-dom';
import '../index.css';
const Create_transaction = () => {
    return (
        <form className='value-output'>
            <div className="auth-inner">

                <h2>Start Transaction</h2>
                <div>
                    <label>From</label>
                    <input type="text" className="form-control" placeholder="Enter account no" />
                </div>
                <div>
                    <label>To</label>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block"><Link to="/popup" style={{ color: '#fff', textDecoration: 'none' }}>choose target</Link></button>
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
                        <select>
                            <option value="grapefruit">USD</option>
                            <option value="lime">EUR</option>
                            <option selected value="coconut">NGN</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label>Target Currency</label>
                    <div className='input-field'>
                        <input type="text" className="form-control" placeholder="select currency type" />
                        <select>
                            <option value="grapefruit">USD</option>
                            <option value="lime">EUR</option>
                            <option selected value="coconut">NGN</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block"><Link to="/overview" style={{ color: '#fff', textDecoration: 'none' }}>Submit</Link></button>
            </div>
        </form>
    )
}

export default Create_transaction