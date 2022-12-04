import React, {Fragment, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {logout, delete_user, reset_email} from "../actions/auth";

const UserProfile = ({user, isAuthenticated, logout,
                         loading, reset_email, delete_user }) => {

    // Tried to delete user with djoser endpoint

    // const [formData, setFormData] = useState({
    //     current_password: ""
    // })
    //
    // const {current_password} = formData
    //
    // const onChange = e => setFormData({
    //     ...formData,
    //     [e.target.name]: e.target.value
    // })
    //
    // const navigate = useNavigate();
    //
    // const onSubmit = e => {
    //
    //     e.preventDefault();
    //     delete_user(current_password, navigate)
    //
    // }

    // user info

    const userProfile = () => {
        return (
            <div className="card mb-4">

                <h2 className="card-header text-center">
                    My Info
                </h2>

                <ul className="list-group">

                    {/*1. First name */}

                    <li className="list-group-item">
                        <strong>First Name: </strong>
                        {user &&
                        user !== null &&
                        user !== undefined ?
                            user.first_name : <Fragment></Fragment>
                        }
                    </li>

                    {/*2. Last name */}

                    <li className="list-group-item">
                        <strong>Last Name: </strong>
                        {user && true && true ?
                            user.last_name : <Fragment></Fragment>
                        }
                    </li>

                    {/*3. Email */}

                    <li className="list-group-item">
                        <strong>Email: </strong>
                        {/*{user.email}*/}
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                                user.email : <Fragment></Fragment>
                        }
                    </li>

                    {/* 4. Date joined*/}

                    <li className="list-group-item">
                        <strong>Date Joined: </strong>
                        {/*{user.email}*/}
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                                // user.date_joined
                                // user.email : <Fragment></Fragment>
                                user.date_joined.slice(0, 10) + " " + user.date_joined.slice(11, 16) :
                                <Fragment></Fragment>
                        }
                    </li>
                </ul>

            </div>
        );
    };

    // If user is not login, redirect to homepage
    if (!isAuthenticated) {
        return <Navigate to={'/'}/>
    }

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

                    <div className="modal-body">
                        <h3>Do you want to delete account?</h3>
                        <p>Note: This action can't be undone.</p>
                    </div>

                    <form
                        // onSubmit={e => onSubmit(e)}
                    >

                        {/*  Password */}

                        {/*<div className="offset-1 col-10">*/}

                        {/*    <label htmlFor="validatePassword" className="form-label">*/}
                        {/*        Password*/}
                        {/*    </label>*/}

                        {/*    <input type="password"*/}
                        {/*           className="form-control"*/}
                        {/*           id="validatePassword"*/}
                        {/*           name='current_password'*/}
                        {/*           value={current_password}*/}
                        {/*           onChange={e => onChange(e)}*/}
                        {/*           required*/}
                        {/*           />*/}

                        {/*</div>*/}

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
                                    <button onClick={() => delete_user()} type="submit"
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

    return (
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

                </div>

            </div>
        </div>
    );
};

const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.loading

});

export default connect(mapStateToProps, {
    logout,
    delete_user,
    reset_email
})(UserProfile);
