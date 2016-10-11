import React from 'react';
import { OutputStringToComponent } from './Outputs/Outputs';
import './Outputs/Output.css';

export var OutputHolder = React.createClass({
    propTypes: {
        inputs: React.PropTypes.object.isRequired,
        outputs: React.PropTypes.object.isRequired,
        result: React.PropTypes.array.isRequired,
        inputArgs: React.PropTypes.array.isRequired,
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
                inputs:this.props.inputs,
                inputArgs: this.props.inputArgs,
                outputArgs: this.props.outputArgs,
                setOutputComponentParameter: this.props.setOutputComponentParameter,
                selectedParameters: this.props.outputs[key].parameters,
            }));
        }

        return <div className={"OutputHolder" + (outputs.length > 0 ? "" : " disabled")}>
            {outputs}
        </div>
    }
});
