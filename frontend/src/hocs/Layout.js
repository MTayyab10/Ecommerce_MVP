import React, { useEffect, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, refresh } from '../actions/auth';
import OfferNoticeMsg from "../components/OfferNoticeMsg";


const Layout = ({ checkAuthenticated, load_user, refresh,
                    children }) => {

    useEffect(() => {

        checkAuthenticated();
        load_user();
        refresh();

    }, []);

    return (
        <Fragment>

            {/* For offer, notice */}
            <OfferNoticeMsg />

            <Navbar />
            {children}
        </Fragment>
    );
};

export default connect(null, {
    checkAuthenticated,
    load_user,
    refresh
})(Layout);
