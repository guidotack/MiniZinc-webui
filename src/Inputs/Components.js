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
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    onChange: function(event) {
        this.props.onUserInput(this.props.id, event.target.value);
    },

    render: function() {
        return (
            <div className="Input TextField">
                <div className="container">
                    <div className="name">{this.props.id}</div>
                </div>
                <TextField onTextChange={this.onChange} value={this.props.value} />
            </div>
        );
    }
});

var TextField = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        onTextChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired
    },

    onChange: function(event) {
        this.props.onTextChange(event, this.props.id);
    },

    render: function() {
        return <input onChange={this.onChange} value={this.props.value} type="text"></input>
    }
});

export var InputMatrix1D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        value: React.PropTypes.array.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    onChange: function(event, id) {
        var currentValue = this.props.value.slice();
        currentValue[id] = event.target.value;
        this.props.onUserInput(this.props.id, currentValue);
    },

    render: function() {
        var boxes = [];
        for (let i = 0; i < 5; i++) {
            boxes.push(<TextField key={i} id={i.toString()} onTextChange={this.onChange} value={this.props.value[i] != null ? this.props.value[i] : 0} />)
        }

        return <div className="Input Matrix">
            <div className="container">
                <div className="name">{this.props.id}</div>
            </div>
            {boxes}
        </div>
    }
});
