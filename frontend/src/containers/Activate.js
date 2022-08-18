import React, {useState} from 'react';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {verify} from '../actions/auth';

const Activate = ({verify, loading}) => {

    const [verified, setVerified] = useState(false);

    let match = useMatch('/activate/:uid/:token');

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
            <div
                className='text-center'>

                <h2 className={"p-2 m-4"}>Verify your Account:</h2>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={verify_account}
                        type='button'
                        className='btn btn-primary'
                    >
                        Verify
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
