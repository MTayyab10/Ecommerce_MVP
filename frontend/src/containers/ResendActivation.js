import React, {Fragment, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {resend_verify} from '../actions/auth';

const ResendActivation = ({resend_verify, loading}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        resend_verify(email, navigate);
        setRequestSent(true);
    };

    // if (requestSent) {
    //     return <Navigate to='/activate/sent'/>
    // }

    return (
        <div className="container">
            <div className="row">

                <div className="offset-md-3 col-md-6 offset-1 col-10">

                    <div className="p-3 text-center">
                        <h2>Resend Activation</h2>
                        {/*<i className="lead">*/}
                        {/*    Enter your email address and send.*/}
                        {/*</i>*/}
                    </div>

                    <form onSubmit={e => onSubmit(e)} className={'p-2'}>

                        <div className='form-group '>

                            <label className="form-label" htmlFor="email">
                                Enter registered email:
                            </label>

                            <input
                                className='form-control'
                                type='email'
                                placeholder='example@gmail.com'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>

                        {loading ? (

                            <Fragment>

                                <button className="btn btn-primary mt-3" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"/> Loading...
                                </button>

                                {/*<div className="text-center mt-3">*/}
                                {/*    <div className="spinner-border" role="status">*/}
                                {/*        <span className="visually-hidden">Loading...</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </Fragment>

                        ) : (
                            <input type="submit" value="Resend Link"
                                   className="btn btn-pill text-white btn-primary mt-3"/>
                          )
                        }
                        {/*<button className='btn btn-primary' type='submit'>Reset Password</button>*/}
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading
})

export default connect(mapStateToProps, {resend_verify})(ResendActivation);
