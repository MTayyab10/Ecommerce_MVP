import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (

    <div className='container mt-5 d-flex flex-column align-items-center'>
        <h1 className='mt-5'>404 Not Found</h1>
        <p className='lead'>
            Requested link cannot be found on our site.
        </p>
        <Link to='/' className='btn btn-dark btn-lg mt-3'>
            Back to Site
        </Link>
    </div>
);

export default NotFound;