import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {facebookAuthenticate} from '../actions/auth';
import queryString from 'query-string';

const Facebook = ({facebookAuthenticate}) => {
    let location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            facebookAuthenticate(state, code, navigate);
        }
    }, [location]);

    return (

        <>
            <div className='mt-5 d-flex justify-content-center align-items-center'>
                <div className="text-center">
                    <div style={{"height": "3rem", "width": "3rem"}}
                         className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

            </div>

            <br/>

            <div className={"mt-2 text-center"}>
                <h2>Please wait...</h2>
            </div>

        </>
    );
};

export default connect(null, {facebookAuthenticate})(Facebook);
