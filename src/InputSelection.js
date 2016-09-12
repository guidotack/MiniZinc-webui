import React from 'react';
import { AllInputs } from './Inputs'

export var InputSelectionBar = React.createClass({
    propTypes: {
        filterType: React.PropTypes.string,
        handleBarState: React.PropTypes.func,
        handleInputClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            filterType: ""
        }
    },

    render: function() {
        var inputs = [];
        for (var i = 0; i < AllInputs.length; i++) {
            if (this.props.filterType.length === 0 || AllInputs[i].type === this.props.filterType)
                inputs.push(<InputButton key={AllInputs[i].name} name={AllInputs[i].name}
                    type={AllInputs[i].type} image={AllInputs[i].image}
                    component={AllInputs[i].component} handleClick={this.props.handleInputClick}
                    defaultValue={AllInputs[i].defaultValue} />);
        }

        if (inputs.length === 0) {
            inputs.push(<p key="error">{this.props.filterType} has no inputs!</p>)
        }

        return <div className="InputSelectionBar" onMouseEnter={this.props.handleBarState} onMouseLeave={this.props.handleBarState} >
            {inputs}
        </div>
    }
});

var InputButton = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        image: React.PropTypes.string,
        component: React.PropTypes.func.isRequired,
        defaultValue: React.PropTypes.any.isRequired,
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

export default InputSelectionBar;
