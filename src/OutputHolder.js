import React from 'react';
import { DropDownBar } from './DropDownBar';
import { OutputString } from './Outputs/OutputString';

export var OutputHolder = React.createClass({
    propTypes: {
        result: React.PropTypes.array.isRequired,
        selectedOutputIndex: React.PropTypes.number.isRequired,
        handleOutputChange: React.PropTypes.func.isRequired
    },

    render: function() {
        var indexes = [];
        for (var i = 0; i < this.props.result.length; i++) {
            indexes.push(i);
        }

        var textResult;
        var disable = "";
        if (this.props.result.length > 0) {
            var key = Object.keys(this.props.result[0])[0];
            textResult = this.props.result[this.props.selectedOutputIndex][key];
        }
        else
        {
            textResult = [];
            disable = " disabled";
        }

        return (
            <div className={"OutputHolder" + disable}>
                <div className="ModelDisplay">Result</div>
                <DropDownBar options={indexes} selectedOption={this.props.selectedOutputIndex.toString()}
                    handleOptionChange={this.props.handleOutputChange} />
                <OutputString result={textResult} />
            </div>
        );
    }
});
