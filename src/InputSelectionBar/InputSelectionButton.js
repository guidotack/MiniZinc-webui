import React from 'react';

export var InputSelectionButton = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        image: React.PropTypes.string,
        component: React.PropTypes.string,
        defaultValue: React.PropTypes.any,
        handleClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            image: "question"
        }
    },

    handleClick: function() {
        this.props.handleClick(this.props.component, this.props.defaultValue);
    },

    render: function() {
        return <div className="InputButton" onClick={this.handleClick}>
            <div className="InputName">{this.props.name}</div>
            <i className={"fa fa-2x InputImage fa-" + this.props.image}></i>
            <div className="InputType">{this.props.type}</div>
        </div>
    }
});
