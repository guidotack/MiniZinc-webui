import React from 'react';
import { AllInputs } from '../Inputs/Inputs';
import { InputSelectionButton } from './InputSelectionButton';

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
                inputs.push(<InputSelectionButton key={AllInputs[i].name} name={AllInputs[i].name}
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
