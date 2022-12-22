import React, {Fragment, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import './ProductsStyle.css'
import {get_products} from "../../actions/products"
import {add_item,
        get_items,
        get_item_total,
        get_total} from "../../actions/cart"

import facebookImg from "../accounts/Continue with Fb Btn.PNG"


const DisplayProducts = (
    {loading,
        products,
        get_products,
        add_item,
        get_item_total

    }) => {

    const {category} = useParams();

    // set search query to empty string
    const [query, setQuery] = useState("");

    //  set search parameters like name, price etc.
    //  just add it to this array
    const [searchParam] = useState(
        ["name", "price", "description"]
    );

    // fetch product from actions/products.js

    useEffect(() => {
        get_products();
        add_item();
        get_items();
        get_item_total();
        get_total();
        window.scrollTo(0, 0);

    }, [])

    // Search items by typing in search box

    function searchItems(items) {
        return products && true && true && // by adding true not give err
            products.filter((item) => {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            });
    }

    // Search box for searching products

    const SearchBox = (
        <div className="offset-md-4 col-md-4 offset-1 col-10
             pt-3 pb-4">
            <form className="d-flex">

                <div className="input-group searchBar">

                    <input className="form-control border-end-0 border rounded-pill"
                           type="text" placeholder="find items or products"
                           name="query"
                           value={query}
                           onChange={e => setQuery(e.target.value)}

                           required/>
                    {/*  above name=q is very important */}

                    <button className="btn btn-outline-secondary butn
                       bg-white border-start-0 border rounded-pill ms-n3"
                            type="submit">
                        <i className="fa fa-search"/>
                    </button>

                </div>

            </form>
        </div>)

    // This one doesn't work at the end just & product in btn

    const addToCart = async () => {
        // await add_item(3)
        await add_item(products && true && true &&
            products.map((product) => (product)))
    }

    // Render all Products function

    const RenderProducts = () =>
        products && true && true &&
        searchItems(products).map((product) => (
            <div key={product.id} className="col-md-2 col-6 gx-1 gy-1">

                <Link className="text-decoration-none text-reset"
                      to={{
                          pathname: `/${product.category.name}/${product.name}/${product.id}`,
                          state: {product}
                      }}
                >
                    <div className="card card1">

                        <img
                            src={facebookImg}
                            // data-src={product.img}
                            // src={`https://via.placeholder.com/150?text=${ product.name }`}
                            className="lazy card-img-top "
                            alt={`${product.name}`}
                        />

                        {/*If product is new, show a 'new' tag */}

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

                            {/* Product, by adding transform & lower case can get */}

                            <h6 className="d-inline" style={{textTransform: "Capitalize"}}>
                                {product.name.toLowerCase()}
                            </h6>

                            <div className="small text-truncate">
                                {product.description}, build fast
                            </div>

                            {/* If product have discount then show */}

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

                {/* Add to the cart */}

                {/*<button*/}
                {/*    // onClick={addToCart}*/}
                {/*    onClick={async () => await add_item(product)}*/}
                {/*    className={'btn btn-sm btn-outline-success'}>*/}
                {/*    Add to cart {product.id}*/}
                {/*</button>*/}
            </div>
        ))


    // Products loading spinner

    const ProductsSpinner = () => (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary mt-2 " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (

        <Fragment>

            {/* Search box for search products */}

            {SearchBox}

            <div className={"pb-3"}>
                <div className="row">

                    {loading ?
                        <ProductsSpinner/>
                        :
                        <RenderProducts/>
                    }

                    {/*<h3>*/}
                    {/*    Total Product: {products && true && true &&*/}
                    {/*products.length}*/}
                    {/*</h3>*/}

                </div>
            </div>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    products: state.products.products,
    total_items: state.cart.total_items

});


export default connect(mapStateToProps, {
    get_products,
    add_item,
        // get_items();
    get_item_total
        // get_total();
})(DisplayProducts);