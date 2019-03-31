import React from 'react'
import axios from 'axios';
import '../fonts/iransans-fonts/fonts.scss';
import '../fonts/flaticont/flaticon.css';
import '../styles/all.css';
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Popper from 'popper.js'
// require("font-awesome")
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
require("bootstrap");
export default class User extends React.Component {
    state = {
        id: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        PictureUrl: "",
        skills: [],
        bio: "",
        currentID: "",
        otherSkills: [],
        endorseSkills: []
    };
    constructor() {
        super();
        this.addSkill = this.addSkill.bind(this);
        this.addEndorse = this.addEndorse.bind(this);
    }
    addEndorse(name) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/Proj_IE/addEndorse?userId=' + this.state.id + '&currentUserId=' + this.state.currentID + '&skillName=' + name
        })
        .then(function(response) {
            // alert(response);
            window.location.reload();
        })
        .catch(function(response) {
            // alert(response);
        })
    }
    addSkill(name) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/Proj_IE/addSkillUser?user=' + this.state.id + '&skill=' + name
        })
        .then(function(response) {
            alert(response);
            window.location.reload();
        })
        .catch(function(response) {
            // alert(response);
        })
    }
    render() {
        const {id, firstName, lastName, jobTitle, PictureUrl, skills, bio, currentID, otherSkills, endorseSkills} = this.state;
        var isCurrnet;
        if(currentID == id) {
            isCurrnet = true;
        } else {
            isCurrnet = false;
        }
        return (
            <React.Fragment>
                <div id="main-div">
                    <nav className="sticky-top navbar-light shadow-sm pt-1">
                        <div className="d-flex flex-row container">
                            <div className="justify-content-start">
                                <a className="" href="#">
                                    <img src="../assets/logo/logo v1.png" className="navbar-item" alt=""/>
                                </a>
                            </div>
                            <div className="justify-content-end d-inline-flex align-items-center ml-auto">
                                <a className="nav-link iranSans text-body" href="#">
                                    حساب کاربری
                                </a>
                                <a className="nav-link iranSans text-body" href="#">
                                    خروج
                                </a>
                            </div>

                        </div>
                    </nav>
                    <div className="bg-light-blue" id="div-bg-blue-light"></div>

                    <div className="container d-flex flex-column mb-5">
                        <div className="d-flex flex-column" id="content">

                            <div className="d-flex d-inline-flex">
                                <div className="card p-2 rounded-corners-big border-0 shadow-sm">
                                    <img src={'' + PictureUrl} id="profile-image"
                                        className="rounded-corners-big" alt=""/>
                                    <img src="../assets/pictures/profile/ParallelogramBlue.png" id="ParallelogramBlue" className="ParallelogramBlue" alt=""/>
                                </div>
                                <div className="d-flex flex-column-reverse ml-3">
                                    <p className="iranSans text-muted mb-2">
                                        {jobTitle}
                                    </p>
                                    <h2 className="iranSans text-dark">
                                        {firstName} {lastName}
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4">
                                    <p className="iranSans font-weight-light profile-description">
                                        {bio}
                                    </p>
                                </div>
                            </div>
                            {
                                (isCurrnet)?(
                                    <div className="d-flex flex-row  align-items-baseline">
                                        <h3 className="iranSans mr-3">مهارت ها:</h3>
                                        <div className="card d-flex flex-row bg-white p-1">
                                            <div className="dropdown mr-2 border">
                                                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <span className="iranSans pr-5">-- انتخاب مهارت --</span>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {otherSkills.map(otherSkill =>
                                                        {
                                                            const {name, point} = otherSkill;
                                                            return(
                                                                <button className="dropdown-item" onClick={() => this.addSkill(name)}>{name}</button>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>


                                            <button type="button" className="btn btn-info iranSans">افزودن مهارت</button>
                                        </div>
                                    </div>
                                ):(
                                    <span></span>
                                )
                            }
                            <div className="align-self-end mt-3" id="project-skill">
                                {skills.map(skill =>
                                    {
                                        const {name, point} = skill;
                                        return (
                                            <div className="d-inline-flex bg-white rounded-corners border-light shadow-sm">
                                                <div className="m-1 px-1 text-body">
                                                    {
                                                        (isCurrnet || endorseSkills.indexOf(name) >= 0)?(
                                                            <span className="iranSans badge bg-light-blue text-info py-2 px-2  my-0"> {point}</span>
                                                        ):(
                                                            <button className="btn btn-success btn-sm" onClick={() => this.addEndorse(name)}> <i className="fas fa-plus"></i></button>
                                                        )
                                                    }
                                                    {name}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <footer className="text-muted d-flex align-items-center justify-content-center fixed-bottom">
                        <div className="iranSans drop-shadow">&copy; تمامی حقوق این سایت متعلق به
                            جاب‌اونجامی‌باشد
                        </div>
                    </footer>
                </div>
            </React.Fragment>
        );
    }
    getUser(userID){
        axios.get('http://localhost:8080/Proj_IE/user/' + userID)
        .then(
            response =>
            this.setState ({
                id: JSON.parse(response.data.message).id,
                firstName: JSON.parse(response.data.message).firstName,
                lastName: JSON.parse(response.data.message).lastName,
                jobTitle: JSON.parse(response.data.message).jobTitle,
                PictureUrl: JSON.parse(response.data.message).PictureUrl,
                skills: JSON.parse(response.data.message).skills,
                bio: JSON.parse(response.data.message).bio,
                currentID: JSON.parse(response.data.details).currentID,
                otherSkills: JSON.parse(response.data.details).otherSkills,
                endorseSkills: JSON.parse(response.data.details).endorseSkills
            })
        )
        .catch(
            function(error) {
                console.log(error.stack);
            }
        )
    }
    componentDidMount() {
        var currentURL = window.location.href;
        var splitURL = currentURL.split("/");
        var userID = splitURL[splitURL.length - 1];
        this.getUser(userID);
    }
}
