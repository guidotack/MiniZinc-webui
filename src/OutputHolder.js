import React from 'react';
import { OutputString } from './Outputs/OutputString';
import { OutputStringToComponent } from './Outputs/Outputs';

export var OutputHolder = React.createClass({
    propTypes: {
        outputs: React.PropTypes.object.isRequired,
        result: React.PropTypes.array.isRequired,
        selectedOutputIndex: React.PropTypes.number.isRequired,
        handleOutputChange: React.PropTypes.func.isRequired
    },

    render: function() {
        // var indexes = [];
        // for (var i = 0; i < this.props.result.length; i++) {
        //     indexes.push(i);
        // }
        //
        // var textResult;
        // var disable = "";
        // if (this.props.result.length > 0) {
        //     var key = Object.keys(this.props.result[0])[0];
        //     textResult = this.props.result[this.props.selectedOutputIndex][key];
        // }
        // else
        // {
        //     textResult = [];
        //     disable = " disabled";
        // }
        //
        // return (
        //     <div className={"OutputHolder" + disable}>
        //         <div className="ModelDisplay">Result</div>
        //         <DropDownBar options={indexes} selectedOption={this.props.selectedOutputIndex.toString()}
        //             handleOptionChange={this.props.handleOutputChange} />
        //         <OutputString result={textResult} />
        //     </div>
        // );

        var allKeys = Object.keys(this.props.outputs);
        var outputs = [];
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            var element = OutputStringToComponent[this.props.outputs[key].component];

            outputs.push(React.createElement(element, {
                result: this.props.outputs[key].value,
                key: key,
                id: key
            }));
        }

        return <div className="OutputHolder">
            {outputs}
        </div>
    }
});
