import React from 'react';

export var InputSelectionButton = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        image: React.PropTypes.string,
        component: React.PropTypes.string,
        defaultValue: React.PropTypes.any,
        handleClick: React.PropTypes.func.isRequired,
        selected: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            image: "question"
        }
    },

    handleClick: function(event) {
        event.stopPropagation();
        this.props.handleClick(this.props.component, this.props.defaultValue, this.props.type, this.props.name);
    },

    render: function() {
        return <div className={"InputButton" + (this.props.selected ? " selected" : "") } onClick={this.handleClick}>
            <div className="InputName">{this.props.name}</div>
            <i className={"fa fa-2x InputImage fa-" + this.props.image}></i>
            <div className="InputType">{this.props.type}</div>
        </div>
    }
});
