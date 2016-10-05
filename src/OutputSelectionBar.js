import React from 'react';
import { AllOutputs } from './Outputs/Outputs';
import { InputSelectionButton } from './InputSelectionBar/InputSelectionButton';

export var OutputSelectionBar = React.createClass({
    propTypes: {
        handleOutputButtonClick: React.PropTypes.func.isRequired,
        developmentMode: React.PropTypes.bool.isRequired
    },

    render: function() {
        var outputs = [];
        for (let i = 0; i < AllOutputs.length; i++) {
            outputs.push(<InputSelectionButton key={AllOutputs[i].name + '-' +  AllOutputs[i].type} name={AllOutputs[i].name}
                type={AllOutputs[i].type} image={AllOutputs[i].image}
                component={AllOutputs[i].component} handleClick={this.props.handleOutputButtonClick} />);
        }

        return <div className={"OutputSelectionBar " + (this.props.developmentMode ? '' : 'disabled')}  onMouseEnter={this.props.handleBarState} onMouseLeave={this.props.handleBarState} >
            {outputs}
        </div>
    }
});
