import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Overview from './components/Overview';
import Createtransaction from './components/Create_transaction';
import { contextObj } from './components/Context'
import { useContext } from 'react';
import Modal from './components/Modal';

function App() {

  const { data, logout } = useContext(contextObj);
  const { token } = data;
  console.log('>>>app:', data)
  const navigate = useNavigate()

  function handleLogout() {
    logout();
    navigate('/sign-in')

  }

  return (
    <>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>FxChange</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              {
                !token ?
                  (<ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>Sign up</Link>
                    </li>
                  </ul>) :
                  (<ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <button className="nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>)
              }
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">

          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/create-transaction" element={<Createtransaction />} />
          </Routes>

        </div>
      </div>
    </>
  );
}
export default App;