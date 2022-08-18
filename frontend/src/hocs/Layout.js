import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, refresh } from '../actions/auth';


const Layout = ({ checkAuthenticated, load_user, refresh,
                    children }) => {

    useEffect(() => {

        checkAuthenticated();
        load_user();
        refresh();

    }, []);

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default connect(null, {
    checkAuthenticated,
    load_user,
    refresh
})(Layout);
