import React from 'react';
import '../fonts/iransans-fonts/fonts.scss';
import '../fonts/flaticont/flaticon.css';
import '../styles/all.css';
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import ProjectDispatcher from '../req_dispatcher/project_dispatcher.js'
import UserDispatcher from '../req_dispatcher/user_dispatcher.js'
export default class Home extends React.Component {
    state = {
        currentID: "",
        projects: [],
        users: []
    };

    componentDidMount() {
        new ProjectDispatcher().getProjects(this);
        new UserDispatcher().gerUsers(this);
    }

    render() {
        const {currentID, projects, users} = this.state;
        var currentUserLinkValue = "http://localhost:3000/user/" + currentID;
        return(
            <div>
                <JoboonjaNavBar currentUserLink={currentUserLinkValue}></JoboonjaNavBar>
                <div className="bg-light-blue" id="div-bg-blue-light"></div>

                <div className="container d-flex flex-column mb-5">
                    <div className="d-flex flex-column rounded-corners">
                        <div className="mt-4 d-flex flex-column">
                            <h1 className="iranSans dark-blue">جاب‌اونجا خوب است!</h1>
                            <p className="iranSans p-indented-2 text-body font-weight-light">
                                لوازم ایپسوم متن ساختگی با سادگی نا مفهوم از صنعت چاپ وب با
                            </p>
                            <div className="d-flex flex-row bg-light dark-blue w-65 align-self-center shadow" id="border_bottom_style">
                                <p
                                    className="iranSans my-2 ml-2 text-muted font-weight-light flex-grow-1 align-self-center font-size-big">
                                    جستجو در جاب‌اونجا
                                </p>
                                <div className="m-1 p-2 bg-dark-blue text-white iranSans">جستجو</div>
                            </div>

                        </div>
                        <div className="d-flex flex-row mt-4">
                            <div className="d-flex flex-column w-25">
                                <div className="bg-white rounded-corners shadow d-flex flex-row align-items-center mb-2">
                                    <div className="m-1 bg-light w-100">
                                        <p className="iranSans my-2 ml-3 text-muted">جستجو نام کاربر</p>
                                    </div>
                                </div>
                                {users.map(user =>
                                    {
                                        const {id, firstName, lastName, jobTitle, PictureUrl} = user;
                                        var hasImage = true;
                                        if(PictureUrl == null) {
                                            hasImage = false;
                                        }
                                        return(
                                            <a href={"http://localhost:3000/user/" + id}>
                                                <div className="bg-white rounded-corners shadow d-flex flex-row align-items-center mb-1">
                                                    <img src={(hasImage)?PictureUrl:'../assets/pictures/profile/noImage.png'}
                                                        className="home-sidebard-img m-2 rounded-corners" />
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <p className="iranSans text-body mb-0">{firstName + " " + lastName}</p>
                                                        <p className="iranSans text-muted mb-0 mt-1">{jobTitle}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    }
                                )}
                            </div>
                            <div className="d-flex flex-column w-75 ml-4">
                                {projects.map(project =>
                                    {
                                        const {id,title, description, imageUrl, budget, skills, deadline, winner} = project;
                                        var deltaTime = deadline - Date.now();
                                        var deadProject = deltaTime < 0;
                                        var hasImage = true;
                                        if(imageUrl == null) {
                                            hasImage = false;
                                        }
                                        return (
                                            <a href={"http://localhost:3000/project/" + id}>
                                                <div className="bg-white d-flex flex-row rounded-corners mx-2 p-3 shadow">
                                                    <img src={(hasImage)?imageUrl:'../assets/pictures/project/profile1.png'}
                                                        className="img-fluid border rounded-corners home-list-project-img"/>
                                                    <div className="d-flex flex-column w-100 px-3 pt-2">
                                                        <div className="d-flex flex-row w-100 align-items-start mb-1">
                                                            <h5 className="iranSans mr-auto">{title}</h5>
                                                            {
                                                                deadProject?(
                                                                    <div className="bg-info rounded-corners px-1">
                                                                        <p className="iranSans text-light font-size-small mb-0">مهلت تمام شده</p>
                                                                    </div>
                                                                ):(
                                                                    <div className="bg-light rounded-corners px-1">
                                                                        <p className="iranSans text-muted font-size-small mb-0">زمان باقی مانده:{convertMiliSecToDate(deltaTime)} </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="iranSans font-weight-light font-size-description mb-1">
                                                            {description}
                                                        </div>
                                                        <div className="iranSans text-info font-weight-bold mb-1">بودجه: {budget} تومن</div>
                                                        <div className="d-flex flex-row align-items-center font-size-small">
                                                            <div className="iranSans text-muted bo">مهارت ها:</div>
                                                            {skills.map(skill=>
                                                                {
                                                                    const{name} = skill;
                                                                    return(
                                                                        <div className="bg-light rounded-corners border p-1 ml-2">
                                                                            <p className="iranSans text-muted font-weight-bold mb-0">{name}</p>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    }
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>

            <Footer></Footer>
        </div>
    );
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
