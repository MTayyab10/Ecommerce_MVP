import React from "react";
import {Link} from 'react-router-dom';
import {logout, setAlert} from "../actions/auth";
import {connect} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Alert} from "../components/Alert";
import { get_categories } from "../actions/categories";


const Home = ({logout, isAuthenticated}) => {

    const logout_user = () => {
        logout();
    };

    return (

        <>
            {/* For showing error */}
            <ToastContainer position={"top-center"} />

            <div className="container">
                <div className="text-center p-3">
                    <h1>Buy Now</h1>
                </div>

                <h3>Hello, Tayyab!</h3>
            </div>

        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, {logout})(Home);

// export default Home;
