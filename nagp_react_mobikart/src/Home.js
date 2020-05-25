import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from "materialize-css";
import ReactPaginate from 'react-paginate';
import './home.css'
import { setProductList, addProductToCart } from './Actions'
import ProductDetailsModal from './ProductDetailsModal';

class Product {
    constructor(productId, productName, productPrice, productDescription, productQtyInStock) {
        this.productId = productId
        this.productName = productName
        this.productPrice = productPrice
        this.productDescription = productDescription
        this.productQtyInStock = productQtyInStock
    }
}

class Home extends Component {
    state = {
        products: [],
        filteredProducts: [],
        slicedProductData: [],
        filtered: false,
        perPage: 5,
        offset: 0,
        currentPage: 0,
        pageCount: 0
    }

    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        let options = {
            inDuration: 300,
            outDuration: 300,
            hover: false,
            coverTrigger: false,
        };
        M.Dropdown.init(elems, options);
        this.fetchProducts()
    }

    fetchProducts() {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(data => this.process(data))
    }

    process(response) {
        var p = []
        if (Array.isArray(response)) {
            response.forEach(product => {
                var pa = new Product(product.id, product.name, product.price, product.description, product.qty)
                p.push(pa)
            })
        }
        const slicedProductData = p.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            products: this.state.products.concat(p),
            slicedProductData: slicedProductData,
            pageCount: Math.ceil(response.length / this.state.perPage)
        })
        this.props.setProductList(this.state.products)
    }

    productQtyText(product) {
        if (product.productQtyInStock == 0) {
            return "Out of Stock"
        } else {
            return product.productQtyInStock < 5 ? "Selling Fast" : "In Stock"
        }
    }

    handleClick(id, qty) {
        if (qty > 0) {
            this.props.addProductToCart(id)
        }
    }

    clickHandler() {
        return false
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.fetchProducts()
        });

    };

    compareProductPrice(product1, product2) {
        return product1.productPrice < product2.productPrice ? 1 : 0
    }

    sortItemsByPrice(ascending) {
        if (ascending) {
            this.setState({
                products: this.state.products.sort((product1, product2) => (product1.productPrice - product2.productPrice))
            })
        } else {
            this.setState({
                products: this.state.products.sort((product1, product2) => (product2.productPrice - product1.productPrice))
            })
        }
    }

    searchProducts = (e) => {
        let filteredItems = this.state.products.filter(product => product.productName.includes(e.target.value))
        this.setState({
            filteredProducts: filteredItems,
            filtered: true
        })
    }

    render() {
        let products
        if (this.state.filtered) {
            products = this.state.filteredProducts
        } else {
            products = this.state.slicedProductData
        }
        let mobiles = products.map(product => {
            return (
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1" key={product.productId}>
                            <div className="card-content white-text">
                                <span className="card-title">{product.productName}</span>
                                <p>{product.productDescription}</p>
                            </div>
                            <div className="card-action">
                                <a onClick={() => this.clickHandler()}>₹ {product.productPrice}/-</a>
                                <a onClick={() => { this.handleClick(product.productId, product.productQtyInStock) }}>Buy Now</a>
                                <a onClick={() => this.clickHandler()}>{this.productQtyText(product)}</a>
                                <ProductDetailsModal className="card-action" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="container">
                <h3 className="center">Mobiles For Sale</h3>
                <input placeholder="Search for..." onChange={this.searchProducts} />
                <a className='right dropdown-trigger btn' href='#' data-target='dropdown1'>Sort Mobiles</a>
                <ul id='dropdown1' className='dropdown-content'>
                    <li><a onClick={() => this.sortItemsByPrice(true)}><i className="material-icons">arrow_drop_up</i>Price Low To High!</a></li>
                    <li><a onClick={() => this.sortItemsByPrice(false)}><i className="material-icons">arrow_drop_down</i>Price High To Low!</a></li>
                    <li className="divider" tabIndex="-1"></li>
                </ul>
                <div className="box">
                    {mobiles}
                </div>
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductList: (products) => { dispatch(setProductList(products)) },
        addProductToCart: (id) => { dispatch(addProductToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)