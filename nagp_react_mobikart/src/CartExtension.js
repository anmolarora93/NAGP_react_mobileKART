import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addShippingCost, removeShippingCost } from './Actions'
import Modal from './CheckoutSummaryModal'

class CartExtension extends Component {

    // A flat rate shipping cost of Rs 50/- is being Charged on all products for extra fast PRIME Delivery.
    // Customer can choose not to avail it as well
    flatRateShippingCost = 50

    componentWillUnmount() {
        if (this.refs.shipping.checked)
            this.props.substractShipping()
    }

    handleShipping = (e) => {
        if (e.target.checked) {
            this.props.addShippingCost(this.flatRateShippingCost);
        }
        else {
            this.props.removeShippingCost(this.flatRateShippingCost);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange={this.handleShipping} />
                            <span>Shipping (+ Rs50/-) For extra fast delivery within 1 day</span>
                        </label>
                    </li>
                    <li className="collection-item"><b>Total: Rs {this.props.total} /-</b></li>
                </div>
                <div className="checkout">
                    <Modal />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShippingCost: (cost) => { dispatch(addShippingCost(cost)) },
        removeShippingCost: (cost) => { dispatch(removeShippingCost(cost)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartExtension)