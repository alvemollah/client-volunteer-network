import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import './login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL, uid } = result.user;
                const loggedUser = { name: displayName, email, uniqueId: uid, img: photoURL };
                setUser({ ...user, ...loggedUser });
                authToken();
                history.replace(from)

            })
            .catch(error => {
                console.log(error)
            });
    }

    const authToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then(userToken => {
                sessionStorage.setItem('userToken', userToken)
            })
            .catch(error => {
                console.log(error)
            });
    }
    return (
        <div className="login-page d-flex flex-column justify-content-center align-items-center">
            <div className="login-box-outside d-flex flex-column justify-content-center align-items-center">
                <Link to="/home"><img src="https://i.ibb.co/60VGHLd/Group-1329.png" className="logo" alt="Volunteer Network" /></Link>
                <div className="login-box-inside d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-info">Login</h3>
                    <input className="form-control" name="email" type="email" placeholder="Email address"/>
                    <input className="form-control" type="password" name="password" placeholder="Password"/>
                    <button><Link to="/events">Signin</Link></button>
                    <button onClick={handleLogin} className="login-btn d-flex justify-content-center align-items-center"><FontAwesomeIcon className="red" icon={faGoogle} />Continue with Google</button>
                    <p>Don't have an account? <Link to="/registration">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;