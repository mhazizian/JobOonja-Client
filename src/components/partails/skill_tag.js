import React from 'react'
import UserDispatcher from '../../req_dispatcher/user_dispatcher';

export default class SkillTag extends React.Component {
    addEndorse(skillName, userId) {
        console.log("asdfasdf");
        
        new UserDispatcher().endorseUser(userId, this.props.currentUserId, skillName)
    }

    render() {
        const { name, point } = this.props.skill;
        var isReadOnly = this.props.isReadOnly || this.props.isLoggedIn || this.props.hasEndorsed
        return (
            <div className="d-inline-flex bg-white rounded-corners border-light shadow-sm">
                <div className="m-1 px-1 text-body">
                    {
                        (isReadOnly) ? (
                            <span className="iranSans badge bg-light-blue text-info py-2 px-2  my-0 mr-1"> {point}</span>
                        ) : (
                                <button className="btn btn-success btn-sm mr-1 pb-0 px-1" onClick={() => this.addEndorse(name, this.props.userId)}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            )
                    }
                    {name}
                </div>
            </div>
        );
    }
}
