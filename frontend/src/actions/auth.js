import axios from 'axios';
import {setAlert} from './alert';
import {Navigate} from "react-router-dom";

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESEND_ACTIVATION_SUCCESS,
    RESEND_ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,

    REFRESH_SUCCESS,
    REFRESH_FAIL,

    LOGOUT,
} from "./types";
import React from "react";

// Note: Add Redux DevTool to check the data

// To check weather user is login or not
export const checkAuthenticated = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
                console.log("Auth Success ", res.status, res.statusText)

            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
                // console.log(res.data.code)

            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
            console.log("Auth Fail ", err)
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
        // console.log("Error is here too")
    }
};

// function for getting user data

export const load_user = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
            console.log(err)
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

// User registration/signup
export const signup = (first_name, last_name, email, password, re_password, navigate) => async dispatch => {

    // for show loading
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        // first_name, last_name,
        first_name, last_name, email, password, re_password
    });

    // if (password !== reset_password) {
    //
    //      dispatch({
    //         type: REMOVE_AUTH_LOADING
    //     });
    //
    //     return dispatch(setAlert("Your passwords didn't matched, Try again.",
    //         "error"))
    // }

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert("Your account has been created.",
            "success"))

        // For removing loading

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        if (res.status === 201) {
            // return <Navigate to='/activate/sent'/>;
            return navigate('/activate/sent', {replace: true})
        }

        // toast.success("User Signup Success");
        console.log("Signup Success ", res.data)

    } catch (err) {

        dispatch({
            type: SIGNUP_FAIL,
        })

        dispatch(setAlert("Username/Email is already taken." +
            " Try another.", "error"))

        console.log("Signup Error ", err.response)

        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }

};

// For activate/verify account
export const verify = (uid, token, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });

        dispatch(
            setAlert("Your account is activated, Please login.",
            "info")
        )

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/login", {replace: true})
        }

        console.log("User is activated",)

    } catch (err) {

        dispatch({
            type: ACTIVATION_FAIL
        })

        dispatch(setAlert("Activation fails, Try again.", "error"))

         dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log(err.response.data)
        console.log("Activation fail error", err)
    }
};

// reset verification account
export const resend_verify = (email, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`, body, config)

        dispatch({
            type: RESEND_ACTIVATION_SUCCESS
        })

        dispatch(setAlert("Resend Activation Success", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

         if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate('/activate/sent', {replace: true})
        }

        console.log("Resend Activation Success", res.status);

    } catch (err) {

        dispatch({
            type: RESEND_ACTIVATION_FAIL,
        })

        dispatch(setAlert("Resent activation fail, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log(err.response.data)
        console.log("Error for Resend Activation", err)
    }
}

// signin
export const login = (email, password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(setAlert("You are login to MyShop", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Login Success", res.data)
        dispatch(load_user())

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        })

        dispatch(setAlert("Invalid Email/Password, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        //     {position: "top-center"})
        // console.log("Invalid Email or Password, Try again.");
        console.log(err.response.data)
    }
};

// user can reset password
export const reset_password = (email, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });

        dispatch(setAlert("Reset Password Email Sent", "info"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/reset-password/sent", {replace: true})
        }

         console.log("Reset Password Success");

    } catch (err) {

        dispatch({
            type: PASSWORD_RESET_FAIL,
        });

        dispatch(setAlert("Reset Password Fail", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        // console.log(err.response.data.detail)
        console.log("Error for Rest Password", err)
    }
};

// user can set new password
export const reset_password_confirm = (uid, token, new_password,
                                       re_new_password, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });

        dispatch(setAlert("Your Password has been reset.", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Status code is: ", res.status)
          if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/login", {replace: true})
        }
        console.log("Password has been reset.")

    } catch (err) {

        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });

        dispatch(setAlert("Rest Password Fail.", 'error'))

         dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log(err.response.data.detail)
        console.log("Reset Password Fail", err)
    }
};

// signup & signin with Google
export const googleAuthenticate = (state, code, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

            if (res.status === 201) {

                dispatch({
                    type: GOOGLE_AUTH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());

                dispatch({
                    type: REMOVE_AUTH_LOADING
                });

                dispatch(setAlert("Logged in successfully", "success"));

                return navigate("/", {replace: true})

            } else {

                dispatch({
                    type: GOOGLE_AUTH_FAIL
                });

                dispatch({
                    type: REMOVE_AUTH_LOADING
                });

                dispatch(setAlert("Error: Unable to login", "error"));
                console.log("Error while login")
            }

        } catch (err) {

            dispatch({
                type: GOOGLE_AUTH_FAIL
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            })

            dispatch(setAlert("Unable to login, Try again.", "error"))
            console.log("unable to login")
        }
    }
};

// signup & signin with Facebook
export const facebookAuthenticate = (state, code, navigate) => async dispatch => {

    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());

            dispatch(setAlert("Logged in Successfully", "success"))

            return navigate("/", {replace: true})

        } catch (err) {

            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });

            dispatch(setAlert("Unable to login, Try again.", "error"))

        }
    }
};

// refresh token

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
};

export const logout = () => dispatch => {

    dispatch({
        type: LOGOUT
    });

    dispatch(setAlert("You are logout, Successfully", "info"))

    // toast.success("You are logout Successfully.",
    //     {position: "top-center"})
};