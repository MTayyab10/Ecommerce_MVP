import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {Navigate} from "react-router-dom";

const UserInfo = ({user, isAuthenticated}) => {

    const userInfo = () => {
        return (
            <div className="card mb-4">
                <h3 className="card-header text-center">
                    User Info
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>First Name: </strong>
                        {user &&
                            user !== null &&
                            user !== undefined ?
                            user.first_name : <Fragment></Fragment>
                        }
                    </li>

                      <li className="list-group-item">
                        <strong>Last Name: </strong>
                        {user &&
                            user !== null &&
                            user !== undefined ?
                            user.last_name : <Fragment></Fragment>
                        }
                    </li>

                    <li className="list-group-item">
                        <strong>Email: </strong>
                        {
                            user &&
                            user !== null &&
                            user !== undefined ?
                            user.email : <Fragment></Fragment>
                        }
                    </li>
                </ul>

            </div>
        );
    };

    // If user is not login, do not show this page

    if (!isAuthenticated) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="container mt-5">
            <div className="row">

                <div className="offset-md-2 col-md-8">

                    {userInfo()}

                    <button className="btn btn-primary">
                        Change Info
                    </button>

                </div>

            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(UserInfo);
