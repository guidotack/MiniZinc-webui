import React from 'react';
import { AllInputs } from '../Inputs/Inputs';
import { InputSelectionButton } from './InputSelectionButton';
import './InputSelectionBar.css';

export var InputSelectionBar = React.createClass({
    propTypes: {
        filterType: React.PropTypes.string,
        handleBarState: React.PropTypes.func,
        handleInputButtonClick: React.PropTypes.func.isRequired,
        outputs: React.PropTypes.object
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
                inputs.push(<InputSelectionButton key={AllInputs[i].name} name={AllInputs[i].name}
                    type={AllInputs[i].type} image={AllInputs[i].image}
                    component={AllInputs[i].component} handleClick={this.props.handleInputButtonClick}
                    defaultValue={AllInputs[i].defaultValue} />);
        }

        if (inputs.length === 0) {
            inputs.push(<p key="error">{this.props.filterType} has no inputs!</p>)
        }

        var outputs = [];
        var outputNames = Object.keys(this.props.outputs);
        for (var i = 0; i < outputNames.length; i++) {
            if (this.props.filterType.length === 0 || this.props.outputs[outputNames[i]].type === this.props.filterType)
                outputs.push(<InputSelectionButton key={this.props.outputs[outputNames[i]].name} name={outputNames[i]}
                    type={this.props.outputs[outputNames[i]].type}
                    handleClick={this.props.handleOutputButtonClick}
                    />);
        }

        return <div className="InputSelectionBar" onMouseEnter={this.props.handleBarState} onMouseLeave={this.props.handleBarState} >
            {inputs}
            {outputs}
        </div>
    }
});
