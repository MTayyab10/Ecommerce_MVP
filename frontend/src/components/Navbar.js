import React, {Fragment, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {logout} from "../actions/auth"
import {NavLink} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {add_item, get_item_total} from "../actions/cart"

import Alert from "./Alert";


const Navbar = ({logout, isAuthenticated, user, total_items}) => {

    const [redirect, setRedirect] = useState(false);

    const logoutHandler = () => {
        logout()
        setRedirect(true);
    };

    // if (redirect) {
    //     return <Navigate to={'/'} />
    // };

    // username to login users & guest to not login users
    const userName = () => {
        return (
            <Fragment>
                Hi, <strong>
                {
                    user && true && true ?
                        // user.first_name.toUpperCase()[0] + user.first_name.slice(1)
                        user.username.toUpperCase()[0] + user.username.slice(1)
                        : " Guest"
                }
            </strong>
            </Fragment>
        )
    };

    // login/authenticated links
    const authLinks = () => (
        <Fragment>

            <li className="nav-item">
                <NavLink className="nav-link position-relative"
                         to="/cart">
                    <i className="fas fa-shopping-cart fs-6 pt-2 pe-2 "/>
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                        {/*Show total items on the cart       */}
                        {total_items}
                        <span className="visually-hidden">
                            total items
                        </span>
                    </span>
                </NavLink>
            </li>

            {/*Logout*/}

            <li className="nav-item">
                <a className="nav-link" href="#"
                   onClick={() => logoutHandler()}>Logout</a>
            </li>
        </Fragment>
    );

    // Not login/authenticated links

    const guestLinks = () => (
        <Fragment>
            <li className="nav-item">

                <NavLink className="nav-link position-relative"
                         to="/cart">
                    <i className="fas fa-shopping-cart fs-6 pt-2 pe-2 "/>
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                              {total_items}
                        <span className="visually-hidden">
                            total items
                        </span>
                    </span>
                </NavLink>

            </li>

            <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                    Login
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                    Register
                </NavLink>
            </li>

        </Fragment>
    );

    const navbarLinks = () => (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">
                    E-Commerce
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse"
                     id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">

                            {/*<Link className={}*/}
                            {/*    // className="nav-link active"*/}
                            {/*      to='/'>Home</Link>*/}
                            <NavLink to={"/"} className="nav-link">
                                <i className="fas fa-home"/> Home
                            </NavLink>
                        </li>

                        {/*If user is login then Hi, username otherwise hi guest*/}

                        <li className="nav-item">
                            <NavLink to={"/user_profile"} className="nav-link" href="#">
                                {userName()}
                            </NavLink>
                        </li>

                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>

                </div>
            </div>
        </nav>
    )

    const renderNavbar = () => {

        if (redirect) {

            return (
                <Fragment>

                    {navbarLinks()}
                    {/*For showing msgs/alerts to user what is going on*/}

                    <Alert/>
                    <Link to='/'/>
                </Fragment>
            );

        } else {

            return (
                <Fragment>
                    {navbarLinks()}
                    <Alert/>
                </Fragment>
            );
        }
    };

    return (
        renderNavbar()
        // <Fragment>
        //     {renderNavbar()}
        // </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,

    // Get total items from the cart
    total_items: state.cart.total_items

});

export default connect(mapStateToProps, {
    logout,
})(Navbar);