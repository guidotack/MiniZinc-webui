import React from 'react';

export var InputRange = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        value: React.PropTypes.number.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            min: 1,
            max: 10
        }
    },

    onChange: function(event) {
        this.props.onUserInput(this.props.id, parseInt(event.target.value, 10));
    },

    render: function() {
        return (
            <div>
                <div>{this.props.id}</div><p>{this.props.value}</p>
                <input onChange={this.onChange} value={this.props.value} type="range" min={this.props.min} max={this.props.max}></input>
            </div>
        );
    }
});
