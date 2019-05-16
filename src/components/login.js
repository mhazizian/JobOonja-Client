"use strict";
import React from 'react'
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import AbstractField from '../components/partails/abstractFiled';
import swal from 'sweetalert';
import UserDispatcher from '../req_dispatcher/user_dispatcher';
require("bootstrap");

export default class Login extends React.Component {
    state = {
        username: "",
        pass: "",
    };

    constructor(props) {
        super(props);
        this.SendLoginData = this.SendLoginData.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }

    SendLoginData() {
        new UserDispatcher().loginUser(this.state.username, this.state.pass);
        // swal(":)", "به زودی", "success");
    }

    render() {

        return (
            <div>
                <JoboonjaNavBar currentUserLink={"#"}></JoboonjaNavBar>

                <div className="container d-flex flex-column align-items-center mb-5">
                <div className="d-flex flex-column align-items-center bg-white rounded-corners shadow py-4 w-25" id="content">
                    <div>
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column">
                                <SignUpField placeHolder="نام کاربری" id="username" onChange={this.handleFieldChange}></SignUpField>
                                <SignUpField placeHolder="کلمه عبور" id="pass" onChange={this.handleFieldChange} type="password"></SignUpField>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mx-3 ">
                            <button type="submit" className="btn btn-primary iranSans w-75" onClick={this.SendLoginData} >ورود</button>
                        </div>

                    </div>
                </div>
                </div>

                <Footer></Footer>
            </div>

        );
    }
}



class SignUpField extends AbstractField {
    constructor(props) {
        super(props);
        this.type = (this.props.type) ? this.props.type : "text"
    }

    render() {
        return (
            <div className="mx-3 mb-2 shadow-sm">
                <input type={this.type} className="form-control iranSans" required=""
                    placeholder={this.props.placeHolder}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
