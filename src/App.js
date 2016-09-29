import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { ModelForm } from './Model';
import { InputSelectionBar } from './InputSelectionBar/InputSelectionBar';
import { InputHolder } from './InputHolder';
import { OutputHolder } from './OutputHolder'
import { GetURL } from './Utils';

var API_ROOT = "http://localhost:5000/";
var API_MODELS = API_ROOT + "models";
var API_ARGUMENTS = API_ROOT + "models/";
//var API_MODEL_SOLVE = API_ROOT + "solve/";
var API_SAVE_TEMPLATE = API_ROOT + "save_template";
var API_GET_TEMPLATE = API_ROOT + "get_template/";

// TODO: abstract the first model loaded.
var API_MODEL_EXAMPLE = "golomb";

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

                this.setState(prevState);
            }.bind(this));

            this.setState({
                models: [this.props.params.template],
                selectedModel: this.props.params.template,
                developmentMode: false
            });
        }
        else {
            GetURL(API_MODELS, function(http) {
                var models = JSON.parse(http.responseText);

                for (var i = 0; i < models.length; i++) {
                    models[i] = models[i].slice(0, models[i].length - 4);
                }

                this.setState({ models: models, selectedModel: models[0] });
            }.bind(this));

            GetURL(API_ARGUMENTS + API_MODEL_EXAMPLE, function(http) {
                var args = JSON.parse(http.responseText);

                this.setState({ args: args });
            }.bind(this));
        }

        socket.on('solution', function(data) {
            var split = data.split("{");
            split.splice(0,1);

            for (var i = 0; i < split.length; i++) {
                split[i] = "{" + split[i];
                split[i] = JSON.parse(split[i]);
            }

            var newResult = this.state.result.concat(split);
            this.setState({
                result: newResult, //each solution is added as an object to the array
                selectedOutputIndex: newResult.length - 1
            });
        }.bind(this));
    },

    handleArgumentClick: function(argName, type) {
        this.setState({ selectedArgument: { argName: argName, type: type} });
    },

    handleArgumentDeselect: function() {
        if (this.state.mouseOverBar === false) {
            this.setState({
                selectedArgument: {}
            });
        }
    },

    handleModelChange: function(event) {
        var value = event.target.value;
        this.setState({ args: {}, selectedModel: value, selectedArgument: {}, inputs: {}, result: [] });

        GetURL(API_ARGUMENTS + value, function(http) {
            var args = JSON.parse(http.responseText);
            this.setState({ args: args });
        }.bind(this));
    },

    handleBarState: function(event) {
        if (event.type === "mouseenter") {
            this.setState({ mouseOverBar: true });
        }
        else if (event.type === "mouseleave") {
            this.setState({ mouseOverBar: false });
        }
    },

    handleInputButtonClick: function(componentName, defaultValue) {
        if (this.state.selectedArgument.argName != null) {
            this.setState({
                inputs: {
                    ...this.state.inputs,

                    [this.state.selectedArgument.argName]: {
                        component: componentName,
                        type: this.state.selectedArgument.type,
                        value: defaultValue,
                        isOutput: false
                    }
                }
            });
        }
    },

    handleOutputButtonClick: function() {
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

    handleInputValueChange: function(id, value) {
        var newObject = this.state.inputs[id];
        newObject.value = value;

        this.setState({
            inputs: {
                ...this.state.inputs,

                [id]: newObject
            }
        })
    },

    handleSolveStop: function() {
        socket.emit('kill_solution');
    },

    handleModelSubmit: function() {
        var successful = true;
        //var fetchURL = API_MODEL_SOLVE + this.state.selectedModel + '?';
        var args = '';

        this.setState({
            result: []
        });

        Object.keys(this.state.args.input).forEach(function(arg) {
            if (this.state.inputs[arg] != null) {
                args += arg + '=' + this.state.inputs[arg].value + '&';
            }
            else {
                successful = false;
                return;
            }
        }.bind(this));

        if (successful) {
            socket.emit('request_solution', {model:this.state.selectedModel,args});
        }
    },

    handleTemplateSave: function(templateName) {
        var template = {
            name: this.state.selectedModel,
            args: this.state.args,
            inputs: this.state.inputs
        }

        var request = new XMLHttpRequest();
        request.open('POST', API_SAVE_TEMPLATE, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(template));
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

    render: function() {
        return (
            <div className="App">
                <div className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h2>MiniZinc-WebUI</h2>
                </div>

                <InputSelectionBar developmentMode={this.state.developmentMode} filterType={this.state.selectedArgument.type} handleBarState={this.handleBarState}
                    handleInputButtonClick={this.handleInputButtonClick} handleOutputButtonClick={this.handleOutputButtonClick} outputs={this.state.outputs} />

                <ModelForm developmentMode={this.state.developmentMode} args={this.state.args} models={this.state.models} selectedModel={this.state.selectedModel}
                    handleModelChange={this.handleModelChange} handleArgumentClick={this.handleArgumentClick}
                    selectedArgument={this.state.selectedArgument} handleArgumentDeselect={this.handleArgumentDeselect}
                    handleModelSubmit={this.handleModelSubmit} handleSolveStop={this.handleSolveStop}
                    handleTemplateSave={this.handleTemplateSave} />
                {/* <QueensForm /> */}
                <InputHolder inputs={this.state.inputs} handleInputValueChange={this.handleInputValueChange} />
                <OutputHolder result={this.state.result} selectedOutputIndex={this.state.selectedOutputIndex}
                    handleOutputChange={this.handleOutputChange} />
            </div>
        );
    }
});

export default App;
