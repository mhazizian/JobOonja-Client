import React from 'react'
import axios from 'axios';
import '../fonts/iransans-fonts/fonts.scss';
import '../fonts/flaticont/flaticon.css';
import '../styles/all.css';
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';

export default class User extends React.Component {
    state = {
        id: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        PictureUrl: "",
        skills: [],
        bio: ""
    };
    render() {
        const {id, firstName, lastName, jobTitle, PictureUrl, skills, bio} = this.state;
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
                            <div className="d-flex flex-row  align-items-baseline">
                                <h3 className="iranSans mr-3">مهارت ها:</h3>
                                <div className="card d-flex flex-row bg-white p-1">
                                    <div className="dropdown mr-2 border">
                                        <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="iranSans pr-5">-- انتخاب مهارت --</span>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-info iranSans">افزودن مهارت</button>
                                </div>
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
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                jobTitle: response.data.jobTitle,
                PictureUrl: response.data.PictureUrl,
                skills: response.data.skills,
                bio: response.data.bio
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
