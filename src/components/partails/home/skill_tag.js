import React from 'react'

export default class SkillTag extends React.Component {
    render() {
        var skill = this.props.skill;
        const { name } = skill;
        return (
            <div className="bg-light rounded-corners border p-1 ml-2">
                <p className="iranSans text-muted font-weight-bold mb-0">{name}</p>
            </div>
        );
    }
}
