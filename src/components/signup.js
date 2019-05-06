"use strict";
import React from 'react'
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import AbstractField from '../components/partails/abstractFiled';
import swal from 'sweetalert';

require("bootstrap");

export default class SignUp extends React.Component {
    state = {
        name: "",
        family_name: "",
        username: "",
        pass: "",
        pass_re: "",
        job_title: "",
        profile_link: "",
        about_me: "",
    };

    constructor(props) {
        super(props);
        this.SendSignupData = this.SendSignupData.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    handleFieldChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }

    SendSignupData() {
        if (this.state.pass != this.state.pass_re) {
            swal("خطا!", "تکرار پسورد تطابق ندارد", "error");
        } else {
            swal("تبریک", "به زودی ثبت نام میشید...", "success");
        }
    }

    render() {

        return (
            <div>
                <JoboonjaNavBar currentUserLink={"#"}></JoboonjaNavBar>

                <div className="container mb-5">
                    <div className="card shadow" id="content">
                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column w-50">

                                    <SignUpField placeHolder="نام" id="name" onChange={this.handleFieldChange}></SignUpField>
                                    <SignUpField placeHolder="نام خانوادگی" id="family_name" onChange={this.handleFieldChange}></SignUpField>
                                    <SignUpField placeHolder="نام کاربری" id="username" onChange={this.handleFieldChange}></SignUpField>
                                    <SignUpField placeHolder="کلمه عبور" id="pass" onChange={this.handleFieldChange} type="password"></SignUpField>
                                    <SignUpField placeHolder="تکرا کلمه عبور" id="pass_re" onChange={this.handleFieldChange} type="password"></SignUpField>
                                    <SignUpField placeHolder="عنوان شغلی" id="job_title" onChange={this.handleFieldChange}></SignUpField>
                                    <SignUpField placeHolder="لینک عکس پروفایل" id="profile_link" onChange={this.handleFieldChange}></SignUpField>

                                    <SignUpFieldTextArea placeHolder="درباره من ..." id="about_me" onChange={this.handleFieldChange}></SignUpFieldTextArea>
                                </div>
                                <div className="w-50 mb-4 d-flex align-items-center justify-content-center">
                                    <div className="fling-minislide shadow border rounded-corners">
                                        <img src="../assets/pictures/slide-show/ahrargroup-1504.JPG" alt="" />
                                        <img src="../assets/pictures/slide-show/ahrargroup-1577.jpeg" alt="" />
                                        <img src="../assets/pictures/slide-show/ahrargroup-1577.jpeg" alt="" />
                                        <img src="../assets/pictures/slide-show/ahrargroup-1578.jpeg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mx-3 ">
                                <button type="submit" className="btn btn-primary iranSans w-75"onClick={this.SendSignupData} >ثبت</button>
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

class SignUpFieldTextArea extends AbstractField {
    render() {
        return (
            <div className="mx-3 mb-2 shadow-sm">
                <textarea name="comment" form="reg-form" rows="4" className="form-control iranSans"
                    placeholder={this.props.placeHolder} onChange={this.handleChange}></textarea>
            </div>
        );
    }
}
