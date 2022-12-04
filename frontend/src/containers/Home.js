import React, {Fragment} from "react";
import {logout, setAlert} from "../actions/auth";
import {connect} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import {Alert} from "../components/Alert";
// import { get_categories } from "../actions/categories";


const Home = ({logout, isAuthenticated}) => {

    // const logout_user = () => {
    //     logout();
    // };

    return (

        <Fragment>

            <div className="container">
                <div className="text-center p-3">
                    <h1>Buy Now</h1>
                </div>

                <h2>Hello Tayyab!</h2>
            </div>

        </Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, {})(Home);

// export default Home;
