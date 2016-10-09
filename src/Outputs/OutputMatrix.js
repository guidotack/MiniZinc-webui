import React from 'react';
import { DropDownBar } from '../DropDownBar';

export var OutputMatrix1D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        onUserInput: React.PropTypes.func,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
        selectedOutputIndex: React.PropTypes.number
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var rows = [];

        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentIndex = this.props.result.length - 1;
            var currentRow = this.props.result[currentIndex];

            if (currentRow != null) {
                var filteredCurrentRow = currentRow[this.props.selectedParameters['resultType']];

                for (let i = 0; i < filteredCurrentRow.length; i++) {
                    rows.push(<div key={i} className="row">{filteredCurrentRow[i]}</div>)
                }
            }
        }

        return <div className="Output Matrix">
            <div className="container">
                <div className="name">{this.props.id}</div>
            </div>
            <div className="parameters">
                <DropDownBar name={"resultType"} options={this.props.outputArgs}
                    selectedOption={this.props.selectedParameters["resultType"] != null ? this.props.selectedParameters["resultType"] : ""}
                    handleOptionChange={this.setOutputComponentParameter} />
                <DropDownBar name={"resultNum"} options={Object.keys(this.props.result)}
                    selectedOption={this.props.selectedParameters["resultNum"] != null ? this.props.selectedParameters["resultNum"] : ""}
                    handleOptionChange={this.setOutputComponentParameter} />
            </div>
            <div className="rowContainer">
                {rows}
            </div>
        </div>
    }
});
