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
import {get_item_total} from "./cart";


// Get total price of Order
export const get_total_price = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/get-total-price`, config);

        if (res.status === 200 && !res.data.error) {

            dispatch({
                type: GET_TOTAL_PRICE_SUCCESS,
                payload: res.data
            });

        } else {
            dispatch({
                type: GET_TOTAL_PRICE_FAIL
            });
        }

    } catch(err) {

        dispatch({
            type: GET_TOTAL_PRICE_FAIL
        });
    }
};

// Create Order & OrderItem
export const create_order = (full_name, address, city, mobile) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({full_name, address, city, mobile});

    dispatch({
        type: SET_CREATE_ORDER_LOADING
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/create-order`, body, config);

        if (res.status === 200 && res.data.success) {

            dispatch({
                type: CREATE_ORDER_SUCCESS
            });

            dispatch(setAlert('Your Order has been created, Successfully.', 'success'));
            dispatch(get_item_total());

        } else {
            dispatch({
                type: CREATE_ORDER_FAIL
            });
            dispatch(setAlert("Unable to create order, Try again.", "error"));
        }

    } catch(err) {

        dispatch({
            type: CREATE_ORDER_FAIL
        });
        dispatch(setAlert("Unable to create order, Try again.", "error"));
    }

    dispatch({
        type: REMOVE_CREATE_ORDER_LOADING
    });

    window.scrollTo(0, 0);
};


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
        } catch(err) {
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

        } catch(err) {
            dispatch({
                type: GET_ORDER_DETAIL_FAIL
            });
        }
    }
};
