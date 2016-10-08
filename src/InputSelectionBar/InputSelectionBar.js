import React from 'react';
import { AllInputs } from '../Inputs/Inputs';
import { InputSelectionButton } from './InputSelectionButton';
import './InputSelectionBar.css';

export var InputSelectionBar = React.createClass({
    propTypes: {
        filterType: React.PropTypes.string,
        handleInputButtonClick: React.PropTypes.func.isRequired,
        handleOutputButtonClick: React.PropTypes.func.isRequired,
        outputs: React.PropTypes.object,
        selectedArgument: React.PropTypes.object,
        developmentMode: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            filterType: ""
        }
    },

    handleInputButtonClick: function(componentName, defaultValue) {
        this.props.handleInputButtonClick(this.props.selectedArgument, componentName, defaultValue);
    },

    handleOutputButtonClick: function(componentName, defaultValue, outputType, outputName) {
        this.props.handleOutputButtonClick(this.props.selectedArgument, componentName, defaultValue, outputName);
    },

    render: function() {
        var inputs = [];
        for (let i = 0; i < AllInputs.length; i++) {
            if (this.props.filterType.length === 0 || AllInputs[i].type === this.props.filterType)
                inputs.push(<InputSelectionButton key={AllInputs[i].name + '-' +  AllInputs[i].type} name={AllInputs[i].name}
                    type={AllInputs[i].type} image={AllInputs[i].image}
                    component={AllInputs[i].component} handleClick={this.handleInputButtonClick}
                    defaultValue={AllInputs[i].defaultValue} />);
        }

        if (inputs.length === 0) {
            inputs.push(<p key="error">{this.props.filterType} has no inputs!</p>)
        }

        var outputs = [];
        var outputNames = Object.keys(this.props.outputs);
        for (let i = 0; i < outputNames.length; i++) {
            if (this.props.filterType.length === 0 || this.props.outputs[outputNames[i]].type === this.props.filterType)
                outputs.push(<InputSelectionButton key={this.props.outputs[outputNames[i]].name} name={outputNames[i]}
                    type={this.props.outputs[outputNames[i]].type}
                    handleClick={this.handleOutputButtonClick}
                    />);
        }

        return <div className={"InputSelectionBar " + (this.props.developmentMode ? '' : 'disabled')} >
            {inputs}
            {outputs}
        </div>
    }
});
