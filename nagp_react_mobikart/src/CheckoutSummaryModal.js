import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import moment from "moment";

class CheckOutSummaryModal extends Component {

    orderPlacementFailEmptyCart = "Your Order Cannot be Placed since your Cart is Empty. Try Adding few items"
    orderPlacedSuccess = " Your Order has been placed successfully with Order Id: "
    orderPlacedFailure = "Order could not be placed. Please login to continue!"
    isUserLoggedIn = false

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
    }

    checkUserStatus() {
        var userItem = sessionStorage.getItem("user")
        if (userItem != null) {
            this.isUserLoggedIn = true
            if (this.props.addedItems.length == 0) {
                return this.orderPlacementFailEmptyCart
            } else {
                return this.orderPlacedSuccess + " " + this.generateProductID()
            }
        } else {
            this.isUserLoggedIn = false
            return this.orderPlacedFailure
        }
    }

    getExpectedDeliveryDate() {
        if (!this.props.addedItems.length == 0 && this.isUserLoggedIn) {
            if (this.props.expressShipping) {
                return `Your order is expected to be delivered by: ${this.getDate()}`
            } else {
                return `Your order is expected to be delivered by: ${this.getLongerDate()}`
            }
        } else {
            return `Get Your Product Delivered by ${this.getDate()} if you order now and select express shipping`
        }
        
    }

    getDate() {
        return moment().add(1, 'days')
    }

    getLongerDate() {
        return moment().add(5,'days')
    }

    generateProductID() {
        return uuidv4()
    }

    render() {
        return (
            <div>
                <a className="waves-effect waves-light btn modal-trigger" data-target="modal1">Checkout</a>
                <div ref={Modal => { this.Modal = Modal; }} id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Order Summary</h4>
                        <p>{this.checkUserStatus()}</p>
                        <p>{this.getExpectedDeliveryDate()}</p>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn">
                            Okay!
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        expressShipping: state.expressShipping
    }
}

export default connect(mapStateToProps) (CheckOutSummaryModal);
