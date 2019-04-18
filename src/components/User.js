"use strict";
import React from 'react'
import '../fonts/iransans-fonts/fonts.scss';
import '../fonts/flaticont/flaticon.css';
import '../styles/all.css';
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Popper from 'popper.js'
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import ProjectDispatcher from '../req_dispatcher/user_dispatcher'
import UserDispatcher from '../req_dispatcher/user_dispatcher';
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
    addEndorse(skillName) {
        new UserDispatcher().endorseUser(this.state.id, this.state.currentID, skillName)
    }
    addSkill(skillName) {
        new UserDispatcher().addSkill(this.state.id, skillName)
    }
    render() {
        const {id, firstName, lastName, jobTitle, PictureUrl, skills, bio, currentID, otherSkills, endorseSkills} = this.state;
        var currentUserLinkValue = "http://localhost:3000/user/" + currentID;
        var isCurrnet;
        if(currentID == id) {
            isCurrnet = true;
        } else {
            isCurrnet = false;
        }
        var hasImage = true;
        if(PictureUrl == null) {
            hasImage = false;
        }
        return (
            <React.Fragment>
                <div id="main-div">
                    <JoboonjaNavBar currentUserLink={currentUserLinkValue}></JoboonjaNavBar>
                    <div className="bg-light-blue" id="div-bg-blue-light"></div>

                    <div className="container d-flex flex-column mb-5">
                        <div className="d-flex flex-column" id="content">

                            <div className="d-flex d-inline-flex">
                                <div className="card p-2 rounded-corners-big border-0 shadow-sm">
                                    <img src={(hasImage)?PictureUrl:'../assets/pictures/profile/noImage.png'} id="profile-image"
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

                    <Footer></Footer>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        var currentURL = window.location.href;
        var splitURL = currentURL.split("/");
        var userID = splitURL[splitURL.length - 1];
        new UserDispatcher().getUser(userID, this);
    }
}
