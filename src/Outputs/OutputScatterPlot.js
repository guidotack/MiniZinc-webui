import React from 'react';
import {Chart} from 'react-google-charts'
import { DropDownBar } from '../DropDownBar';

export var OutputScatterPlot = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var chart_data = [['rows','columns'],[0,0]]
        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentResultNumber = this.props.selectedParameters['resultNum'] == null ? this.props.result.length - 1 :
                this.props.selectedParameters['resultNum'];
            var currentResult = this.props.result[currentResultNumber];
                console.log(this.props.selectedParameters['resultType'])

            if (currentResult != null) {
                var i = 0
                chart_data = [['rows','columns']]
                var currentResultVar = currentResult[this.props.selectedParameters['resultType']]
                //console.log(currentResultVar)
                for (i; i < currentResultVar.length; ++i) {
                  var current_element = currentResultVar[i];
                  if (current_element.constructor === Array) {
                      chart_data.push(current_element);
                  } else {
                      chart_data.push([i,current_element]);
                  }

                }

                //var currentResultVar = [];
                //console.log(currentResultVar)
            }
        }

        console.log(chart_data)
        return <div><div className="parameters">
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["resultType"] || ""}
                handleOptionChange={this.setOutputComponentParameter} />
            <DropDownBar name={"resultNum"} options={Object.keys(this.props.result)}
                selectedOption={this.props.selectedParameters["resultNum"] || ""}
                handleOptionChange={this.setOutputComponentParameter} />
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart chartType="ScatterChart" data={chart_data} options={{}} graph_id="ScatterChart"  width={"500px"} height={"400px"}  legend_toggle={true} />
        </div></div>
    }
});
