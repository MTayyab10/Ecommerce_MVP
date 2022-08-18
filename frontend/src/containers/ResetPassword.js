import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password} from '../actions/auth';

const ResetPassword = ({reset_password, loading}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email, navigate);
        setRequestSent(true);
    };

    // if (requestSent) {
    //     return <Navigate to='/reset-password/sent'/>
    // }


    return (
        <div className="container">
            <div className="row">

                <div className="offset-md-3 col-md-6 offset-1 col-10">

                    <div className="p-3 text-center">
                        <h3><strong>Forgot Password</strong></h3>
                        {/*<i className="lead">*/}
                        {/*    Enter your email address and send.*/}
                        {/*</i>*/}
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className='form-group'>

                            <label className="form-label" htmlFor="email">
                                Enter registered email
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
                            <div className="text-center mt-3">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (

                        <input type="submit" value="Rest Password"
                               className="btn btn-pill text-white btn-primary mt-3" />
                        )
                        }

                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading
})

export default connect(mapStateToProps, {reset_password})(ResetPassword);
