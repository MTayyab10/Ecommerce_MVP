import React, {Fragment, useEffect, useState} from "react";
import "./ProductsStyle.css";
import {Link, Navigate, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {get_products} from "../../actions/products";
import {
    add_item,
    get_items,
    get_total,
    get_item_total,
} from "../../actions/cart"

import {setAlert} from "../../actions/alert"

const SpecificProduct = (
    {
        isAuthenticated,
        products,
        get_products,
        // product,
        add_item,
        get_items,
        get_total,
        get_item_total,
        setAlert,
    }) => {

    // this id shows which product should show here
    const {id} = useParams();


    // fetch product from actions/products.js

    useEffect(() => {
        window.scrollTo(0, 0);
        get_products();
    }, [])

    // Img style for Shop detail

    const imgStyle = {
        "width": "200px",
        "height": "200px"
    }

    const loginModalMsg = (

        <div className="modal fade" id="exampleModal" tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Login
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        To add item in cart, Login.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <Link to="/login" className="btn btn-primary"
                             data-bs-dismiss="modal"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )


    return (

        <Fragment>

            <div className={"text-center p-2 m-2"}>
                <h2>Product</h2>
            </div>

            {products && true && true &&
                products.map(product => (
                    (product.id == id) && (
                        <div key={product.id}>

                            {/* Breadcrumb section */}

                            <div className="container">
                                <nav aria-label="breadcrumb small">

                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item small">
                                            <Link className="text-decoration-none"
                                                  to="/">
                                                Home
                                            </Link>
                                        </li>

                                        <li className="breadcrumb-item small">
                                            <a className="text-decoration-none"
                                               href="#" style={{textTransform: "capitalize"}}>
                                                {product.category.name.toLowerCase()}
                                            </a>
                                        </li>

                                        <li className="breadcrumb-item active small" aria-current="page"
                                            style={{textTransform: "capitalize"}}>
                                            {product.name.toLowerCase()}
                                        </li>

                                    </ol>
                                </nav>
                            </div>

                            {/* Product detail & add to cart card */}

                            <div className="container">
                                <div className="row pb-3">

                                    <div className="col-md-4 col-5">

                                        <a href={"#"} className="text-decoration-none text-reset">

                                            <div id="carouselExampleCaptions" className="carousel slide item"
                                                 data-bs-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active">

                                                        <img data-src=""
                                                             style={{"width": "190px", "height": "150px"}}
                                                             src={product.img}
                                                            // src="https://via.placeholder.com/150?text={{ product.name | title }}"
                                                            /*{#    style="width: 200px; height: 150px;"#}*/
                                                             className="lazy img-fluid" alt=""/>
                                                    </div>
                                                </div>
                                            </div>

                                        </a>

                                        {/* Detail and shipping info Buttons */}

                                        <div className="pt-2">

                                            <button className="btn btn-info me-3 text-light" data-bs-toggle="collapse"
                                                    href="#multiCollapseExample1"
                                                    role="button" aria-expanded="false"
                                                    aria-controls="multiCollapseExample1">
                                                <i className="fas fa-info-circle"/>

                                            </button>

                                            <button className="btn btn-dark" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#multiCollapseExample2" aria-expanded="false"
                                                    aria-controls="multiCollapseExample2">
                                                <i className="fas fa-shipping-fast"/>
                                            </button>

                                            <div className="row">
                                                <div className="col">
                                                    <div className="collapse multi-collapse" id="multiCollapseExample1">
                                                        <div className="card card-body p-2">

                                                            <i><b>{product.shop_owned.name}</b> </i> provide
                                                            quality stuff related to <b>
                                                            {product.category.name} </b> including {product.name}.

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <div className="collapse multi-collapse" id="multiCollapseExample2">
                                                        <div className="card card-body p-2">
                                                            We try to provide your order in <b>
                                                            {product.shop_owned.delivery_time}. </b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    {/* Price, address, time, add to cart */}

                                    <div className="offset-md-2 col-md-5 col-7">
                                        <div className="card">
                                            <div className="card-header">

                                                <h6 className="d-inline"
                                                    style={{textTransform: "capitalize"}}>
                                                    {product.name.toLowerCase()}
                                                </h6>

                                                <Link to="/"
                                                      className="float-end small text-decoration-none">
                                                    <i className="fa fa-chevron-left"/> Shop
                                                </Link>

                                            </div>

                                            {/* if have discount then */}
                                            {/* show original price, discount price*/}

                                            <div className="card-body pt-1">

                                                {product.discount ?

                                                    <div className="">

                                                        <h6 className="small text-secondary me-2 d-inline">
                                                            <s className="small">
                                                                Rs. {product.price}
                                                            </s>
                                                        </h6>

                                                        <h6 className="small d-inline text-danger">
                                                            Rs. {product.discount_price} <small
                                                            className="text-dark">
                                                            / {product.unit}
                                                        </small>
                                                        </h6>
                                                    </div>

                                                    :
                                                    <h6 className="small d-inline text-danger">
                                                        Rs. {product.price} <small
                                                        className="text-dark">
                                                        / {product.unit}
                                                    </small>
                                                    </h6>
                                                }

                                                {/*  Shop addr/location of product  */}

                                                <div className="text-secondary small text-truncate">

                                                    <i className="fas fa-map-marker-alt
                                                     text-info"/> {product.shop_owned.address}

                                                </div>

                                                {/*Shop business timing of product */}

                                                <div className="text-secondary small pb-1 text-truncate">
                                                    <i className=" far fa-clock
                                                    text-dark "/> {product.shop_owned.business_time}
                                                </div>

                                                {/* If product quantity available, then check login If
                                                not login then show a model */}

                                                {product.quantity >= 1 ?

                                                    <Fragment>

                                                        {isAuthenticated ?
                                                            <Link onClick={() => add_item(product)}
                                                                // style="margin-right: 2px;"
                                                                  to={"/cart"}
                                                                  className="btn btn-outline-success btn-sm">
                                                                Add to <i className="fas fa-shopping-cart"/>
                                                            </Link>
                                                            :
                                                            <>
                                                                {loginModalMsg}
                                                                <button
                                                                    // style="margin-right: 2px;"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal"
                                                                    className="btn btn-outline-success btn-sm">
                                                                    Add to <i className="fas fa-shopping-cart"/>
                                                                </button>


                                                            </>


                                                        }


                                                        {/*<button onClick={() => add_item(product)}*/}
                                                        {/*    // style="margin-right: 2px;"*/}
                                                        {/*    id="liveToastBtn"*/}
                                                        {/*    // data-product="{{ product.id }}" data-action="add"*/}
                                                        {/*    className="btn btn-outline-success update-cart btn-sm">*/}
                                                        {/*    Add Now <i className="fas fa-shopping-cart"/>*/}
                                                        {/*</button>*/}
                                                    </Fragment>

                                                    :
                                                    // <div >

                                                    <h6 className="alert alert-danger p-2 small">
                                                        <i className="fas fa-exclamation-circle"/> This Item is
                                                        sold-out.
                                                    </h6>

                                                    // </div>
                                                }

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Shop Detail Section */}

                            <div className="bg-light">
                                <div className="container pb-2">

                                    <div className="p-2">
                                        <h2>About Shop</h2>
                                    </div>

                                    <div className="col-md-6 col-12 ">
                                        <div className="row pb-2 pt-2">

                                            <div className="col-md-5 col-6">
                                                <img src={product.shop_owned.img} className="img-fluid rounded-start"
                                                     style={imgStyle} alt=""/>
                                            </div>

                                            <div className="col-md-6 col-6">
                                                <div className="info">

                                                    <h5 className="address text-truncate">

                                                        <i className="fas fa-map-marker-alt
                                                        map-color text-info"/>
                                                        {product.shop_owned.address}
                                                        {/*<span className="map">*/}
                                                        {/*    View on Google Maps*/}
                                                        {/*</span>*/}
                                                    </h5>

                                                    <h3 className={"shop-name"}>
                                                        <i className="fas fa-store-alt "
                                                           style={{"fontSize": "16px"}}
                                                        /> {product.shop_owned.name}
                                                    </h3>

                                                    <h4 className={"business-timing"}>
                                                        <i className="
                                                     fw-bold far fa-clock"/> {product.shop_owned.business_time}
                                                    </h4>

                                                    <p className="deliver-timing">
                                                        <i className="
                                                        fas fa-truck"/> {product.shop_owned.delivery_time}
                                                        {/*<b> Deliver: </b>*/}

                                                    </p>

                                                    <Link
                                                        // to={`/shops/${product.shop_owned.name}`}
                                                        to={{
                                                            pathname: `/shops/${product.shop_owned.name}`,
                                                            state: {product}
                                                        }}
                                                        className="btn btn-primary">
                                                        More Products
                                                    </Link>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Display products with same category */}

                            <div className={"container"}>
                                <div className="pt-2 pb-2">

                                    <h2 className="">
                                        You might also
                                        like <i className="fas fa-heart
                                            text-danger"/> this
                                    </h2>

                                </div>

                                <div className="row pb-2">

                                    {/* Don't show the above display product again  */}

                                    {products.filter((sameProduct) =>
                                        product.category.name === sameProduct.category.name
                                        && product.name !== sameProduct.name)
                                        .map((sameProduct) => (

                                                <div key={sameProduct.id} className={"col-md-2 col-6 gx-1 gy-1"}>

                                                    <Link className="text-decoration-none
                                                 text-reset"
                                                          to={`/${sameProduct.category.name}/${sameProduct.name}/${sameProduct.id}`}
                                                    >
                                                        <div className="card card1">

                                                            <img
                                                                src={sameProduct.img}
                                                                // data-src={product.img}
                                                                // src={`https://via.placeholder.com/150?text=${ product.name }`}
                                                                className="lazy card-img-top "
                                                                alt={`${sameProduct.name}`}/>

                                                            {sameProduct.new &&
                                                                <span className="fw-light notify-badge
                                                                 bg-danger badge">
                                                               new
                                                            </span>
                                                            }

                                                            {/* Show a discount tag for */}
                                                            {/* Only Discounted items  */}

                                                            {sameProduct.discount_percent >= 5 &&
                                                                <span className="notify-badge2 badge
                                                               bg-dark fw-light">
                                                                {sameProduct.discount_percent}% off
                                                            </span>
                                                            }

                                                            <div className="product-detail">

                                                                <h6 className="d-inline ">
                                                                    {sameProduct.name}
                                                                </h6>

                                                                <div className="small text-truncate">
                                                                    {sameProduct.description}, build fast
                                                                </div>

                                                                {sameProduct.discount ?

                                                                    <div className="">

                                                                        <h6 className="small text-secondary me-2 d-inline">
                                                                            <s className="small">
                                                                                Rs. {sameProduct.price}
                                                                            </s>
                                                                        </h6>

                                                                        <h6 className="small d-inline text-danger">
                                                                            Rs. {sameProduct.discount_price} <small
                                                                            className="text-dark">
                                                                            {product.unit}
                                                                        </small>
                                                                        </h6>

                                                                    </div>

                                                                    :
                                                                    <h6 className="small d-inline text-danger">
                                                                        Rs. {sameProduct.price} <small
                                                                        className="text-dark">
                                                                        {sameProduct.unit}
                                                                    </small>
                                                                    </h6>
                                                                }

                                                            </div>

                                                        </div>
                                                    </Link>

                                                </div>
                                            )
                                        )}
                                </div>

                            </div>

                        </div>
                    )
                ))}

        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    // loading: state.products.loading,
    products: state.products.products,
});


export default connect(mapStateToProps, {
    get_products,
    add_item,
    get_items,
    get_total,
    get_item_total,
    setAlert,
})(SpecificProduct);