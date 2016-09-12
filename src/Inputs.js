import React from 'react';

export var InputRange = React.createClass({
    propTypes: {
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        input: React.PropTypes.number.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            min: 1,
            max: 10
        }
    },

    onChange: function(event) {
        this.props.onUserInput(event);
    },

    render: function() {
        return (
            <div>
                <input onChange={this.onChange} value={this.props.input} type="range" min={this.props.min} max={this.props.max}></input>
                <p>{this.props.input}</p>
            </div>
        );
    }
});

export const AllInputs = [
    { name: "Slider", type: "int", image: "sliders", component: InputRange, defaultValue: 1 }
]
