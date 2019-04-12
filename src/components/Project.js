import React from 'react'
import axios from 'axios';
import '../fonts/iransans-fonts/fonts.scss';
import '../fonts/flaticont/flaticon.css';
import '../styles/all.css';
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';

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
    handleChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }
    sendAmountBid() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/Proj_IE/bid?bidAmount=' + this.state.bidMount + '&projectId=' + this.state.id
        })
        .then(function(response) {
            // alert(response);
            window.location.reload();
        })
        .catch(function(response) {
            // alert(response);
        })
    }
    render() {
        const {id, title, description, imageUrl, budget, skills, deadline, winner, hasBided, bidMount, currentID} = this.state;
        var deltaTime = deadline - Date.now();
        var deadProject = deltaTime < 0;
        var projectHasBided = hasBided;
        var currentUserLinkValue = "http://localhost:3000/user/" + currentID;
        var hasImage = true;
        if(imageUrl == null) {
            hasImage = false;
        }
        return (
            <React.Fragment>
                <div id="main-div">
                    <JoboonjaNavBar currentUserLink={currentUserLinkValue}></JoboonjaNavBar>
                    <div className="bg-light-blue" id="div-bg-blue-light"></div>

                    <div className="container d-flex flex-column mb-5">
                        <div className="card d-flex flex-column shadow mb-5 rounded-corners" id="content">
                            <div className="d-flex d-inline-flex card-body">
                                <div className="card-body">
                                    <img src={(hasImage)?imageUrl:'../assets/pictures/project/profile1.png'} id="profile-image" className="img-fluid border"
                                        alt=""/>
                                </div>
                                <div className="d-flex flex-column card-body">
                                    <strong>
                                        <div>
                                            <h1 className="iranSans m-0">{title}</h1>
                                        </div>

                                        <div>
                                            {
                                                deadProject?(
                                                    <div>
                                                        <p className="iranSans text-danger mb-0">
                                                            <i className="mr-1 flaticon-deadline"></i>
                                                            مهلت تمام شده است
                                                        </p>
                                                    </div>
                                                ):(
                                                    <p className="iranSans text-muted mb-0">
                                                        <i className="mr-1 flaticon-deadline"></i>
                                                        زمان باقی مانده:
                                                        <span className="unbold-text">
                                                            {convertMiliSecToDate(deltaTime)}
                                                        </span>
                                                    </p>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <p className="iranSans text-info mb-0">
                                                <i className="mr-1 flaticon-money-bag"></i>
                                                {budget}
                                            </p>
                                        </div>
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
                                        {skills.map(skill =>
                                            {
                                                const {name, point} = skill;
                                                return (
                                                    <div className="d-inline-flex bg-white rounded-corners border-light shadow-sm">
                                                        <div className="m-1 px-1 text-body">
                                                            <span className="iranSans badge bg-light-blue text-info py-2 px-2  my-0"> {point}</span>
                                                            {name}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                            {
                                (!projectHasBided && !deadProject)?(
                                    <div className="text-dark bg-white card-body border-top-style2">
                                        <div className="d-flex-row">
                                            <h4 className="iranSans text-body mb-0">
                                                ثبت پیشنهاد
                                            </h4>
                                            <div className="d-flex d-inline-flex my-3">
                                                <div className="input-group mx-2 rounded-corners border-info">
                                                    <input type="text" name="bidMount" className="form-control iranSans text-muted border-blue border-right-0" value={this.state.bidMount} onChange={this.handleChange}
                                                        placeholder="پیشنهاد خود را وارد کنید"/>
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
                                ):(<div></div>)
                            }

                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </React.Fragment>);
        }
        getUser(procjetID){
            axios.get('http://localhost:8080/Proj_IE/project/' + procjetID)
            .then(
                // function (response)
                // {
                    // console.log(response);
                    // var response1 = JSON.parse(response.data.message);
                    // var details = JSON.parse(response.data.details);
                    // alert("ki");
                    response =>
                    this.setState ({
                        id: JSON.parse(response.data.message).id,
                        title: JSON.parse(response.data.message).title,
                        description: JSON.parse(response.data.message).description,
                        imageUrl: JSON.parse(response.data.message).imageUrl,
                        budget: JSON.parse(response.data.message).budget,
                        skills: JSON.parse(response.data.message).skills,
                        deadline: JSON.parse(response.data.message).deadline,
                        winner: JSON.parse(response.data.message).winner,
                        hasBided: JSON.parse(response.data.details).hasBided,
                        currentID : JSON.parse(response.data.details).currentID
                    })
                // }
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
            var procjetID = splitURL[splitURL.length - 1];
            this.getUser(procjetID);
        }
    }
    function convertMiliSecToDate(time) {
        var year = Math.floor(time / (365 * 12 * 60 * 60 * 1000));
        time = time - year * 365 * 12 * 60 * 60 * 1000;
        var month = Math.floor(time / 30 / 12 / 60 / 60 / 1000);
        time = time - month * 30 * 12 * 60 * 60 * 1000;
        var today = Math.floor(time / 12 / 60 / 60 / 1000);
        time = time - today * 12 * 60 * 60 * 1000;
        var hour = Math.floor(time / 60 / 60 / 1000);
        time = time - hour * 60 * 60 * 1000;
        var minute = Math.floor(time / 60 / 1000);
        time = time - minute * 60 * 1000;
        var second = Math.floor(time / 1000);
        if(year != 0) {
            return year + " سال" + month + "ماه " + today + "روز " + hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if(month != 0) {
            return month + "ماه " + today + "روز " + hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if(today != 0) {
            return today + "روز " + hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if(hour != 0) {
            return hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if(minute != 0) {
            return second + "ثانیه";
        }
    }
