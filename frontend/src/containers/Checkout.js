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
                <button onClick={() => create_order(full_name, address, city, mobile)} type='submit'
                        className="btn btn-success">
                    Place an Order
                </button>
            </div>
    )

    // ('.form-check-input').click(function () {
    //     ('.collapse').collapse('hide');
    //     ('#' + (this).attr('aria-controls')).collapse('show');
    // });

    // Delivery/Shipping Info
    const deliveryInfo = (
        <div className="col-md-6 col-12 ">
            <div className="card shadow">
                {/*{#            <h5 class="card-header">Featured</h5>#}*/}
                <div className="card-body">

                     {/*<form action="" method="post">*/}

                    {/*    <div className="col-12 ">*/}

                             {/*<div className="d-inline-block pe-2">*/}
                            {/*    <h5>Please choose: </h5>*/}
                             {/*</div>*/}

                             {/* If click on Delivery, show Delivery form */}

                    {/*        /!*<div className="form-check form-check-inline">*!/*/}

                             {/*    <input className="form-check-input" type="radio"*/}
                             {/*           name="inlineRadioOptions" id="inlineRadio1"*/}
                             {/*           value="option1"*/}
                             {/*           data-bs-toggle="collapse" href="#collapseDelivery"*/}
                             {/*           aria-expanded="false" aria-controls="collapseExample"/>*/}

                    {/*        /!*    <label className="form-check-label" title="deliver your order to your doorstep."*!/*/}
                    {/*        /!*           for="inlineRadio1">*!/*/}
                    {/*        /!*        Delivery*!/*/}
                             {/*    </label>*/}

                    {/*        /!*</div>*!/*/}

                           {/*// <!-- If click on PickUp, show PickUp  -->*/}

                    {/*        /!*<div className="form-check form-check-inline">*!/*/}

                    {/*        /!*    <input className="form-check-input" type="radio"*!/*/}
                    {/*        /!*           name="inlineRadioOptions" id="inlineRadio2"*!/*/}
                           {/*           value="option2"*/}
                             {/*           data-bs-toggle="collapse" href="#collapsePickup"*/}
                            {/*           aria-expanded="false" aria-controls="collapseExample"/>*/}

                    {/*        /!*    <label className="form-check-label" for="inlineRadio2">Pickup</label>*!/*/}
                    {/*        /!*</div>*!/*/}

                    {/*    </div>*/}

                    {/*</form>*/}

                    <div id="" className="">

                        {/*// <!-- Pickup or Delivery Option -->*/}
                        {/*<hr/>*/}

                        {/*{% if shipping_info.count >= 1 %}*/}

                        {/*<h5 className="card-title pb-2">Delivery Info</h5>*/}

                        {/*{% endif %}*/}

                        {/*// <!-- if user have address before then show addr*/}
                        {/*//  otherwise show add address link -->*/}

                        <a href="{% url 'delivery_address5:add_address' %}"
                           className="text-decoration-none">

                            <div className="text-center fw-bolder">

                                <i className="fas fa-plus-circle text-danger"></i> Add shipping address
                                <i className="float-end fas fa-angle-right text-secondary">
                                </i>

                            </div>
                        </a>

                    </div>

                </div>
            </div>
        </div>
    )

    // If user is auth then show the all info

    const orderSummary = (
        <div className="col-md-6 col-12 pt-2">
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

                    {/* 3 - delivery fee  */}

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

                    {/* 4 - service fee  */}

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
    )

    // If user is not login

    const noAuth = (<div className="mt-2 d-flex flex-column align-items-center">
            <h1 className="mt-5">Please login first.</h1>
            <p className="lead p-1">
                To get access this page info.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg m-2">
                Login
            </Link>
        </div>)

    // If not have a single item show this one

    const emptyCart = (<div className={"container pt-4"}>
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
        </div>)

    // If user is not login, if not have more than 1 items
    // If both conditions false then render orderSummary (items)

    const renderAllData = () => {

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

            <div className={"container"}>
                <div className={"row pt-3"}>

                    {isAuthenticated &&
                        total_items >= 1 &&
                        deliveryInfo
                    }

                    {renderAllData()}

                </div>
            </div>


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
