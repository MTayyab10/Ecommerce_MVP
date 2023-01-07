import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {get_orders} from "../../actions/orders";
import {Link} from "react-router-dom";
import facebookImg from "../accounts/Continue with Fb Btn.PNG"
import moment from "moment/moment";
import OrderAndOrderItem from "../../components/OrderAndOrderItem"
import FilterOrdersButtons from "./FilterOrdersButtons"


const DisplayOrders = ({isAuthenticated, get_orders, orders, order_items}) => {

     // Filter orders
     // This states doesn't work correctly below one is ok
     // const [order, setOrder] = useState(orders);

     const [order=orders, setOrder] = useState();

    // fetch orders from actions/orders.js
    useEffect(() => {
        get_orders();
        window.scrollTo(0, 0);

    }, [])

    // Filter orders by status

    // const [order, setOrder] = useState(orders);

    // spread operator will display all the values from Order
    // while Set will only allow the single value
    // Display Order status in FilterOrderButtons.js

    const orderWithStatus = [...new Set(orders && true && true &&
        orders.map((order) => order.status))];

    // filter orders with status
    const filterOrders = (status) => {
        const newOrder = orders.filter((order) => {
            return order.status === status;
        });
        setOrder(newOrder);
    };


    // Render all Order & OrderItem
    const ordersAndOrderItem = () => {
        return (
            <OrderAndOrderItem
                order={order}
                order_items={order_items}
            />
        )
    }

    // Filter orders by status btn
    const filterOrderByStatus = () => {
        return (
            <FilterOrdersButtons
                orders={orders}
                orderWithStatus={orderWithStatus}
                filterOrders={filterOrders}
                setOrder={setOrder}

            />
        )
    }

     const noAuth = (
        <div className='container mt-5 d-flex flex-column align-items-center'>
            <h1 className='mt-5'>Please login first.</h1>
            <p className='lead p-1'>
                To get access this page info.
            </p>

            <Link to='/login' className='btn btn-primary btn-lg m-2'>
                Login
            </Link>
        </div>
    )


    return (

        <div className={"container"}>

            {isAuthenticated && <h2 className="text-center m-2 p-2">
                My Orders {orders && true && true
                && orders.length}
            </h2>}

            {isAuthenticated &&
                orders && true && true &&
                orders.length == 0 &&
                <h3 className={"text-center p-4 m-4"}>You don't have orders.</h3> }

            {isAuthenticated &&
                orders && true && true &&
                orders.length !== 0 && filterOrderByStatus()}

            {isAuthenticated ? ordersAndOrderItem() : noAuth}


        </div>

    )
}


const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,

    // get all orders
    orders: state.orders.orders,
    order_items: state.orders.order_items,

})

export default connect(mapStateToProps, {
    get_orders
})(DisplayOrders)