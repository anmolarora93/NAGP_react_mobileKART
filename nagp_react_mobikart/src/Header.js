import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    state = {
        buttonDisplayName: ''
    }

    constructor() {
        super()
        var userItem = sessionStorage.getItem("user")
        if (userItem != null) {
            var userName = JSON.parse(userItem).displayname
            this.state.buttonDisplayName = userName
        } else {
            this.state.buttonDisplayName = 'Login'
        }
    }

    render() {
        return (
            <nav className="teal nav-wrapper">
                <div className="container">
                    <Link to="/home" className="brand-logo center myFont">Mobile KART</Link>
                    <ul className="right">
                        <li><Link to="/home"><i className="material-icons">home</i></Link></li>
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                        <li><a href="/user" className="waves-effect waves-light btn">{this.state.buttonDisplayName}
                                <i className="material-icons left">face</i>
                        </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;