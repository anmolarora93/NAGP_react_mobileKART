import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProductFromCart, removeNItems, addNItems } from './Actions'
import CartExtension from './CartExtension';

class Cart extends Component {
    handleRemove = (id) => {
        this.props.removeProductFromCart(id);
    }
    
    handleAddQuantity = (id) => {
        this.props.addNItems(id);
    }
    
    handleSubtractQuantity = (id) => {
        this.props.removeNItems(id);
    }

    render() {
        let productsOrdered = this.props.products.length ? (
            this.props.products.map(product => {
                return (
                    <li className="collection-item avatar" key={product.productId}>
                        <div className="item-desc">
                            <span className="title">{product.productName}</span>
                            <p>{product.productDesc}</p>
                            <p><b>Price ₹ {product.productPrice}</b></p>
                            <p>
                                <b>Quantity: {product.quantity}</b>
                            </p>
                            <div className="add-remove">
                                <Link to="/cart"><i className="material-icons" onClick={() => { this.handleAddQuantity(product.productId) }}>arrow_drop_up</i></Link>
                                <Link to="/cart"><i className="material-icons" onClick={() => { this.handleSubtractQuantity(product.productId) }}>arrow_drop_down</i></Link>
                            </div>
                            <button className="waves-effect waves-light btn pink remove" onClick={() => { this.handleRemove(product.productId) }}>Remove</button>
                        </div>
                    </li>
                )
            })
        ) : (
                <p>Your Cart is Empty. Fill it up with a new Mobile Phone of your Choice.</p>
            )
        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {productsOrdered}
                    </ul>
                </div>
                <CartExtension />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.addedItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromCart: (id) => { dispatch(removeProductFromCart(id)) },
        addNItems: (id) => { dispatch(addNItems(id)) },
        removeNItems: (id) => { dispatch(removeNItems(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Cart)