import React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { setModels, setArguments, addResult, selectModel, restoreState,
    setDevelopmentMode } from './Actions';

import { ModelFormContainer } from './ModelForm/ModelFormContainer';
import { InputSelectionBarContainer } from './InputSelectionBar/InputSelectionBarContainer';
import { InputHolderContainer } from './InputHolderContainer';
import { OutputHolderContainer } from './OutputHolderContainer'
import { GetURL, GetTypeDimensionString, API_GET_TEMPLATE, API_MODELS, API_ARGUMENTS } from './Utils';
import { OutputSelectionBar } from './OutputSelectionBar';

// TODO: abstract the first model loaded.
var API_MODEL_EXAMPLE = "prod_planning";

var socket = require('socket.io-client')('http://localhost:5000/');

var App = React.createClass({
    getInitialState: function() {
        return {
            args: {},
            models: [],
            selectedModel: "",
            selectedArgument: {},
            mouseOverBar: false,
            inputs: {},
            result: [],
            selectedOutputIndex: 0,
            outputs: {},
            developmentMode: true
        }
    },

    componentDidMount: function() {
        if (this.props.params.template != null) {
            GetURL(API_GET_TEMPLATE + this.props.params.template, function(http) {
                var prevState = JSON.parse(http.responseText);

                this.props.dispatch(restoreState(prevState));
            }.bind(this));

            this.props.dispatch(setModels([this.props.params.template]));
            this.props.dispatch(selectModel(this.props.params.template));
            this.props.dispatch(setDevelopmentMode(false));
        }
        else {
            GetURL(API_MODELS, function(http) {
                var models = JSON.parse(http.responseText);

                for (var i = 0; i < models.length; i++) {
                    models[i] = models[i].slice(0, models[i].length - 4);
                }

                this.props.dispatch(selectModel(models[0]));
                this.props.dispatch(setModels(models));
            }.bind(this));

            GetURL(API_ARGUMENTS + API_MODEL_EXAMPLE, function(http) {
                var args = JSON.parse(http.responseText);

                var inKeys = Object.keys(args.input);
                for (let i = 0; i < inKeys.length; i++) {
                    args.input[inKeys[i]].type = GetTypeDimensionString(args.input[inKeys[i]]);
                }

                var outKeys = Object.keys(args.output);
                for (let i = 0; i < outKeys.length; i++) {
                    args.output[outKeys[i]].type = GetTypeDimensionString(args.output[outKeys[i]]);
                }

                this.props.dispatch(setArguments(args));
            }.bind(this));
        }

        socket.on('solution', function(data) {
            var split = data.split("{");
            split.splice(0,1);

            for (var i = 0; i < split.length; i++) {
                split[i] = "{" + split[i];
                split[i] = JSON.parse(split[i]);
            }

            this.props.dispatch(addResult(split[0]));
        }.bind(this));
    },

    handleInputBarOutputClick: function() {
        if (this.state.selectedArgument.argName != null) {
            console.log(this.state.outputs.result)
            this.setState({
                inputs: {
                    ...this.state.inputs,

                    [this.state.selectedArgument.argName]: {
                        isOutput: true,
                        output: "result"
                    }
                }
            });
        }
    },

    handleOutputChange: function(event) {
        this.setState({
            selectedOutputIndex: parseInt(event.target.value, 10),
            outputs: {
                ...this.state.outputs,

                result: {
                    name: "Output1",
                    value: event.target.value,
                    type: "int"
                }
            }
        });
    },

    handleOutputButtonClick: function(component, defValue, type) {
        var num = Math.floor((Math.random() * 1000) + 1);

        this.setState({
            outputs: {
                ...this.state.outputs,

                [num]: {
                    name: num,
                    value: [1,2,4],
                    type: type,
                    component: component
                }
            }
        });
    },

    render: function() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>MiniZinc-WebUI</h2>
                </div>

                <InputSelectionBarContainer />
                <OutputSelectionBar developmentMode={this.state.developmentMode} handleOutputButtonClick={this.handleOutputButtonClick} />

                <div className="App-Content">
                    <ModelFormContainer socket={socket} />

                    <InputHolderContainer />
                    <OutputHolderContainer />
                </div>
            </div>
        );
    }
});

App = connect()(App);

export default App;
