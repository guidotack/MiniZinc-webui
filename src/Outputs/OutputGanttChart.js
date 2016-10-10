import React from 'react';
import {Chart} from 'react-google-charts'

export var GanttChart = React.createClass({
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
        var rows = [];

        if (this.props.result != null && this.props.selectedParameters['resultType'] != null) {
            var currentIndex = this.props.selectedParameters['resultNum'] == null ? this.props.result.length - 1 :
                this.props.selectedParameters['resultNum'];
            var currentRow = this.props.result[currentIndex];

            if (currentRow != null) {
                var filteredCurrentRow = currentRow[this.props.selectedParameters['resultType']];

                for (let i = 0; i < filteredCurrentRow.length; i++) {
                    rows.push(<div key={i} className="row">{filteredCurrentRow[i]}</div>)
                }
            }
        }

        return <div className={"my-pretty-chart-container"}>
          <Chart chartType="ScatterChart" data={[     ['Age', 'Weight'], [ 8,      12], [ 4,      5.5]]} options={{}} graph_id="ScatterChart"  width={"100%"} height={"400px"}  legend_toggle={true} />
        </div>
    }
});
