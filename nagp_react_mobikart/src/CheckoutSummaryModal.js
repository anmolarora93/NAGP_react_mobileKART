import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import moment from "moment";

class CheckOutSummaryModal extends Component {

    orderPlacedSuccess = " Your Order has been placed successfully with Order Id: "
    orderPlacedFailure = "Order could not be placed. Please login to continue!"

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
            return this.orderPlacedSuccess + " " + this.generateProductID()
        } else {
            return this.orderPlacedFailure
        }
    }

    getExpectedDeliveryDate() {
        return `Your order is expected to be delivered by: ${this.getDate()}`
    }

    getDate() {
        return moment().add(1, 'days')
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

export default CheckOutSummaryModal;
