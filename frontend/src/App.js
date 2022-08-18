import React from 'react';
import {Routes, Route} from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Facebook from './containers/Facebook';
import Google from './containers/Google';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';
import ResetPasswordMsg from "./containers/ResetPasswordMsg";
import ActivateMsg from "./containers/ActivateMsg";
import ResendActivation from "./containers/ResendActivation";
import UserInfo from "./containers/UserInfo";
import NotFound from './containers/NotFound';

const App = () => (

    <Provider store={store}>
        {/*<Router>*/}
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />

                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/signup' element={<Signup />} />

                    <Route exact path='/google' element={<Google />} />
                    <Route exact path='/facebook' element={<Facebook />} />

                    <Route exact path='/user_info' element={<UserInfo/>}/>

                    <Route exact path='/reset-password' element={<ResetPassword />} />
                    <Route exact path='/reset-password/sent' element={<ResetPasswordMsg /> } />
                    <Route exact path='/password/reset/confirm/:uid/:token'
                           element={<ResetPasswordConfirm />} />

                    <Route exact path='/activate/:uid/:token' element={<Activate />} />
                    <Route exact path='/activate/sent' element={<ActivateMsg />} />
                    <Route exact path={'/resend/activation'} element={<ResendActivation /> } />

                    <Route path="*" element={<NotFound />}/>

                </Routes>
            </Layout>
        {/*</Router>*/}
    </Provider>
);

export default App;
