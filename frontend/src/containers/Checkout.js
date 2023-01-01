import React, {Fragment, useState, useEffect} from 'react';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

import {refresh} from '../actions/auth';
import {
    get_delivery_address,
    create_delivery_address,
    update_delivery_address,
    delete_delivery_address,
} from '../actions/delivery_address'

import {
    get_all_total_price,
    create_order, get_total_price
} from '../actions/orders';

import CheckoutItem from "../components/CheckoutItem";

import DeliveryAddressForm from "../components/DeliveryAddressForm"

const Checkout = ({
                      isAuthenticated,
                      user,
                      refresh,
                      items,
                      total_items,
                      create_order,
                      loading,
                      delivery_addresses,
                      get_total_price,
                      get_delivery_address,
                      create_delivery_address,
                      update_delivery_address,
                      delete_delivery_address,
                      sub_total,
                      delivery_fee,
                      service_fee,
                      total_amount
                  }) => {

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        mobile: '',
        addr_status: false
    });

    // for checked (addr_status) Boolean

    const [isChecked, setIsChecked] = useState(false);

    const checkOnChange = () => {
        setIsChecked(!isChecked);
    }

    const {id} = useParams();


    const [data, setData] = useState({
        instance: {}
    });

    const {name, address, city, mobile, addr_status} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = (e) => {
        e.preventDefault();
        // toast.success("You are login, Successfully.")
        create_delivery_address(name, address, city, mobile, isChecked) // instead of addr_status
         // create_order(full_name, address, city, mobile);
    };

     const [render, setRender] = useState(false);

    useEffect(() => {

        refresh();
        get_delivery_address();
        get_total_price();
        window.scrollTo(0, 0);

    }, [render]);


    // Show Product items in Order summary
    const showItems = () => {
        return (
            <Fragment>
                {items && true && true &&
                    items.length !== 0 &&
                    items.map((item, index) => {
                        let count = item.count;

                        return (
                            <Fragment key={index}>
                                <CheckoutItem
                                    item={item}
                                    count={count}
                                />
                            </Fragment>

                        );
                    })
                }
            </Fragment>
        );
    };


    // Display all delivery addresses
    const displayDeliveryAddress = () => {

        return (
            // <div className="col-md-6 offset-1 col-10">
            <Fragment>

                {delivery_addresses && true && true &&
                    delivery_addresses.map((addr) =>
                        <>
                            <div className={`${addr.addr_status && "border-secondary"}`}>

                                {addr.addr_status ?

                                    <>
                                        <h5 className="d-inline">
                                            {addr.name}
                                        </h5>

                                        <h5 className="d-inline ms-4">
                                            <span className="badge rounded-pill bg-success">
                                                <i className="fas fa-check-circle check{{ addr.id }}
                                             check act-btn{{ addr.id }} "> </i> Active </span>

                                        </h5>
                                    </>
                                    :
                                    <h5> {addr.name}</h5>
                                }

                                <h6 className="card-subtitle mt-1 mb-2 text-muted">
                                    {addr.mobile}
                                </h6>

                                <div className="card-text">
                                    {addr.city}, {addr.address}
                                </div>

                                <Link to={`/update_address/${addr.id}`}
                                      className="btn btn-secondary btn-sm mt-2
                                       text-decoration-none">
                                    Change
                                </Link>

                                <button onClick={(e) => delete_delivery_address(addr.id)}
                                        className="btn btn-danger btn-sm ms-2 mt-2
                                            text-decoration-none">
                                    Delete
                                </button>

                            </div>

                            <hr />

                        </>
                    )}
            </Fragment>
        )
    }


    // Delivery/Shipping Info
    const deliveryInfo = (
        <Fragment>

            <div className="col-md-6 col-12 pt-2">

                <div className="card shadow">
                    <div className="card-body">

                        {displayDeliveryAddress()}

                        <div className="col-12 ">

                            <div id="" className="">

                                <a href="#"
                                   className="text-decoration-none">

                                    <div className="text-center fw-bolder"
                                         name="inlineRadioOptions" id="inlineRadio1"
                                         value="option1"
                                         data-bs-toggle="collapse" href="#collapseDelivery"
                                         aria-expanded="false" aria-controls="collapseExample"
                                    >

                                        <i className="fas fa-plus-circle text-danger"/> Add
                                        delivery address
                                        {/*<i className="float-end fas fa-angle-right text-secondary">*/}
                                        {/*</i>*/}

                                    </div>
                                </a>

                            </div>

                            {/*  If click on above link then it will show below form */}

                            <div id="collapseDelivery" className="collapse pt-2">

                                {/* Create/Add deliver address */}

                                <DeliveryAddressForm
                                    user={user}
                                    name={name}
                                    address={address}
                                    city={city}
                                    mobile={mobile}
                                    addr_status={addr_status}
                                    isChecked={isChecked}
                                    checkOnChange={checkOnChange}
                                    onChange={onChange}
                                    onSubmit={onSubmit}
                                />

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )

    // After creating order redirect to desired page
    const navigate = useNavigate();

    // Loading & Place an Order btn
    const placeOrderBtn = (
        loading ?
            <button className="btn btn-success mt-2" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"/> Place an Order
            </button>
            :
            <button
                onClick={() => create_order(navigate)}
                type="button" className="btn btn-success mt-2">
                Place an Order
            </button>
    )

    // If user is auth, show order items, price etc

    const orderSummary = (<div className="col-md-6 col-12 pt-2">
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

            {/*<DeliveryAddressForm*/}
            {/*    user={user}*/}
            {/*    full_name={full_name}*/}
            {/*    address={address}*/}
            {/*    city={city}*/}
            {/*    mobile={mobile}*/}
            {/*    onChange={onChange}*/}
            {/*    onSubmit={onSubmit}*/}
            {/*/>*/}

            {showItems()}

            <div className="card-body">

                {/*  2 - subtotal  */}

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

                <hr className="pt-0 mt-0"/>

                {/*4 - All total charges*/}

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

                {placeOrderBtn}

            </div>

        </div>
    </div>)

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
        </div>
    )

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

    // delivery address
    delivery_addresses: state.delivery_address.delivery_addresses,

    // Get price info from reducers/orders.js
    sub_total: state.orders.sub_total,
    delivery_fee: state.orders.delivery_fee,
    service_fee: state.orders.service_fee,
    total_amount: state.orders.total_amount,

    loading: state.orders.loading

    // clientToken: state.payment.clientToken,
    // shipping_cost: state.payment.shipping_cost
});

export default connect(mapStateToProps, {

    refresh,
    get_delivery_address,
    create_delivery_address,
    update_delivery_address,
    delete_delivery_address,

    get_total_price,
    create_order,

    // get_shipping_options,
    // get_payment_total,
    // get_client_token,
    // process_payment
})(Checkout);
