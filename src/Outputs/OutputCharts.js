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
        var chart_data = [['rows','columns'],[0,0]];
        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentResultNumber = this.props.selectedParameters['resultNum'] == null ? this.props.result.length - 1 :
                this.props.selectedParameters['resultNum'];
            var currentResult = this.props.result[currentResultNumber];
                console.log(this.props.selectedParameters['resultType'])

            if (currentResult != null) {
                chart_data = [['rows','columns']];
                var currentResultVar = currentResult[this.props.selectedParameters['resultType']]
                //console.log(currentResultVar)
                for (let i = 0; i < currentResultVar.length; ++i) {
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
        inputs: React.PropTypes.object,
        result: React.PropTypes.array,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var chart_rows = [[null,null,null,null,null,null,null,null]];
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
        if (this.props.result != null && this.props.selectedParameters['machines'] != null && this.props.selectedParameters['duration'] != null && this.props.selectedParameters['task_start'] != null ) { //This solution & variable exist
            var currentResultNumber = this.props.selectedParameters['resultNum'] == null ? this.props.result.length - 1 :
                this.props.selectedParameters['resultNum'];
            var currentResult = this.props.result[currentResultNumber];

            if (currentResult != null) {
                var duration = [[1,2],[3,4]];
                var machines = [[1,2],[2,1]];

                // How to use inputs:
                // this.props.inputs["this.props.selectedParameters["theDropdownNameHere"]].value
                // or something like that LOL

                //var machines = currentResult[this.props.selectedParameters['machines']];
                //var duration = currentResult[this.props.selectedParameters['duration']];
                var task_start = currentResult[this.props.selectedParameters['task_start']];
                //console.log(currentResultVar)
                chart_rows = [];
                for (let job = 0; job < machines.length; ++job) {
                  var current_row = machines[job];
                  for (let task = 0; task < current_row.length; ++task) {
                      var dependency = null;
                      if((task - 1) >= 0) {
                          dependency = job + '.' + (task - 1);
                      }
                      chart_rows.push([job + '.' + task, 'Job ' + job + ' Task ' + task, String(machines[job][task]),new Date(task_start[job][task]*1000), null, duration[job][task]*1000, 100, dependency]);
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
            <DropDownBar name={"machines"} options={this.props.inputArgs} //LINK TO INPUT VARIABLE
                selectedOption={this.props.selectedParameters["machines"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose machines by job/task" />
            <DropDownBar name={"duration"} options={this.props.inputArgs} //LINK TO INPUT VARIABLE
                selectedOption={this.props.selectedParameters["duration"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose duration by job/task" />
            <DropDownBar name={"task_start"} options={this.props.outputArgs}
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
