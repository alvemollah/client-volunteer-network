import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ height: '100vh' }} className="d-flex justify-content-center flex-column align-items-center text-danger">
            <h1 style={{ fontSize: '5rem' }}>404</h1>
            <button className="btn btn-primary"><Link to="/home">Go Back</Link></button>
        </div>
    );
};

export default NotFound;