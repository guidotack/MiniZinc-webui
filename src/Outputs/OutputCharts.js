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
                  } else { //if onyl 1d array
                      chart_data.push([i,current_element]);
                  }

                }

                //var currentResultVar = [];
                //console.log(currentResultVar)
            }
        }

        return <div className="Output Scatter_Plot Chart">
            <div className="container">
                <div className="name">Scatter Plot {this.props.id}</div>
            </div>
            <div className="parameters">
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["resultType"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose variable" />
            <DropDownBar name={"resultNum"} options={Object.keys(this.props.result)}
                selectedOption={this.props.selectedParameters["resultNum"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose solution"/>
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart chartType="ScatterChart" data={chart_data} options={{}} graph_id="ScatterChart"  width={"600px"} height={"500px"}  legend_toggle={true} />
        </div></div>
    }
});

export var OutputGanttChart = React.createClass({
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
        var chart_rows = [['2014Spring', 'Spring 2014', 'spring',new Date(2014, 2, 22), null, 5000, 100, null]];
        var chart_columns = [
          {"id":"Task ID","type":"string"},
          {"id":"Task Name","type":"string"},
          {"id":"Machine","type":"string"},
          {"id":"Start Date","type":"date"},
          {"id":"End Date","type":"date"},
          {"id":"Duration","type":"number"},
          {"id":"Percent Complete","type":"number"},
          {"id":"Dependencies","type":"string"}
        ];
        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) { //This solution & variable exist
            var currentResultNumber = this.props.selectedParameters['resultNum'] == null ? this.props.result.length - 1 :
                this.props.selectedParameters['resultNum'];
            var currentResult = this.props.result[currentResultNumber];
                console.log(this.props.selectedParameters['resultType'])

            if (currentResult != null) {
                var i = 0
                var currentResultVar = currentResult[this.props.selectedParameters['resultType']]
                //console.log(currentResultVar)
                chart_rows = []
                for (i; i < currentResultVar.length; ++i) {
                  var current_element = currentResultVar[i];
                  if (current_element.constructor === Array) {
                      chart_rows.push(current_element);
                  } else { //if onyl 1d array
                      chart_rows.push([i,current_element]);
                  }

                }

                //var currentResultVar = [];
                //console.log(currentResultVar)
            }
        }

        return <div className="Output Gantt_Chart Chart">
            <div className="container">
                <div className="name">Gantt Chart {this.props.id}</div>
            </div>
            <div className="parameters">
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["machines"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose machines by job/task" />
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["duration"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose duration by job/task" />
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["task_start"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose start by job/task" />
            <DropDownBar name={"resultNum"} options={Object.keys(this.props.result)}
                selectedOption={this.props.selectedParameters["resultNum"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose solution"/>
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart chartType="Gantt" rows={chart_rows} columns={chart_columns} options={{}} graph_id="Gantt"  width={"600px"} height={"500px"}  legend_toggle={true} />
        </div></div>
    }
});
