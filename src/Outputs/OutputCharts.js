import React from 'react';
import {Chart} from 'react-google-charts'
import { DropDownBar } from '../DropDownBar';

export var OutputScatterPlot = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        layout: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
        setSelectedResult: React.PropTypes.func,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    chartEvents: [
      {
          eventName: 'select',
          callback: function(chart) {
              if (chart.props.worksAcrossSolutions) {
                  var sel = chart.chart.getSelection();
                  if (sel.length > 0) {
                      chart.props.setSelectedResult(""+sel[0].row);
                  }
              }
          }
      }  
    ],

    render: function() {
        var chart_data = [['rows','columns'],[0,0]];
        var worksAcrossSolutions = undefined;
        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentResultNumber = this.props.selectedResult == null ? this.props.result.length - 1 :
                this.props.selectedResult;
            var currentResult = this.props.result[currentResultNumber];
                console.log(this.props.selectedParameters['resultType'])
            if (currentResult != null && currentResult !== undefined) {
                chart_data = [['rows','columns']];
                var currentResultVar = currentResult[this.props.selectedParameters['resultType']]
                if (currentResultVar.constructor === Array) {
                  worksAcrossSolutions = false;
                  for (let i = 0; i < currentResultVar.length; ++i) {
                    var current_element = currentResultVar[i];
                    if (current_element.constructor === Array) {
                        chart_data.push(current_element);
                    } else { //if onyl 1d array
                        chart_data.push([i+1,current_element]);
                    }

                  }
                } else {
                  worksAcrossSolutions = true;
                  for (let i = 0; i< this.props.result.length; ++i) {
                    var newobj = [i+1, this.props.result[i][this.props.selectedParameters['resultType']]];
                    chart_data.push(newobj);
                  }
                }

                //var currentResultVar = [];
                //console.log(currentResultVar)
            }
        }

        var chartHeight = 300;
        var chartWidth  = 600;
        
        var layout = {};
        for (let i = 0; i < this.props.layout.length; ++i) {
            layout[this.props.layout[i].i] = {w:this.props.layout[i].w, h:this.props.layout[i].h};
        }
        if (this.props.id in layout) {
            chartHeight = 160*layout[this.props.id].h - 100;
            chartWidth  = "95%";
        }

		var chartOptions = { legend: 'none' };

        return <div className="Output Scatter_Plot Chart">
            <div className="container dragHandle">
                <div className="name">Scatter Plot {this.props.id}</div>
            </div>
            <div className="parameters">
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["resultType"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose variable" />
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart {...this.props} worksAcrossSolutions={worksAcrossSolutions} chartType="ScatterChart" data={chart_data} graph_id={"ScatterChart"+this.props.id}
			width={chartWidth} height={chartHeight} legend_toggle={false} options={chartOptions}
                   chartEvents={this.chartEvents}
                    />
        </div></div>
    }
});

