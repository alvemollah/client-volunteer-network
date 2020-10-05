import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './registration.css';

const Registration = () => {
    const [show, setShow] = useState();

    const [user] = useContext(UserContext);
    const [registerForm, setRegisterForm] = useContext(UserContext);
    const history = useHistory();

    const handleInput = (event) => {
        setRegisterForm({ ...registerForm, ...user, [event.target.name]: event.target.value })
    };

    const handleClose = () => {
        setShow(false);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('https://volunteer--network.herokuapp.com/registerForVolunteering', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerForm)
        })
            .then(res => {
                if (res.status === 200) {
                    setShow(true)
                }
            })
    }
    return (
        <div className="login-page d-flex flex-column justify-content-center align-items-center">
            <div className="login-box-outside d-flex flex-column justify-content-center align-items-center">
                <Link to="/home"><img src="https://i.ibb.co/60VGHLd/Group-1329.png" className="logo" alt="Volunteer Network" /></Link>
                <div className="login-box-inside d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-info">Create an Account</h3>
                    <input className="form-control" name="email" type="email" placeholder="Email address"/>
                    <input className="form-control" type="password" name="password" placeholder="Password"/>
                    <button><Link to="/events">SignUp</Link></button>
                    <button onClick={handleLogin} className="login-btn d-flex justify-content-center align-items-center"><FontAwesomeIcon className="red" icon={faGoogle} />Continue with Google</button>
                    <p>Already have an account? <Link to="/registration">Signin</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;