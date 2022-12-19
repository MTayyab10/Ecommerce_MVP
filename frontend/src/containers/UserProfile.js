import React, {Fragment, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {logout, delete_user, reset_email} from "../actions/auth";
import {CopyToClipboard} from "react-copy-to-clipboard";
import moment from 'moment'


const UserProfile = ({user, isAuthenticated, logout,
                         loading, reset_email, delete_user
                     }) => {

    // Delete user with djoser endpoint

    const [formData, setFormData] = useState({
        current_password: ""
    })

    const {current_password} = formData

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        delete_user(current_password, navigate)
    }

    // a simple feature for copying I'd

    const [copied, setCopied] = useState({
        value: '',
        copy: false
    })

    const userId = (
        user && true && true ?
            user.id : <Fragment></Fragment>
    )

    // user personal info

    const userProfile = () => {
        return (
            <div className="card mb-4">

                <h2 className="card-header text-center">
                    My Info
                </h2>

                <ul className="list-group">

                    {/*1. First name */}

                    {/*<li className="list-group-item">*/}
                    {/*    <strong>First Name: </strong>*/}
                    {/*    {user &&*/}
                    {/*    user !== null &&*/}
                    {/*    user !== undefined ?*/}
                    {/*        user.last_login : <Fragment></Fragment>*/}
                    {/*    }*/}
                    {/*</li>*/}

                    {/*2. Last name */}

                    {/*<li className="list-group-item">*/}
                    {/*    <strong>Last Name: </strong>*/}
                    {/*    {user && true && true ?*/}
                    {/*        user.last_name : <Fragment></Fragment>*/}
                    {/*    }*/}
                    {/*</li>*/}

                    <li className="list-group-item">
                        <strong className="me-2">
                            Name:
                        </strong>
                        <span>
                            {user && true && true ?
                                user.username : <Fragment></Fragment>
                            }
                        </span>
                    </li>


                    {/*3. Email */}

                    <li className="list-group-item">
                        <strong className="me-2">Email: </strong>
                        {/*{user.email}*/}
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                                user.email : <Fragment></Fragment>
                        }

                    </li>

                    {/*3. User Id */}

                    <li className="list-group-item">
                        <strong className="me-2">My Id: </strong>

                        <span>
                            {/*{user &&*/}
                            {/*user !== null &&*/}
                            {/*user !== undefined ?*/}
                            {/*    user.id : <Fragment></Fragment>*/}
                            {/*}*/}
                            {userId}

                            <CopyToClipboard text={userId}
                                             onCopy={() => setCopied({copy: true})}>

                                <button type="button" className="btn btn-link btn-sm"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="Copy to Clipboard"
                                    // style={styleForCopy}
                                >
                                    <i className="fa-regular fa-copy"></i>
                                </button>

                            </CopyToClipboard>

                            {copied.copy ?
                                <span style={{color: 'green'}}>
                                    <i className="fa-solid fa-circle-check"/> copied</span>
                                : null
                            }

                        </span>

                    </li>

                    {/* 4. Date joined*/}

                    <li className="list-group-item">
                        <strong className="me-2">Date Joined: </strong>
                        {/*{user.email}*/}
                        {
                            user && true && true ?
                                // by do this can add hours & mints too "MMMM Do, YYYY, h:mm"
                                moment(user.date_joined).format("MMMM Do, YYYY")

                                :
                                // user.date_joined.slice(0, 10) + " " + user.date_joined.slice(11, 16) :
                                <Fragment></Fragment>
                        }
                    </li>
                </ul>

            </div>
        );
    };

    // Delete Modal,

    const deleteModal = (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        {/*{#    <h4 class="modal-title" id="exampleModalLabel">Logout</h4>#}*/}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>

                    {/* show only when user is login */}

                    <div className="modal-body mb-0 pb-1">
                        <h4>Do you want to delete account?</h4>
                        <p className="small">
                            Note: This action can't be undone.
                        </p>
                    </div>

                    <form onSubmit={e => onSubmit(e)}>

                        {/*  Password */}

                        <div className="offset-1 col-10 mb-2 pb-2">

                            <label htmlFor="validatePassword" className="form-label">
                                Current Password
                            </label>

                            <input type="password"
                                   className="form-control"
                                   id="validatePassword"
                                   name='current_password'
                                   value={current_password}
                                   onChange={e => onChange(e)}
                                   required
                            />

                        </div>

                        <div className="modal-footer">

                            <button type="button" className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"> Cancel
                            </button>

                            {loading ?
                                (
                                    <button className="btn btn-danger" data-bs-dismiss="modal" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status"
                                              aria-hidden="true"/> Deleting...
                                    </button>
                                )
                                :
                                (
                                    <button
                                        // onClick={() => delete_user(current_password)}
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-danger">
                                        Yes, Delete
                                    </button>
                                )
                            }

                        </div>

                    </form>

                </div>
            </div>
        </div>
    )

    // If user is auth/login

    const authUser = (
        <div className="container mt-5">
            <div className="row">

                <div className="offset-md-2 col-md-8">

                    {userProfile()}

                    <Link to={'/reset-email'}
                        // onClick={() => reset_email()}
                          className="btn btn-primary m-2">
                        Change email
                    </Link>

                    <button onClick={() => logout()} className="btn btn-secondary m-2">
                        Logout
                    </button>

                    {deleteModal}

                    <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                            id="#deleteModal" className="btn btn-danger m-2">
                        Delete
                    </button>

                    {/*<form onSubmit={e => onSubmit(e)}>*/}

                    {/*    /!*  Password *!/*/}

                    {/*    <div className="offset-1 col-10">*/}

                    {/*        <label htmlFor="validatePassword" className="form-label">*/}
                    {/*            Current Password*/}
                    {/*        </label>*/}

                    {/*        <input type="password"*/}
                    {/*               className="form-control"*/}
                    {/*               id="validatePassword"*/}
                    {/*               name='current_password'*/}
                    {/*               value={current_password}*/}
                    {/*               onChange={e => onChange(e)}*/}
                    {/*               required*/}
                    {/*               />*/}

                    {/*    </div>*/}

                    {/*    <div className="modal-footer">*/}

                    {/*        <button type="button" className="btn btn-outline-secondary"*/}
                    {/*                data-bs-dismiss="modal"> Cancel*/}
                    {/*        </button>*/}

                    {/*        /!*{loading ?*!/*/}
                    {/*        /!*    (*!/*/}
                    {/*        /!*        <button className="btn btn-danger" data-bs-dismiss="modal" type="button" disabled>*!/*/}
                    {/*        /!*            <span className="spinner-border spinner-border-sm" role="status"*!/*/}
                    {/*        /!*                  aria-hidden="true"/> Deleting...*!/*/}
                    {/*        /!*        </button>*!/*/}
                    {/*        /!*    )*!/*/}
                    {/*        /!*    :*!/*/}
                    {/*        /!*    (*!/*/}
                    {/*                <button*/}
                    {/*                    // onClick={() => delete_user(current_password)}*/}
                    {/*                        type="submit"*/}
                    {/*                        // data-bs-dismiss="modal"*/}
                    {/*                        className="btn btn-danger">*/}
                    {/*                    Yes, Delete*/}
                    {/*                </button>*/}
                    {/*            /!*)*!/*/}
                    {/*        /!*}*!/*/}

                    {/*    </div>*/}

                    {/*</form>*/}

                </div>

            </div>
        </div>
    )

    // If user is not login/auth

    const noAuth = (
        <div className='container mt-5 d-flex flex-column align-items-center'>
            <h1 className='mt-5'>Please login first.</h1>
            <p className='lead p-1'>
                To get access this page info.
            </p>
            <Link to='/login' className='btn btn-primary btn-lg m-2'>
                Login
            </Link>
        </div>
    )

    return (
        <Fragment>
            {isAuthenticated ? authUser : noAuth}
        </Fragment>
    );
};

const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.loading

});

// Copy to clipboard
// https://www.npmjs.com/package/react-copy-to-clipboard

export default connect(mapStateToProps, {
    logout,
    delete_user,
    reset_email
})(UserProfile);
