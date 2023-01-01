import axios from 'axios';
import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL,
    SET_CREATE_ORDER_LOADING,
    REMOVE_CREATE_ORDER_LOADING,
} from './types';

import {setAlert} from "./alert";
import {get_item_total, get_items} from "./cart";
import {Navigate} from "react-router-dom";


// Get total price of Order
export const get_total_price = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/create-order`, config);

        if (res.status === 200 && !res.data.error) {

            dispatch({
                type: GET_TOTAL_PRICE_SUCCESS,
                payload: res.data
            });

            console.log("Total price data: ", res.data)

        } else {
            dispatch({
                type: GET_TOTAL_PRICE_FAIL
            });
            dispatch(setAlert(res.data.error, "error"))
            console.log("Total price got fail")
        }

    } catch (err) {

        dispatch({
            type: GET_TOTAL_PRICE_FAIL
        });
    }
};


// Create Order & OrderItem
export const create_order = (navigate) => async dispatch => {

    dispatch ({
        type: SET_CREATE_ORDER_LOADING
    });

    if (localStorage.getItem("access")) {

         const config = {
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}`,

            },
        };
         console.log('JWT Token', `${localStorage.getItem("access")}`,)

        // const body = JSON.stringify({full_name, address, city, mobile});

        try {
             // as I do not have any data so just add empty {}
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/create-order`,{}, config);

            if (res.status === 200 && res.data.success) {

                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: res.data
                });

                dispatch({
                    type: REMOVE_CREATE_ORDER_LOADING
                });

                dispatch(setAlert('Your Order has been created, Successfully.', 'success'));
                // return <Navigate to='/activate/sent'/>;
                return navigate("/", {replace: true})

            } else {
                dispatch({
                    type: CREATE_ORDER_FAIL
                });
                dispatch(setAlert(res.data.error, "error"))
                // dispatch(setAlert("Unable to create order, Try again.", "error"));
            }

        } catch (err) {

            dispatch({
                type: CREATE_ORDER_FAIL
            });
            console.log("Create order err at catch: ", err)
            dispatch(setAlert(err.response.data.error, 'error'))
            // dispatch(setAlert("Unable to create order, Try again.", "error"));
        }

        dispatch({
            type: REMOVE_CREATE_ORDER_LOADING
        });

        window.scrollTo(0, 0);

    } else {

        dispatch({
            type: CREATE_ORDER_FAIL
        });
        dispatch(setAlert("Unable to create order, Try again.", "error"));

    }
};

// export const create_order = (full_name, address, city, mobile) => async dispatch => {
//
//     dispatch ({
//         type: SET_CREATE_ORDER_LOADING
//     });
//
//     const config = {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `JWT ${localStorage.getItem('access')}`
//         }
//     };
//
//     const body = JSON.stringify({full_name, address, city, mobile});
//
//
//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/create-order`, body, config);
//
//         if (res.status === 200 && res.data.success) {
//
//             dispatch({
//                 type: CREATE_ORDER_SUCCESS
//             });
//
//             dispatch(setAlert('Your Order has been created, Successfully.', 'success'));
//             dispatch(get_item_total());
//
//         } else {
//             dispatch({
//                 type: CREATE_ORDER_FAIL
//             });
//             dispatch(setAlert(res.data.error, "error"))
//             // dispatch(setAlert("Unable to create order, Try again.", "error"));
//         }
//
//     } catch (err) {
//
//         dispatch({
//             type: CREATE_ORDER_FAIL
//         });
//         console.log("Create order err: ", err)
//         // dispatch(setAlert(err.data, 'error'))
//         dispatch(setAlert("Unable to create order, Try again.", "error"));
//     }
//
//     dispatch({
//         type: REMOVE_CREATE_ORDER_LOADING
//     });
//
//     window.scrollTo(0, 0);
// };


// Get all orders
export const list_orders = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/get-orders`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDERS_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_ORDERS_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: GET_ORDERS_FAIL
            });
        }
    }
};

// Get one specific order detail
export const get_order_detail = transactionId => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/get-order/${transactionId}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDER_DETAIL_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_ORDER_DETAIL_FAIL
                });
            }

        } catch (err) {
            dispatch({
                type: GET_ORDER_DETAIL_FAIL
            });
        }
    }
};
