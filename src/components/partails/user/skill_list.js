import React from 'react'
import UserDispatcher from '../../../req_dispatcher/user_dispatcher';

export default class SkillList extends React.Component {

    addSkill(skillName, userId) {
        new UserDispatcher().addSkill(userId, skillName)
    }

    render() {
        var skill = this.props.skill;
        var userId = this.props.userId;
        const { name, point } = skill;
        return (
            <button className="dropdown-item" onClick={() => this.addSkill(name, userId)}>
                {name}
            </button>
        );
    }
}