export var OutputLineChart = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        layout: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
        setSelectedResult: React.PropTypes.func,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    chartEvents: [
      {
          eventName: 'select',
          callback: function(chart) {
              if (chart.props.worksAcrossSolutions) {
                  var sel = chart.chart.getSelection();
                  if (sel.length > 0) {
                      chart.props.setSelectedResult(""+sel[0].row);
                  }
              }
          }
      }  
    ],

    render: function() {
        var chart_data = [['rows','columns'],[0,0]];
        var worksAcrossSolutions = undefined;
        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentResultNumber = this.props.selectedResult == null ? this.props.result.length - 1 :
                this.props.selectedResult;
            var currentResult = this.props.result[currentResultNumber];
                console.log(this.props.selectedParameters['resultType'])
            if (currentResult != null && currentResult !== undefined) {
                chart_data = [['rows','columns']];
                var currentResultVar = currentResult[this.props.selectedParameters['resultType']]
                if (currentResultVar.constructor === Array) {
                  worksAcrossSolutions = false;
                  for (let i = 0; i < currentResultVar.length; ++i) {
                    var current_element = currentResultVar[i];
                    if (current_element.constructor === Array) {
                        chart_data.push(current_element);
                    } else { //if onyl 1d array
                        chart_data.push([i+1,current_element]);
                    }

                  }
                } else {
                  worksAcrossSolutions = true;
                  for (let i = 0; i< this.props.result.length; ++i) {
                    var newobj = [i+1, this.props.result[i][this.props.selectedParameters['resultType']]];
                    chart_data.push(newobj);
                  }
                }

                //var currentResultVar = [];
                //console.log(currentResultVar)
            }
        }

        var chartHeight = 300;
        var chartWidth  = 600;
        
        var layout = {};
        for (let i = 0; i < this.props.layout.length; ++i) {
            layout[this.props.layout[i].i] = {w:this.props.layout[i].w, h:this.props.layout[i].h};
        }
        if (this.props.id in layout) {
            chartHeight = 160*layout[this.props.id].h - 100;
            chartWidth  = "95%";
        }

		var chartOptions = { legend: 'none' };

        return <div className="Output Line_Plot Chart">
            <div className="container dragHandle">
                <div className="name">Line Chart {this.props.id}</div>
            </div>
            <div className="parameters">
            <DropDownBar name={"resultType"} options={this.props.outputArgs}
                selectedOption={this.props.selectedParameters["resultType"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose variable" />
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart {...this.props} worksAcrossSolutions={worksAcrossSolutions} chartType="LineChart" data={chart_data} graph_id={"ScatterChart"+this.props.id}
			width={chartWidth} height={chartHeight} legend_toggle={false} options={chartOptions}
                   chartEvents={this.chartEvents}
                    />
        </div></div>
    }
});

