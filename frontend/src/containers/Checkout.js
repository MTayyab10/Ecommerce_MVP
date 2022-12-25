import React, {Fragment, useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

import {refresh} from '../actions/auth';
import {get_total_price, create_order} from '../actions/orders';

import CheckoutItem from "../components/CheckoutItem";

import DeliveryAddressForm from "../components/DeliveryAddressForm"


const Checkout = ({
                      isAuthenticated, user, refresh,
                      items, total_items,
                      create_order, loading,
                      get_total_price, sub_total, delivery_fee,
                      service_fee, total_amount
                  }) => {

    const [formData, setFormData] = useState({
        full_name: '',
        address: '',
        city: '',
        mobile: ''
    });

    const [data, setData] = useState({
        instance: {}
    });

    const {full_name, address, city, mobile} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        // toast.success("You are login, Successfully.")
        create_order(full_name, address, city, mobile);
    };

    // useEffect(() => {
    //     if (
    //         user
    //     ) {
    //         setFormData({
    //             ...formData,
    //             full_name: user.username,
    //             address: '',
    //             city: '',
    //
    //         });
    //     }
    // }, [user]);


    useEffect(() => {
        window.scrollTo(0, 0);

        refresh();
        get_total_price();
        // create_order();

        // get_shipping_options();
    }, []);

    // Product items
    const showItems = () => {
        return (
            <Fragment>
                {/*<h4 className='text-muted mt-3'>*/}
                {/*    Your total {total_items} item(s)*/}
                {/*</h4>*/}
                {/*<hr/>*/}
                {
                    items && true && true &&
                    items.length !== 0 &&
                    items.map((item, index) => {
                        let count = item.count;

                        return (
                            <Fragment key={index}>
                                <CheckoutItem
                                    item={item}
                                    count={count}
                                    // showViewProduct={false}
                                    // showRemoveProduct={false}
                                    // showUpdateProduct={false}
                                    // showQuantity
                                />
                            </Fragment>

                        );
                    })
                }
            </Fragment>
        );
    };

    // Loading & Place an Order btn
    const placeOrderBtn = (
        loading ?
            <button className="btn btn-success " type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"/> Place an Order
            </button>
            :
            <div className="pt-2">
                <button onClick={() => create_order(full_name, address, city, mobile)} type='submit' className="btn btn-success">
                    Place an Order
                </button>
            </div>
    )


    // If user is auth then show the all info

    const orderSummary = (<div className="container mt-5 mb-5">
        <div className="row">

            <div className="col-md-6 col-12">
                <div className="card shadow">

                    <h5 className="card-header">
                        Order summary
                        <span className="float-end">
                                <Link className="btn btn-dark btn-sm"
                                      to="/cart">
                                    <i className="fa fa-chevron-left small"/> Cart
                                    {/*return to cart*/}
                                </Link>
                            </span>
                    </h5>

                    {showItems()}

                    <div className="card-body">

                        {/*/!* 2 - subtotal  *!/*/}

                        <div className="row pt-1 ">

                            <div className="col">
                                <h6 className="small">Sub-total</h6>
                            </div>

                            <div className="col">
                                <h6 className="small">
                                    Rs. {sub_total}
                                    {/*{{order.cart_total}}*/}
                                </h6>
                            </div>

                        </div>

                        {/* 3 - delivery charges  */}

                        <div className="row">

                            <div className="col">
                                <h6 className="small">Delivery fee</h6>
                            </div>

                            <div className="col">
                                <h6 className="small">
                                    Rs. {delivery_fee}
                                    {/*{{order.delivery_charges}}*/}
                                </h6>
                            </div>

                        </div>

                        {/* 4 - service charges  */}

                        <div className="row">

                            <div className="col">
                                <h6 className="small">Service fee</h6>
                            </div>

                            <div className="col">
                                <h6 className="small">
                                    Rs. {service_fee}
                                </h6>
                            </div>

                        </div>

                        {/*4 - All total charges*/}

                        <hr className="pt-0 mt-0"/>

                        <div className="row">

                            <div className="col">
                                <h6 className="fw-bolder text-danger">
                                    Total (Pkr)</h6>
                            </div>

                            <div className="col">
                                <h6 className="fw-bolder text-danger">
                                    Rs. {total_amount}
                                </h6>
                            </div>

                        </div>

                        {/*<DeliveryAddressForm*/}
                        {/*    user={user}*/}
                        {/*    full_name={full_name}*/}
                        {/*    address={address}*/}
                        {/*    city={city}*/}
                        {/*    mobile={mobile}*/}
                        {/*    // countries={countries}*/}
                        {/*    onChange={onChange}*/}
                        {/*    onSubmit={onSubmit}*/}
                        {/*/>*/}

                        {placeOrderBtn}

                    </div>

                </div>
            </div>
        </div>
    </div>)

    // If user is not login

    const noAuth = (
        <div className="mt-2 d-flex flex-column align-items-center">
            <h1 className="mt-5">Please login first.</h1>
            <p className="lead p-1">
                To get access this page info.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg m-2">
                Login
            </Link>
        </div>)

    // If not have a single item show this one

    const emptyCart = (
        <div className={"container pt-4"}>
            <div className="card shadow">
                <div className="card-header">
                    Empty
                </div>
                <div className="card-body">
                    {/*{#                    <h5 class="card-title">No Items</h5>#}*/}
                    <p className="card-text">
                        You do not have added any item yet.
                        Please, first add items.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Buy Items Now
                    </Link>
                </div>
            </div>
        </div>

    )

    // If user is not login, if not have more than 1 items
    // If both conditions false then render orderSummary (items)

    const allRender = () => {

        if (!isAuthenticated) {
            return (
                noAuth
            );

        } else if (total_items < 1) {
            return (
                emptyCart
            );

        } else {
            return (
                orderSummary
            )
        }

    }


    return (

        <Fragment>

            {isAuthenticated &&
                <div className="text-center pt-2 m-2">
                    <h2>Checkout</h2>
                    <i className="text-secondary">
                        <i className="fas fa-truck"></i> Deliver
                        at about {moment().add(30, 'minutes').format("HH:mm A")}
                        <span id="time"></span>
                    </i>
                </div>
            }

            {allRender()}

        </Fragment>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,

    items: state.cart.items,
    total_items: state.cart.total_items,
    // amount: state.cart.amount,

    // Get price info from reducers/orders.js
    sub_total: state.orders.sub_total,
    delivery_fee: state.orders.delivery_fee,
    service_fee: state.orders.service_fee,
    total_amount: state.orders.total_amount,

    loading: state.orders.loading

    // coupon: state.coupons.coupon,
    // shipping: state.shipping.shipping,
    // clientToken: state.payment.clientToken,
    // estimated_tax: state.payment.estimated_tax,
    // shipping_cost: state.payment.shipping_cost
});

export default connect(mapStateToProps, {

    refresh,
    get_total_price,
    create_order,

    // get_shipping_options,
    // get_payment_total,
    // get_client_token,
    // process_payment
})(Checkout);
