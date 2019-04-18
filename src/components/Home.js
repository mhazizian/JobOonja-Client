import React from 'react';
import '../fonts/iransans-fonts/fonts.scss';
import '../fonts/flaticont/flaticon.css';
import '../styles/bootstrap.min.css';
import '../styles/normilize.css';
import '../styles/app.css';
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';
import ProjectCard from '../components/partails/home/project_card.js'
import ProjectDispatcher from '../req_dispatcher/project_dispatcher.js'
import UserDispatcher from '../req_dispatcher/user_dispatcher.js'
import UserCard from './partails/home/user_card';
export default class Home extends React.Component {
    state = {
        currentID: "",
        projects: [],
        users: []
    };

    componentDidMount() {
        new ProjectDispatcher().getProjects(this);
        new UserDispatcher().getUsers(this);
    }

    render() {
        const { currentID, projects, users } = this.state;
        var currentUserLinkValue = "http://localhost:3000/user/" + currentID;
        return (
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
                                {users.map(user => {
                                    return (
                                        <UserCard user={user}></UserCard>
                                    );
                                }
                                )}
                            </div>
                            <div className="d-flex flex-column w-75 ml-4">
                                {
                                    projects.map(project => {
                                        return (
                                            <ProjectCard project={project}></ProjectCard>
                                        );
                                    })
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
