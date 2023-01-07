import React, {Fragment, useState, useEffect} from "react";
import {connect} from "react-redux";
import {get_specific_order} from "../../actions/orders";
import {Link, useParams} from "react-router-dom";
import facebookImg from "../accounts/Continue with Fb Btn.PNG"
import CheckoutItem from "../../components/CheckoutItem";
import moment from "moment";
import {CopyToClipboard} from "react-copy-to-clipboard";
import SpecificOrderAndOrderItem from "../../components/SpecificOrderAndOrderItem"

const SpecificOrderDetail = ({
                                 specific_order, specific_order_items,
                                 get_specific_order
                             }) => {

    // get order id
    const {id} = useParams();

    // fetch orders from actions/orders.js

    useEffect(() => {

        get_specific_order(id);
        window.scrollTo(0, 0);

    }, [id])

    // a simple feature for copying Order unique I'd

    const [copied, setCopied] = useState({
        value: '',
        copy: false
    })

    // Order delivery address
    const deliveryOrderInfo = () => {

        return (
            <Fragment>

                {specific_order && true && true &&
                    specific_order.address != null &&
                    <div className={"offset-md-2 col-md-8 " +
                        "col-12 mt-2 mb-2"}>

                        <ul className="list-inline">

                            <li className="list-inline-item">
                                <i className="fas fa-map-marker-alt
                                     text-secondary"/> {specific_order.address.name}

                            </li>
                            <li className="list-inline-item">
                                {specific_order.address.mobile}
                            </li>
                            <li className="list-inline-item">
                                {specific_order.address.city} {specific_order.address.address}
                            </li>

                        </ul>

                        {/* If order status is not completed */}

                        {specific_order && true && true &&
                            specific_order.status != "delivered" &&

                            <Link to={`/update_address/${specific_order.address.id}`}
                                  className="mb-2 mt-0 pt-0 text-decoration-none">
                                Change address
                            </Link>
                        }

                    </div>
                }
            </Fragment>
        )
    }


    // Order items & price breakdown
    const renderOrderItemsAndPrice = () => (<div className="offset-md-2 col-md-8 col-12 pt-3">
        <div className="card shadow">

            <h5 className="card-header">
                {specific_order && true && true &&
                    specific_order.status} (show status)
                <span className="float-end">
                    <Link className="btn btn-dark btn-sm"
                          to="/my_orders">
                        <i className="fa fa-chevron-left small"/> back to orders
                        {/*return to cart*/}
                    </Link>
                </span>
            </h5>

            {/* Order items & price breakdown*/}

            <SpecificOrderAndOrderItem
                specific_order={specific_order}
                specific_order_items={specific_order_items}
            />

        </div>
    </div>)


    const showStatus = (status) => {
        if (status === 'not_processed') {
            return 'Not Processed';
        }
        else if (status === 'processed') {
            return 'Processed';
        }
        else if (status === 'shipping') {
            return 'Shipping';
        }
        else if (status === 'delivered') {
            return 'Delivered';
        }
        else if (status === 'cancelled') {
            return 'Cancelled';
        }
    };

    // Info like Order unique I'd, created date etc
    const moreOrderInfo = (

        <div className="offset-md-2 col-md-8 col-12 pt-2">
            <div className="card shadow">
                <div className="card-body">

                    {/* 1 - Order id  */}

                    <div className="row ">

                        <div className="col">
                            <h6 className="small">Order Id</h6>
                        </div>

                        <div className="col">
                            <h6 className="small text-uppercase">

                                {specific_order && true && true &&
                                    specific_order.unique_id}

                                <CopyToClipboard
                                    text={specific_order && true && true &&
                                        specific_order.unique_id.toUpperCase()}
                                    onCopy={() => setCopied({copy: true})}>

                                    <button type="button"
                                            className="btn btn-link btn-sm ms-1 m-0 p-0"
                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Copy to Clipboard"
                                        // style={styleForCopy}
                                    >
                                        <i className="fa-regular fa-copy pb-0"></i>
                                    </button>

                                </CopyToClipboard>

                                {copied.copy ?
                                    <span style={{color: 'green'}}
                                          className={"text-capitalize"}>
                                      <i className="fa-solid fa-circle-check ms-1"/> copied</span>
                                    : null
                                }

                            </h6>
                        </div>

                    </div>

                    {/* 2 - order date  */}

                    <div className="row">

                        <div className="col">
                            <h6 className="small">Order date</h6>
                        </div>

                        <div className="col">
                            <h6 className="small">

                                {moment(specific_order && true && true &&
                                    specific_order.created_date).format("MMMM Do, YYYY, h:mm a")}

                                {/* below line will display time like 8 hours age */}
                                {/*{moment(specific_order.created_date).fromNow()}*/}
                            </h6>
                        </div>

                    </div>

                    {/* 3 - Order status  */}

                    <div className="row">

                        <div className="col">
                            <h6 className="small">Order status</h6>
                        </div>

                        <div className="col">
                            <h6 className="small text-capitalize">
                                {specific_order && true && true &&
                                    showStatus(specific_order.status)}
                            </h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )


    return (
        <Fragment>

            <div className="text-center p-3">
                <h2> Order detail </h2>
                {/* add 30-32 minutes after created order */}
                <p className={"text-success"}>
                    Delivery about at
                    <b> {moment(specific_order && true && true &&
                        specific_order.created_date).add(30, 'minutes').format("HH:mm A")}
                    </b>
                </p>
            </div>

            <div className={"container"}>
                <div className={"row"}>

                    {/* Order delivery address */}
                    {deliveryOrderInfo()}

                    {/* Order items & price info */}
                    {renderOrderItemsAndPrice()}

                    {/* Order unique I'd, created date & status etc */}
                    {moreOrderInfo}

                    {/* Some useful links  */}
                    <div className="offset-md-2 col-md-8 pt-3 pb-2">

                        <Link to={'/reset-email'}
                            // onClick={() => reset_email()}
                              className="btn btn-primary m-2">
                            Contact seller
                        </Link>

                        <button className="btn btn-secondary m-2">
                            <i className="fas fa-headset"></i> Need help
                        </button>

                        <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                                id="#deleteModal" className="btn btn-danger m-2">
                            Cancel order
                        </button>

                    </div>


                </div>
            </div>

        </Fragment>
    )

}

// For more info just for reference
// github.com/MTayyab10/shop_time/blob/main/frontend/src/containers/OrderItemDetail.js

const mapStateToProps = state => ({
    specific_order: state.orders.specific_order,
    specific_order_items: state.orders.specific_order_items
})

export default connect(mapStateToProps, {
    get_specific_order
})(SpecificOrderDetail)
