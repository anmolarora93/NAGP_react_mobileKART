import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './user.css'

class User extends Component {
    state = {
        username: '',
        password: '',
        isUserLoggedInMyApp: ''
    }

    isUserLoggedIn() {
        var userItem = sessionStorage.getItem("user")
        if (userItem == null) {
            return false
        } else if (userItem["username"] != "" && userItem["displayname"] != "") {
            return true
        }
    }

    constructor() {
        super()
        toast.configure()
        this.state.isUserLoggedInMyApp = this.isUserLoggedIn()
    }

    handleUsernameChange = (e) => {
        this.state.username = e.target.value
    }

    handlePasswordChange = (e) => {
        this.state.password = e.target.value
    }

    handleClick = () => {
        this.state.isUserLoggedInMyApp ? this.logoutUser() : this.loginUser()
    }

    loginUser() {
        fetch(`http://localhost:5000/users`)
            .then(response => response.json())
            .then(data => this.process(data))
    }

    process(response) {
        if (Array.isArray(response)) {
            response.forEach(user => {
                if (this.state.username == user.username && this.state.password == user.password) {
                    this.save(user.username, user.password, user.displayname)
                }
            })
        }
    }

    save(username, password, displayname) {
        const userItem = {
            "username": username,
            "displayname": displayname
        }
        sessionStorage.setItem("user", JSON.stringify(userItem))
        toast("Logged In!")
        window.location.href = '/'
    }

    logoutUser() {
        toast.success('Logged Out!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1200,
        })
        sessionStorage.clear()
        window.location.reload()
        
    }

    render() {
        if (this.state.isUserLoggedInMyApp) {
            return (
                <div className="container row top loggedIn">
                    <p>You are already logged in</p>
                    <button onClick={this.handleClick} className="waves-effect waves-light btn loggedInBtn">
                        <i className="right row center"></i>Logout
                    </button>
                    <ToastContainer />
                </div>
            );
        } else {
            return (
                <div className="container row top">
                    <div className="col s12 m6">
                        <div className="card darken-1">
                            <div className="card-content ">
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input placeholder="Enter Your Username" name="loginIDEntry" id="userName_login" minLength="5" type="text" onChange={this.handleUsernameChange} />
                                                <input placeholder="Enter Password" name="passwordEntry" id="userPassword_login" minLength="1" type="password" onChange={this.handlePasswordChange} />
                                            </div>
                                        </div>
                                        <br />
                                    </form>
                                    <div className="row center">
                                        <button className="waves-effect waves-light btn" onClick={this.handleClick}>
                                            <i className="material-icons right">send</i>Login</button>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        }
    }
}

export default User