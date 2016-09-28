// The container that holds inputs and passes the changes back to the parent.

import React from 'react';
import { StringToInput } from './Inputs/Inputs';

export var InputHolder = React.createClass({
    propTypes: {
        handleInputValueChange: React.PropTypes.func.isRequired,
        inputs: React.PropTypes.object.isRequired
    },

    render: function() {
        var allKeys = Object.keys(this.props.inputs);
        var inputs = [];
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            if (this.props.inputs[key].isOutput === false) {
                var element = StringToInput[this.props.inputs[key].component];

                inputs.push(React.createElement(element, {
                    value: this.props.inputs[key].value,
                    onUserInput: this.props.handleInputValueChange,
                    key: key,
                    id: key
                }));
            }
        }

        return <div>
            {inputs}
        </div>
    }
});
