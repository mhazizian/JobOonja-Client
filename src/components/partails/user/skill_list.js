import React from 'react'
import UserDispatcher from '../../../req_dispatcher/user_dispatcher';

export default class SkillList extends React.Component {
    state = {
        selectedVal: ""
    }
    constructor(props) {
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
    }

    addSkill(skillName, userId) {
        console.log("here");
        console.log(this.state.selectedVal);

        new UserDispatcher().addSkill(userId, skillName)
    }

    changeHandler(e) {
        this.setState({
            selectedVal: e.target.value
        })
    }

    render() {
        var skills = this.props.skills;
        var userId = this.props.userId;

        return (

            <div className="input-group mb-0 rounded-corners">
                <select value={this.state.selectedVal}
                    className="custom-select iranSans"
                    onChange={this.changeHandler}
                    id="inputGroupSelect01">
                    <option selected className="pr-5">
                        -- انتخاب مهارت --
                    </option>
                    {
                        skills.map(skill => {
                            const { name } = skill;
                            return (
                                <option value={name}>{name}</option>
                            );
                        })
                    }
                </select>
                <button type="button" className="btn btn-info iranSans ml-1" onClick={() => this.addSkill(this.state.selectedVal, userId)}>
                    افزودن مهارت
                </button>
            </div>

        );
    }
}