export var OutputGanttChart = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        inputs: React.PropTypes.object,
        result: React.PropTypes.array,
        layout: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
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
            var currentResultNumber = this.props.selectedResult == null ? this.props.result.length - 1 :
                this.props.selectedResult;
            var currentResult = this.props.result[currentResultNumber];

            console.log("Construct Gantt chart", currentResult);

            if (currentResult != null) {
                //console.log(currentResult);
                //var duration = [[1,2],[3,4]];
                //var machines = [[1,2],[2,1]];

                function inputOrOutput(varName,inputValues,currentResult,argName) {
                  var result;
                  if(argName[varName] in inputValues) {
                      result = inputValues[argName[varName]].value;
                  } else {
                      result = currentResult[argName[varName]];
                  }
                  //console.log(result);
                  return result;
                }
                // How to use inputs:
                var machines = inputOrOutput('machines',this.props.inputs,currentResult,this.props.selectedParameters);

                var duration = inputOrOutput('duration',this.props.inputs,currentResult,this.props.selectedParameters);
                var task_start = inputOrOutput('task_start',this.props.inputs,currentResult,this.props.selectedParameters);
                // or something like that LOL

                //var machines = currentResult[this.props.selectedParameters['machines']];
                //var duration = currentResult[this.props.selectedParameters['duration']];

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

        console.log("Gantt chart rows", chart_rows);

        var chartHeight = 300;
        var chartWidth  = 600;
        
        var layout = {};
        for (let i = 0; i < this.props.layout.length; ++i) {
            layout[this.props.layout[i].i] = {w:this.props.layout[i].w, h:this.props.layout[i].h};
        }
        if (this.props.id in layout) {
            chartHeight = 160*layout[this.props.id].h - 100;
            chartWidth  = "95%";
        }

        return <div className="Output Gantt_Chart Chart">
            <div className="container dragHandle">
                <div className="name">Gantt Chart {this.props.id}</div>
            </div>
            <div className="parameters">
            <DropDownBar name={"machines"} options={this.props.inputArgs.concat(this.props.outputArgs)} //LINK TO INPUT VARIABLE
                selectedOption={this.props.selectedParameters["machines"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose machines by job/task" />
            <DropDownBar name={"duration"} options={this.props.inputArgs.concat(this.props.outputArgs)} //LINK TO INPUT VARIABLE
                selectedOption={this.props.selectedParameters["duration"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose duration by job/task" />
            <DropDownBar name={"task_start"} options={this.props.inputArgs.concat(this.props.outputArgs)}
                selectedOption={this.props.selectedParameters["task_start"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose start by job/task" />
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart chartType="Gantt" rows={chart_rows} columns={chart_columns} options={{}} graph_id={"Gantt"+this.props.id}  width={chartWidth} height={chartHeight}  legend_toggle={true} />
        </div></div>
    }
});

export var OutputTimelineChart = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        inputs: React.PropTypes.object,
        result: React.PropTypes.array,
        layout: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
        outputArgs: React.PropTypes.array,
        setOutputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    setOutputComponentParameter: function(parameter, parameterName) {
        this.props.setOutputComponentParameter(this.props.id, parameterName, parameter);
    },

    render: function() {
        var chart_rows = [[null,null,null,null]];
        var chart_columns = [
          {"id":"Machine","type":"string"},
          {"id":"Task Name","type":"string"},
          {"id":"Start Date","type":"date"},
          {"id":"End Date","type":"date"}
        ];
        if (this.props.result != null && this.props.selectedParameters['machines'] != null && this.props.selectedParameters['duration'] != null && this.props.selectedParameters['task_start'] != null ) { //This solution & variable exist
            var currentResultNumber = this.props.selectedResult == null ? this.props.result.length - 1 :
                this.props.selectedResult;
            var currentResult = this.props.result[currentResultNumber];

            if (currentResult != null) {
                //console.log(currentResult);
                //var duration = [[1,2],[3,4]];
                //var machines = [[1,2],[2,1]];

                function inputOrOutput(varName,inputValues,currentResult,argName) {
                  var result;
                  if(argName[varName] in inputValues) {
                      result = inputValues[argName[varName]].value;
                  } else {
                      result = currentResult[argName[varName]];
                  }
                  //console.log(result);
                  return result;
                }
                // How to use inputs:
                var machines = inputOrOutput('machines',this.props.inputs,currentResult,this.props.selectedParameters);

                var duration = inputOrOutput('duration',this.props.inputs,currentResult,this.props.selectedParameters);
                var task_start = inputOrOutput('task_start',this.props.inputs,currentResult,this.props.selectedParameters);
                // or something like that LOL

                //var machines = currentResult[this.props.selectedParameters['machines']];
                //var duration = currentResult[this.props.selectedParameters['duration']];

                //console.log(currentResultVar)
                chart_rows = [];
                for (let job = 0; job < machines.length; ++job) {
                  var current_row = machines[job];
                  for (let task = 0; task < current_row.length; ++task) {
                      var startDate = new Date(task_start[job][task]*1000*60);
                      var endDate = new Date(startDate.getTime()+duration[job][task]*1000*60);
                      chart_rows.push([String(machines[job][task]), 'Job ' + job + ' Task ' + task, startDate, endDate]);
                  }


                }

                //var currentResultVar = [];
                //console.log(currentResultVar)
            }
        }

        chart_rows.sort(function(a,b) { return a[0]-b[0]; });

        var chartHeight = 300;
        var chartWidth  = 600;
        
        var layout = {};
        for (let i = 0; i < this.props.layout.length; ++i) {
            layout[this.props.layout[i].i] = {w:this.props.layout[i].w, h:this.props.layout[i].h};
        }
        if (this.props.id in layout) {
            chartHeight = 160*layout[this.props.id].h - 100;
            chartWidth  = "95%";
        }

        return <div className="Output Timeline_Chart Chart">
            <div className="container dragHandle">
                <div className="name">Timeline {this.props.id}</div>
            </div>
            <div className="parameters">
            <DropDownBar name={"machines"} options={this.props.inputArgs.concat(this.props.outputArgs)} //LINK TO INPUT VARIABLE
                selectedOption={this.props.selectedParameters["machines"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose machines by job/task" />
            <DropDownBar name={"duration"} options={this.props.inputArgs.concat(this.props.outputArgs)} //LINK TO INPUT VARIABLE
                selectedOption={this.props.selectedParameters["duration"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose duration by job/task" />
            <DropDownBar name={"task_start"} options={this.props.inputArgs.concat(this.props.outputArgs)}
                selectedOption={this.props.selectedParameters["task_start"] || ""}
                handleOptionChange={this.setOutputComponentParameter} default_value="Choose start by job/task" />
        </div>
        <div className={"my-pretty-chart-container"}>
            <Chart chartPackages={['corechart', 'timeline']} chartType="Timeline" rows={chart_rows} columns={chart_columns} options={{}} graph_id={"Timeline"+this.props.id}  width={chartWidth} height={chartHeight}  legend_toggle={true} />
        </div></div>
    }
});
