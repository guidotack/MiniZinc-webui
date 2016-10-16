// The container that holds inputs and passes the changes back to the parent.

import React from 'react';
import { StringToInput } from './Inputs/Inputs';
import { OutputStringToComponent } from './Outputs/Outputs';
import './Outputs/Output.css';

import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export var InputHolder = React.createClass({
    propTypes: {
        handleInputValueChange: React.PropTypes.func.isRequired,
        setInputComponentParameter: React.PropTypes.func.isRequired,
        inputs: React.PropTypes.object.isRequired,
        outputs: React.PropTypes.object.isRequired,
        result: React.PropTypes.array.isRequired,
        inputArgs: React.PropTypes.array.isRequired,
        outputArgs: React.PropTypes.array.isRequired,
        setOutputComponentParameter: React.PropTypes.func,
        dataFiles: React.PropTypes.array.isRequired,
        selectedModel: React.PropTypes.string.isRequired
    },

    onResize: function(layout, oldItem, newItem, e1, e2, element) {
        var chart = element.parentElement.children[0];
        if (chart.classList.contains("Output") && chart.classList.contains("Chart")) {
            if (chart.children.length===3) {
                var h = chart.clientHeight;
                var nameH = chart.children[0].offsetHeight;
                var paramsH = chart.children[1].offsetHeight;
                chart.children[2].style.height = (h-nameH-paramsH)+"px";
            }
        }
    },

    onResizeStop: function(layout, oldItem, newItem, e1, e2, element) {
        var chart = element.parentElement.children[0];
        if (chart.classList.contains("Output") && chart.classList.contains("Chart")) {
            if (chart.children.length===3) {
                var h = newItem.h * 160 - 10;
                var nameH = chart.children[0].offsetHeight;
                var paramsH = chart.children[1].offsetHeight;
                chart.children[2].style.height = (h-nameH-paramsH)+"px";
            }
        }
    },

    render: function() {
        var allKeys = Object.keys(this.props.inputs);
        var components = [];
        var layout = [];
        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            if (this.props.inputs[key].isOutput === false) {
                var element = StringToInput[this.props.inputs[key].component];

                components.push(
                  <div key={key}>
                  {React.createElement(element, {
                    value: this.props.inputs[key].value,
                    onUserInput: this.props.handleInputValueChange,
                    type: this.props.inputs[key].type,
                    key: key,
                    id: key,
                    setInputComponentParameter: this.props.setInputComponentParameter,
                    selectedParameters: this.props.inputs[key].parameters,
                    dataFiles: this.props.dataFiles,
                    selectedModel: this.props.selectedModel
                  })}
                  </div>
                );
                layout.push({i:key, x:0, y:0, w:2, h:1});
            }
        }

        allKeys = Object.keys(this.props.outputs);
        for (i = 0; i < allKeys.length; i++) {
            key = allKeys[i];
            element = OutputStringToComponent[this.props.outputs[key].component];
            components.push(
              <div key={key}>
              {React.createElement(element, {
                result: this.props.result,
                key: key,
                id: key,
                inputs:this.props.inputs,
                inputArgs: this.props.inputArgs,
                outputArgs: this.props.outputArgs,
                setOutputComponentParameter: this.props.setOutputComponentParameter,
                selectedParameters: this.props.outputs[key].parameters,
              })}
              </div>
            );
            layout.push({i:key, x:0, y:0, w:4, h:4});
        }

        /*
        return <div className="InputHolder">
            {components}
        </div>
        */
        return <ReactGridLayout className="InputHolder layout"
                 cols={12} rowHeight={150} draggableHandle=".dragHandle"
                 layout={layout} width={1200} onResize={this.onResize} onResizeStop={this.onResizeStop}>
          {components}
        </ReactGridLayout>
    }
});
