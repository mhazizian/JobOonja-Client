"use strict";
import React from 'react'
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import ProjectDispatcher from '../req_dispatcher/project_dispatcher.js'
import TimeConversion from '../utils/time_conversion'
import SkillTag from './partails/skill_tag';
import Utils from '../utils/genreal_utils.js'
import swal from 'sweetalert';
import * as ConfigManager from '../config/const.js';

export default class Project extends React.Component {

    state = {
        id: "",
        title: "",
        description: "",
        imageUrl: "",
        budget: "",
        skills: [],
        deadline: 0,
        winner: "",
        hasBided: false,
        bidMount: null,
        currentID: ""
    };
    constructor() {
        super();
        this.sendAmountBid = this.sendAmountBid.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    sendAmountBid() {
        if (!new Utils().isPositiveInteger(this.state.bidMount)) {
            swal("خطا!", "مقدار وارد شده باید عددی مثبت باشد.", "error");
        } else if (this.state.bidMount > this.state.budget) {
            swal("خطا!", "بودجه درخواستی شما بسیار زیاد است!", "error");
        } else {

            new ProjectDispatcher().sendAmountBid(
                this.state.id,
                this.state.bidMount
            );
        }
    }
    render() {
        if(localStorage.getItem('jwtToken') == null) {
            window.location.replace(ConfigManager.CLIENT_ADDRESS + "/login");
        }
        const { id, title, description, imageUrl, budget, skills, deadline, winner, hasBided, bidMount, currentID } = this.state;
        var deltaTime = deadline - Date.now();
        var deadProject = deltaTime < 0;

        var projectHasBided = hasBided;
        var currentUserLinkValue = ConfigManager.CLIENT_ADDRESS + "/user/" + currentID;
        var hasImage = true;
        if (imageUrl == null) {
            hasImage = false;
        }
        console.log(winner);

        return (
            <React.Fragment>
                <div id="main-div">
                    <JoboonjaNavBar currentUserLink={currentUserLinkValue}></JoboonjaNavBar>
                    <div className="bg-light-blue" id="div-bg-blue-light-small"></div>

                    <div className="container d-flex flex-column mb-5">
                        <div className="card d-flex flex-column shadow mb-5 rounded-corners" id="content">
                            <div className="d-flex d-inline-flex card-body">
                                <div className="card-body">
                                    <img src={(hasImage) ? imageUrl : '../assets/pictures/project/profile1.png'} id="profile-image" className="img-fluid border"
                                        alt="" />
                                </div>
                                <div className="d-flex flex-column card-body">
                                    <strong>
                                        <div>
                                            <h1 className="iranSans m-0">{title}</h1>
                                        </div>

                                        <div className="mt-2">
                                            {
                                                deadProject ? (
                                                    <div>
                                                        <p className="iranSans text-danger mb-0">
                                                            <i className="mr-1 flaticon-deadline"></i>
                                                            مهلت تمام شده است
                                                        </p>
                                                    </div>
                                                ) : (
                                                        <p className="iranSans text-muted mb-0">
                                                            <i className="mr-1 flaticon-deadline"></i>
                                                            زمان باقی مانده:
                                                            <span className="unbold-text ml-1">
                                                                {new TimeConversion().miliSecToPersionDate(deltaTime)}
                                                            </span>
                                                        </p>
                                                    )
                                            }
                                        </div>
                                        <div className="mt-2">
                                            <p className="iranSans text-info mb-0">
                                                <i className="mr-1 flaticon-money-bag"></i>
                                                بودجه: {budget} تومان
                                            </p>
                                        </div>
                                        {
                                            winner ? (
                                                <div>
                                                    <p class="iranSans text-success mb-0">
                                                        <i class="mr-1 flaticon-check-mark"></i>
                                                        برنده : {winner}
                                                    </p>
                                                </div>

                                            ) : (<div></div>)
                                        }
                                        <div>
                                            <h4 className="iranSans my-3">توضیحات</h4>
                                        </div>
                                    </strong>
                                    <div>
                                        <p className="iranSans p-indented projet-description">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-light light-blue card-body border-top-style1">
                                <div className="container d-flex flex-column">
                                    <div className="align-self-start">
                                        <h5 className="iranSans text-info">
                                            <strong>
                                                مهارت ها لازم:
                                            </strong>
                                        </h5>
                                    </div>
                                    <div className="align-self-end mt-3" id="project-skill">
                                        {skills.map(skill => {
                                            return (
                                                <SkillTag
                                                    skill={skill}
                                                    isReadOnly={true}
                                                ></SkillTag>
                                            );
                                        })
                                        }
                                    </div>
                                </div>

                            </div>
                            {
                                (!projectHasBided && !deadProject) ? (
                                    <div className="text-dark bg-white card-body border-top-style2">
                                        <div className="d-flex-row">
                                            <h4 className="iranSans text-body mb-0">
                                                ثبت پیشنهاد
                                            </h4>
                                            <div className="d-flex d-inline-flex my-3">
                                                <div className="input-group mx-2 rounded-corners border-info">
                                                    <input type="text" name="bidMount" className="form-control iranSans text-muted border-blue border-right-0"
                                                        value={this.state.bidMount}
                                                        onChange={this.handleChange}
                                                        placeholder="پیشنهاد خود را وارد کنید" />
                                                    <div className="input-group-append">
                                                        <span
                                                            className="input-group-text  pb-1 bg-white iranSans text-info border-blue border-left-0">
                                                            تومان
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn bg-blue text-white iranSans" onClick={this.sendAmountBid}>ارسال</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div></div>)
                            }

                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </React.Fragment>);
    }

    componentDidMount() {
        var currentURL = window.location.href;
        var splitURL = currentURL.split("/");
        var procjetID = splitURL[splitURL.length - 1];
        new ProjectDispatcher().getProject(procjetID, this)
    }
}
