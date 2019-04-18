import React from 'react'
import UserDispatcher from '../../req_dispatcher/user_dispatcher';

export default class SkillTag extends React.Component {
    addEndorse(skillName, userId) {
        new UserDispatcher().endorseUser(userId, this.props.currentUserId, skillName)
    }

    deleteSkill(skillName) {
        new UserDispatcher().deleteSkill(this.props.currentUserId, skillName)
    }

    render() {
        const { name, point } = this.props.skill;
        var isReadOnly = (this.props.isReadOnly == true) || this.props.hasEndorsed
        console.log(this.props.isReadOnly);
        console.log(isReadOnly);
        console.log(this.props.isLoggedIn);


        return (
            <div className="d-inline-flex bg-white rounded-corners border-light shadow-sm">
                <div className="m-1 px-1 text-body d-flex flex-row align-items-baseline">
                    {
                        (isReadOnly) ? (
                            <span className="iranSans badge bg-light-blue text-info py-2 px-2  my-0 mr-1"> {point}</span>
                        ) : (this.props.isLoggedIn) ? (
                            <div>
                                <span className="iranSans badge bg-light-blue text-info py-2 px-2  my-0 mr-1"> {point}</span>

                                <button className="btn btn-danger btn-sm mr-1 pb-0 px-1" onClick={() => this.deleteSkill(name)}>
                                    <i className="fas fa-minus"></i>
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-success btn-sm mr-1 pb-0 px-1" onClick={() => this.addEndorse(name, this.props.userId)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        )
                    }
                    <div>
                        {name}
                    </div>
                </div>
            </div>
        );
    }
}
