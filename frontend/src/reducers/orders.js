import {
    SET_CREATE_ORDER_LOADING,
    REMOVE_CREATE_ORDER_LOADING,

    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL,

    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL,

} from '../actions/types';

const initialState = {

    // Get total price
    sub_total: 0.0,
    delivery_fee: 0.0,
    service_fee: 0.0,
    total_amount: 0.0,

    // For loading while creating order
    loading: false,

    // Get orders & Order detail
    orders: null,
    order: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_TOTAL_PRICE_SUCCESS:
            return {
                ...state,
                sub_total: payload.sub_total,
                delivery_fee: payload.delivery_fee,
                service_fee: payload.service_fee,
                total_amount: payload.total_amount,
            }

        case GET_TOTAL_PRICE_FAIL:
            return {
                ...state,
                sub_total: 0.00,
                delivery_fee: 0.00,
                service_fee: 0.00,
                total_amount: 0.00,
            }

        case SET_CREATE_ORDER_LOADING:
            return {
                ...state,
                loading: true
            }

        case REMOVE_CREATE_ORDER_LOADING:
            return {
                ...state,
                loading: false
            }

        // case CREATE_ORDER_SUCCESS:
        //     return {
        //         ...state,
        //         orders: payload.orders
        //     }

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.orders
            }

        case GET_ORDERS_FAIL:
            return {
                ...state,
                orders: []
            }

        case GET_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                order: payload.order
            }

        case GET_ORDER_DETAIL_FAIL:
            return {
                ...state,
                order: {}
            }

        default:
            return state;
    }
};