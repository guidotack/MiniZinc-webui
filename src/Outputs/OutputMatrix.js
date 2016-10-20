import React from 'react';
import { DropDownBar } from '../DropDownBar';

export var OutputMatrix1D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var rows = [];

        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentIndex = this.props.selectedResult == null ? this.props.result.length - 1 :
                this.props.selectedResult;
            var currentRow = this.props.result[currentIndex];

            if (currentRow != null) {
                var filteredCurrentRow = currentRow[this.props.selectedParameters['resultType']];

                for (let i = 0; i < filteredCurrentRow.length; i++) {
                    rows.push(<div key={i} className="row">{filteredCurrentRow[i]}</div>)
                }
            }
        }

        return <div className="1D_Matrix Matrix">
            <div className="parameters">
                <DropDownBar name={"resultType"} options={this.props.outputArgs}
                    selectedOption={this.props.selectedParameters["resultType"] || ""}
                    handleOptionChange={this.setOutputComponentParameter} default_value="Choose variable"/>
            </div>
            {rows}
        </div>
    }
});

export var OutputMatrix2D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var rows = [];

        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentIndex = this.props.selectedResult == null ? this.props.result.length - 1 :
                this.props.selectedResult;
            var currentRow = this.props.result[currentIndex];

            if (currentRow != null) {
                var filteredCurrentRow = currentRow[this.props.selectedParameters['resultType']];
                for (let i = 0; i < filteredCurrentRow.length; i++) {
                    var tmpRow = [];
                    var inner_row = filteredCurrentRow[i]
                    if (inner_row.constructor === Array) {
                      for (let j = 0; j < inner_row.length; j++) {
                          tmpRow.push(<div key={[i,j]} className="row">{inner_row[j]}</div>)
                      }
                    } else { //if only 1D array
                      for (let j = 0; j < inner_row; j++) {
                          tmpRow.push(<div key={[i,j]} className="row">{inner_row[j]}</div>)
                      }
                    }

                    rows.push(<div key={i}>{tmpRow}</div>)
                }
            }
        }

        return <div className="2D_Matrix Matrix">
            <div className="parameters">
                <DropDownBar name={"resultType"} options={this.props.outputArgs}
                    selectedOption={this.props.selectedParameters["resultType"] || ""}
                    handleOptionChange={this.setOutputComponentParameter} default_value="Choose variable"/>
            </div>
            {rows}
        </div>
    }
});
