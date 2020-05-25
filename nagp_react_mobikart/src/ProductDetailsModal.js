import React, { Component } from "react";
import { connect } from 'react-redux'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ProductDetailsModal extends Component {

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

    handleDetails() {
        let product = this.props.products.filter(product => product.productId == 1)
        let name = ""
        product.forEach (p => {
            console.log(p.productName)
            name = p.productName
        })
        return name
    }

    render() {
        return (
            <div>
                <a className="card-action modal-trigger" data-target="modal1">Product Details</a>
                <div ref={Modal => { this.Modal = Modal; }} id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Product Details</h4>
                        <p>{this.handleDetails()}</p>
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
        products: state.products
    }
}

export default connect(mapStateToProps) (ProductDetailsModal);
