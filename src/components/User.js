"use strict";
import React from 'react'
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Popper from 'popper.js'
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import UserDispatcher from '../req_dispatcher/user_dispatcher';
import SkillList from './partails/user/skill_list';
import SkillTag from './partails/skill_tag';
import * as ConfigManager from '../config/const.js';
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
        // this.addEndorse = this.addEndorse.bind(this);
    }

    render() {
        if (localStorage.getItem('jwtToken') == null) {
            console.log("jwt Token was null!!!!");
            window.location.replace(ConfigManager.CLIENT_ADDRESS + "/login");
        }
        // if(localStorage.getItem('jwtToken') == null) {
        //     console.log(localStorage.getItem('jwtToken'));

        //     // window.location.replace(ConfigManager.CLIENT_ADDRESS + "/login");
        // }

        const { id, firstName, lastName, jobTitle, PictureUrl, skills, bio, currentID, otherSkills, endorseSkills } = this.state;
        var currentUserLinkValue = ConfigManager.CLIENT_ADDRESS + "/user/" + currentID;
        var isCurrnet;
        if (currentID == id) {
            isCurrnet = true;
        } else {
            isCurrnet = false;
        }
        var hasImage = true;
        if (PictureUrl == null) {
            hasImage = false;
        }
        return (
            <React.Fragment>
                <div id="main-div">
                    <JoboonjaNavBar currentUserLink={currentUserLinkValue}></JoboonjaNavBar>
                    <div className="bg-light-blue" id="div-bg-blue-light-small"></div>

                    <div className="container d-flex flex-column mb-5">
                        <div className="d-flex flex-column" id="content">

                            <div className="d-flex d-inline-flex">
                                <div className="card p-2 rounded-corners-big border-0 shadow-sm">
                                    <img src={(hasImage) ? PictureUrl : '../assets/pictures/profile/noImage.png'} id="profile-image"
                                        className="rounded-corners-big" alt="" />
                                    <img src="../assets/pictures/profile/ParallelogramBlue.png" id="ParallelogramBlue" className="ParallelogramBlue" alt="" />
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
                                (isCurrnet) ? (
                                    <div className="d-flex flex-row  align-items-baseline">
                                        <h3 className="iranSans mr-3">مهارت ها:</h3>
                                        <div className="card d-flex flex-row bg-white p-1">
                                            <SkillList skills={otherSkills} userId={this.state.id}></SkillList>
                                        </div>
                                    </div>
                                ) : (
                                        <span></span>
                                    )
                            }
                            <div className="align-self-end mt-3" id="project-skill">
                                {skills.map(skill => {
                                    return (
                                        <SkillTag
                                            isLoggedIn={isCurrnet}
                                            hasEndorsed={endorseSkills.indexOf(skill.name) >= 0}
                                            skill={skill}
                                            userId={this.state.id}
                                            currentUserId={this.state.currentID}
                                        ></SkillTag>
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
