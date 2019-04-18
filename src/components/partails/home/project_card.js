import React from 'react'
import TimeConversion from '../../../utils/time_conversion.js'
import SkillTagSimple from './skill_tag_simple.js';

export default class ProjectCard extends React.Component {
    render() {
        var project = this.props.project;
        const { id, title, description, imageUrl, budget, skills, deadline, winner } = project;
        var deltaTime = deadline - Date.now();
        var deadProject = deltaTime < 0;
        var hasImage = true;
        if (imageUrl == null) {
            hasImage = false;
        }
        return (

            <div className="bg-white d-flex flex-row rounded-corners mx-2 p-3 mb-3 shadow-sm">
                <img src={(hasImage) ? imageUrl : '../assets/pictures/project/profile1.png'}
                    className="img-fluid border rounded-corners home-list-project-img" />
                <div className="d-flex flex-column w-100 px-3 pt-2">
                    <div className="d-flex flex-row w-100 align-items-start mb-1">
                        <a href={"http://localhost:3000/project/" + id} className="mr-auto text-body">
                            <h5 className="iranSans">{title}</h5>
                        </a>
                        {
                            // TODO: make it a component
                            deadProject ? (
                                <div className="bg-info rounded-corners px-1">
                                    <p className="iranSans text-light font-size-small mb-0">مهلت تمام شده</p>
                                </div>
                            ) : (
                                    <div className="bg-light rounded-corners px-1">
                                        <p className="iranSans text-muted font-size-small mb-0">زمان باقی مانده:{new TimeConversion().miliSecToPersionDate(deltaTime)} </p>
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
                        {skills.map(skill => {
                            return (
                                <SkillTagSimple skill={skill}></SkillTagSimple>
                            );
                        }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
