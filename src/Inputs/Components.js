import React from 'react';
import './Input.css';

export var InputRange = React.createClass({ //slider
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
            max: 15
        }
    },

    onChange: function(event) {
        this.props.onUserInput(this.props.id, parseInt(event.target.value, 10));
    },

    render: function() {
        return (
            <div className="Input Range">
                <div className="container">
                    <div className="name">{this.props.id}</div>
                    <div className="value">{this.props.value}</div>
                </div>
                <input onChange={this.onChange} value={this.props.value} type="range" min={this.props.min} max={this.props.max}></input>
            </div>
        );
    }
});

export var InputTextField = React.createClass({ //text Field
    propTypes: {
        id: React.PropTypes.string.isRequired,
        value: React.PropTypes.number.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    onChange: function(event) {
        this.props.onUserInput(this.props.id, parseInt(event.target.value, 10));
    },

    render: function() {
        return (
            <div className="Input TextField">
                <div className="container">
                    <div className="name">{this.props.id}</div>
                </div>
                <input onChange={this.onChange} value={this.props.value} type="text"></input>
            </div>
        );
    }
});
