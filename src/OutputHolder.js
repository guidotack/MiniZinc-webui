import React from 'react';
import { OutputStringToComponent } from './Outputs/Outputs';

export var OutputHolder = React.createClass({
    propTypes: {
        outputs: React.PropTypes.object.isRequired,
        result: React.PropTypes.array.isRequired,
        selectedOutputIndex: React.PropTypes.number.isRequired,
        outputArgs: React.PropTypes.array.isRequired,
        setOutputComponentParameter: React.PropTypes.func,
    },

    render: function() {
        var allKeys = Object.keys(this.props.outputs);
        var outputs = [];
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            var element = OutputStringToComponent[this.props.outputs[key].component];

            outputs.push(React.createElement(element, {
                result: this.props.result,
                key: key,
                id: key,
                outputArgs: this.props.outputArgs,
                setOutputComponentParameter: this.props.setOutputComponentParameter,
                selectedParameters: this.props.outputs[key].parameters,
                selectedOutputIndex: this.props.selectedOutputIndex
            }));
        }

        return <div className={"OutputHolder" + (outputs.length > 0 ? "" : " disabled")}>
            {outputs}
        </div>
    }
});
