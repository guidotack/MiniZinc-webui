import React from 'react';
import { DropDownBar } from '../DropDownBar';

export var OutputBox = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        // result: React.PropTypes.oneOfType([
        //     React.PropTypes.string,
        //     React.PropTypes.number
        // ]),
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var item = [];

        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentSol = this.props.result[this.props.selectedParameters['resultNum'] || ""]
            var currentPara = this.props.selectedParameters['resultType'] || "";

            if (currentSol != null && currentPara != null)
                item.push(<div key={1} className="row">{currentSol[currentPara]}</div>)
        }

        return <div className="Output Box">
            <div className="container">
                <div className="name">{this.props.id}</div>
            </div>
            <div className="parameters">
                <DropDownBar name={"resultType"} options={this.props.outputArgs}
                    selectedOption={this.props.selectedParameters["resultType"] || ""}
                    handleOptionChange={this.setOutputComponentParameter} />
                <DropDownBar name={"resultNum"} options={Object.keys(this.props.result)}
                    selectedOption={this.props.selectedParameters["resultNum"] || ""}
                    handleOptionChange={this.setOutputComponentParameter} />
            </div>
            {item}
        </div>
    }
});
