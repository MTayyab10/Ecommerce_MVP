import React, {Fragment, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import "./ProductsStyle.css"
import {get_products} from "../../actions/products"
import {get_shops} from "../../actions/shops"
import {connect} from "react-redux";

const ShopProducts = ({
                          products, get_products,
                          shops, get_shops
                      }) => {

    const {name: shopName} = useParams();

    // fetch product from actions/products.js
    // fetch shops from actions/shops.js

    useEffect(() => {
        get_products();
        get_shops();
    }, [])

    // fetch shops from actions/shops.js

    // useEffect(() => {
    //     get_shops();
    // }, [])


    // Breadcrumb

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb small">
                <li className="breadcrumb-item small">
                    <Link className="text-decoration-none"
                          to="/">
                        Home
                    </Link>
                </li>

                <li className="breadcrumb-item active small"
                    aria-current="page">
                    {shopName}
                </li>
            </ol>
        </nav>
    )

    {/* Products of Specific/One Shop */}

    const shopProducts = (
        <div className="row pb-3">

            {products && true && true &&
                products.filter((product) =>
                    product.shop_owned.name === shopName)
                    .map(product => (
                        <div key={product.id} className="col-md-2 col-6 gx-1 gy-1">

                            <Link className="text-decoration-none text-reset"
                                  to={{
                                      pathname: `/${product.category.name}/${product.name}/${product.id}`,
                                      state: {product}
                                  }}
                            >
                                <div className="card card1">

                                    <img
                                        src={product.img}
                                        // data-src={product.img}
                                        // src={`https://via.placeholder.com/150?text=${ product.name }`}
                                        className="lazy card-img-top "
                                        alt={`${product.name}`}/>

                                    {product.new &&
                                        <span className="fw-light notify-badge
                                             bg-danger badge">
                                           new
                                    </span>
                                    }

                                    {/* Discount tag */}

                                    {product.discount_percent >= 5 &&
                                        <span className="notify-badge2 badge
                                    bg-dark fw-light">
                                        {product.discount_percent}% off
                                    </span>
                                    }

                                    <div className="product-detail">

                                        <h6 className="d-inline">
                                            {product.name}
                                        </h6>

                                        <div className="small text-truncate">
                                            {product.description}, build fast
                                        </div>

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
                                                    {product.unit}
                                                </small>
                                                </h6>
                                            </div>
                                            :
                                            <h6 className="small d-inline text-danger">
                                                Rs. {product.price} <small
                                                className="text-dark">
                                                {product.unit}
                                            </small>
                                            </h6>
                                        }
                                    </div>

                                </div>
                            </Link>

                        </div>
                    ))}
        </div>

    )

    // img style for Shop's detail

    const imgStyle = {
        "width": "200px",
        "height": "200px"
    }

    return (

        <Fragment>
            <div className="container">

                <div className="text-center p-3">
                    <h3>{shopName}</h3>
                </div>

                {/* Breadcrumb Section */}
                {breadCrumb}

                {/* Products of Specific/One Shop */}
                {shopProducts}

            </div>

            {/* Other Shops with same Category */}

            <div className="bg-light">

                <div className="container pb-2">

                    <div className="p-2">
                        <h2>Other shops</h2>
                    </div>

                    {/*<h3> More shops with same*/}
                    {/*    category: {shops && true && true &&*/}
                    {/*    shops.map((shop) => (shop.name == shopName &&*/}
                    {/*        shops.filter((sameCtgry) => )))} </h3>*/}

                    {shops && true && true &&
                    shops.length > 0 ? (
                        shops && true && true &&
                        shops.map((shop) =>
                            (shop.name === shopName &&

                                <div key={shop.id} className={"row"}>
                                    {shops.filter((shopsSameCtgry) =>
                                        shop.category.name === shopsSameCtgry.category.name
                                        && shopsSameCtgry.name !== shopName
                                    ).map((shop) => (

                                        // <div className="row ">
                                        <div key={shop.id} className="col-md-6 col-12 ">
                                            <div className="row pb-2 pt-2">

                                                <div className="col-md-5 col-6">
                                                    <img src={shop.img} className="img-fluid rounded-start"
                                                         style={imgStyle} alt=""/>
                                                </div>

                                                <div className="col-md-6 col-6">
                                                    <div className="info">

                                                        <h5 className="address text-truncate">

                                                            <i className="fas fa-map-marker-alt
                                                        map-color text-info"/>
                                                            {shop.address}
                                                            {/*<span className="map">*/}
                                                            {/*    View on Google Maps*/}
                                                            {/*</span>*/}
                                                        </h5>

                                                        <h3 className={"shop-name"}>
                                                            <i className="fas
                                                            fa-store-alt "
                                                               style={{"fontSize": "16px"}}/> {shop.name}
                                                        </h3>

                                                        <h4 className={"business-timing"}>
                                                            <i
                                                                className="
                                                     fw-bold far fa-clock"/> {shop.business_time}
                                                        </h4>

                                                        <p className="deliver-timing">
                                                            <i className="
                                                        fas fa-truck"/> {shop.delivery_time}
                                                            {/*<b> Deliver: </b>*/}
                                                        </p>

                                                        <Link
                                                            // to={`/shops/${product.shop_owned.name}`}
                                                            to={{
                                                                pathname: `/shops/${shop.name}`,
                                                                state: {shop}
                                                            }}
                                                            className="btn btn-primary">
                                                            See Products
                                                        </Link>

                                                    </div>
                                                </div>

                                            </div>
                                            <hr/>
                                        </div>
                                    ))
                                    }
                                </div>
                            )
                        )
                    ) : <h3>There is no more shops for same category
                    </h3>

                    }

                    <h3>
                        Shops length: {shops && true && true &&
                        shops.length}
                    </h3>

                </div>
            </div>

        </Fragment>
    )
}


const mapStateToProps = state => ({
    // loading: state.products.loading,
    products: state.products.products,
    // get shops and loading from shop state
    loading: state.shops.loading,
    shops: state.shops.shops
});


export default connect(mapStateToProps, {
    get_shops,
    get_products
})(ShopProducts);