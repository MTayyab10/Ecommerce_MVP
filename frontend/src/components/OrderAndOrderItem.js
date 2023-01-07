import {Link} from "react-router-dom";
import moment from "moment";
import React, {Fragment} from "react";
import facebookImg from "../containers/accounts/Continue with Fb Btn.PNG";


const OrderAndOrderItem = ({ // destructuring props
                               order,
                               order_items
                           }) => {

    return (
        <div className="row">

            {order && true && true &&
                order.map((order) => (

                    <Link key={order.id}
                        // to={`/order/${order.id}`}
                          to={{
                              pathname: `/order/${order.id}`,
                              state: {order}
                          }}
                          className="text-decoration-none text-reset">

                        <div className="offset-md-1 col-md-9 col-12 mb-2">

                            <div className="card shadow">

                                <h6 className="card-header small">

                                    {/*/!*{% if order.complete %}*!/*/}

                                    {/*<i className="fas fa-check-circle text-success me-1"></i>*/}

                                    {/*/!*{% endif %}*!/*/}

                                    {moment(order.created_date).format("MMMM Do, YYYY, h:mm a")}
                                </h6>

                                <div className="card-body">

                                    {/*  1 - Order Items  */}

                                    <div className="row small">

                                        {order_items && true && true &&
                                            order_items.map((item) => (
                                                (item.order.id == order.id) && (

                                                    <Fragment key={item.id}>

                                                        <div className="col-md-2 col-3 mb-1">

                                                            <img
                                                                style={{width: "90px", height: "40px"}}
                                                                src={facebookImg}
                                                                className="img-fluid "
                                                                alt={item.product.name}/>

                                                        </div>

                                                        <div className="col-md-10 col-9">
                                                            <table className="table table-borderless table-sm">

                                                                <tbody>
                                                                <tr>

                                                                    <td className="col-md-3 col-3 small">
                                                                        {/*{#             <a#}*/}
                                                                        {/*{#     href="{% url 'products3:specific_product' item.product.category item.product.name item.product.id %}"#}*/}
                                                                        {/*{#          class="text-decoration-none text-reset">#}*/}
                                                                        {item.name}
                                                                    </td>

                                                                    <td className="col-md-3 col-3 small">
                                                                        Rs. {item.price}
                                                                    </td>

                                                                    <td className="col-md-3 col-3 small">
                                                                        x {item.quantity}
                                                                    </td>

                                                                    {/*{#     <td class="col-md-3 col-3">#}*/}
                                                                    {/*{#        {{order.created_date}}#}*/}
                                                                    {/*{#     </td>#}*/}

                                                                </tr>

                                                                </tbody>
                                                            </table>

                                                        </div>

                                                    </Fragment>

                                                )
                                            ))}

                                        {/*</div>*/}

                                        <hr/>

                                        {/* 1 - Sub-total  */}

                                        <div className="row">

                                            <div className="col">
                                                <h6 className="small">
                                                    Sub-total
                                                </h6>
                                            </div>

                                            <div className="col">
                                                <h6 className="small">
                                                    Rs. {order.sub_total}
                                                </h6>
                                            </div>

                                        </div>

                                        {/* 2 - delivery charges   */}

                                        {/*<div className="row">*/}

                                        {/*    <div className="col">*/}
                                        {/*        <h6 className="small">*/}
                                        {/*            Delivery fee*/}
                                        {/*        </h6>*/}
                                        {/*    </div>*/}

                                        {/*    <div className="col">*/}
                                        {/*        <h6 className="small">*/}
                                        {/*            Rs. {order.delivery_fee}*/}
                                        {/*        </h6>*/}
                                        {/*    </div>*/}

                                        {/*</div>*/}

                                        {/* 2 - service charges   */}

                                        {/*<div className="row">*/}

                                        {/*    <div className="col">*/}
                                        {/*        <h6 className="small">*/}
                                        {/*            Service fee*/}
                                        {/*        </h6>*/}
                                        {/*    </div>*/}

                                        {/*    <div className="col">*/}
                                        {/*        <h6 className="small">*/}
                                        {/*            Rs. {order.service_fee}*/}
                                        {/*        </h6>*/}
                                        {/*    </div>*/}

                                        {/*</div>*/}


                                        {/* 3 - All total charges  */}

                                        <div className="row">

                                            <div className="col">
                                                <h6 className="text-danger small">
                                                    Total (Pkr)
                                                </h6>
                                            </div>

                                            <div className="col">
                                                <h6 className=" text-danger small">
                                                    Rs. {order.total_amount}
                                                </h6>
                                            </div>

                                        </div>

                                        {/* just formality link as we have whole card as a link */}


                                        <div className={"row small"}>

                                            <div className={"col"}>

                                                <Link to={`/order/${order.id}`}
                                                      className={"btn btn-sm small btn-outline-primary"}>
                                                    More info
                                                </Link>
                                            </div>

                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>


                    </Link>

                ))}

        </div>
    )

}

export default OrderAndOrderItem;