import React from 'react'

export default class MyAbstractField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const text = event.target.value;
        this.props.onChange(this.props.id, text);
    }

    render() {
        return (
            <div>
                <input
                    placeholder={(this.props.placeholder) ? this.props.placeHolder : ""}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}