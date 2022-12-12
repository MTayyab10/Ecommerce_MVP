import React, {Fragment} from "react";
import {connect} from "react-redux";
import Categories from "./products/Categories"
import DisplayProducts from "./products/DisplayProducts"


const Home = ({isAuthenticated}) => {

    return (

        <Fragment >

            <div className="bg-light">
                <div className="container">

                    <div className="text-center p-3">
                        <h1>Buy Now</h1>
                    </div>

                    <Categories/>

                    <DisplayProducts/>

                </div>
            </div>

        </Fragment>
    );
}

// How to get data from action to frontend
// https://github.com/MTayyab10/shop_time/blob/main/frontend/src/components/LandingPage.js

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, {})(Home);

// export default Home;
