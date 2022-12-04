import React, {Fragment, useState} from 'react';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {verify} from '../actions/auth';

const Activate = ({verify, loading}) => {

    const [verified, setVerified] = useState(false);

    let match = useMatch('activate/:uid/:token');

    let navigate = useNavigate()

    const verify_account = e => {

        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token, navigate);
        setVerified(true);
    };

    // if (verified) {
    //     // alert("Your account has been activated.")
    //     return <Navigate to='/login' />
    // }

    return (

        <div className='container'>
            <div className='text-center'>

                <div className="mt-4 pt-4">
                    <h2 className={"p-2 m-2"}>
                        Verify your Account:
                    </h2>
                    <p className="text-secondary">
                        <i> click below link to active </i>
                    </p>
                </div>


                {loading ? (

                    <Fragment>

                        <button className="btn btn-primary p-2 mt-2" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"/> Activate...
                        </button>

                        {/*  <div className="text-center">*/}
                        {/*  <div className="spinner-border" role="status">*/}
                        {/*  <span className="visually-hidden">Loading...</span>*/}
                        {/* </div>*/}
                        {/* </div>*/}

                    </Fragment>
                ) : (
                    <button
                        onClick={verify_account}
                        type='button'
                        className='btn btn-primary p-2 mt-2'
                    >
                        Activate
                    </button>
                )}

            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading
})


export default connect(mapStateToProps, {verify})(Activate);
