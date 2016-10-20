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
        selectedResult: React.PropTypes.string,
        setSelectedResult: React.PropTypes.func,
        inputArgs: React.PropTypes.array.isRequired,
        outputArgs: React.PropTypes.array.isRequired,
        setOutputComponentParameter: React.PropTypes.func,
        dataFiles: React.PropTypes.array.isRequired,
        selectedModel: React.PropTypes.string.isRequired,
        layout: React.PropTypes.array.isRequired,
        handleLayoutChange: React.PropTypes.func.isRequired,
        handleSolveClick: React.PropTypes.func.isRequired,
        is_solving: React.PropTypes.bool.isRequired
    },

    onLayoutChange: function(layout) {
        this.props.handleLayoutChange(layout);
    },

    render: function() {
        var allKeys = Object.keys(this.props.inputs);
        var components = [];
        var layout = this.props.layout.slice(0);
        // console.log(layout);
        var layoutKeys = {};
        for (let i = 0; i < layout.length; ++i) {
          layoutKeys[layout[i].i] = 1;
        }
        for (let i = 0; i < allKeys.length; i++) {
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
                    selectedModel: this.props.selectedModel,
                    handleSolveClick: this.props.handleSolveClick,
                    is_solving: this.props.is_solving,
                  })}
                  </div>
                );
                if (! (key in layoutKeys)) {
                  layout.push({i:key,w:2,h:1,x:0,y:Infinity});
                }
            }
        }

        allKeys = Object.keys(this.props.outputs);
        for (let i = 0; i < allKeys.length; i++) {
            key = allKeys[i];
            element = OutputStringToComponent[this.props.outputs[key].component];
            components.push(
              <div key={key}>
              {React.createElement(element, {
                result: this.props.result,
                layout: this.props.layout,
                selectedResult: this.props.selectedResult,
                setSelectedResult: this.props.setSelectedResult,
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
            if (! (key in layoutKeys)) {
              layout.push({w:3,h:2,x:0,y:Infinity,i:key});
            }
        }

        return <ReactGridLayout className="InputHolder layout"
                 cols={12} rowHeight={150} draggableHandle=".dragHandle"
                 layout={layout}
                 width={1200}
                 onLayoutChange={this.onLayoutChange}
                 >
          {components}
        </ReactGridLayout>
    }
});
