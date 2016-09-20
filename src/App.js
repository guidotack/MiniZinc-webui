import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ModelForm } from './Model';
import { InputSelectionBar } from './InputSelectionBar/InputSelectionBar';
import { InputHolder } from './InputHolder';
import { OutputString } from './Outputs/OutputString';
import { GetURL } from './Utils';

var API_ROOT = "http://localhost:5000/";
var API_MODELS = API_ROOT + "models";
var API_ARGUMENTS = API_ROOT + "models/";
//var API_MODEL_SOLVE = API_ROOT + "solve/";

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
            result: []
        }
    },

    componentDidMount: function() {
        GetURL(API_MODELS, function(http) {
            var modelFiles = JSON.parse(http.responseText);
            var models = modelFiles.models;

            for (var i = 0; i < models.length; i++) {
                models[i] = models[i].slice(0, models[i].length - 4);
            }

            this.setState({ models: models, selectedModel: models[0] });
        }.bind(this));

        GetURL(API_ARGUMENTS + API_MODEL_EXAMPLE, function(http) {
            var args = JSON.parse(http.responseText);
            this.setState({ args: args });
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

    handleInputClick: function(componentName, defaultValue) {
        if (this.state.selectedArgument.argName != null) {
            this.setState({
                inputs: {
                    ...this.state.inputs,

                    [this.state.selectedArgument.argName]: {
                        component: componentName,
                        type: this.state.selectedArgument.type,
                        value: defaultValue
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

    handleModelSubmit: function() {
        var successful = true;
        //var fetchURL = API_MODEL_SOLVE + this.state.selectedModel + '?';
        var args = ''
        Object.keys(this.state.args).forEach(function(arg) {
            if (this.state.inputs[arg] != null) {
                args += arg + '=' + this.state.inputs[arg].value + '&';
            }
            else {
                successful = false;
                return;
            }
        }.bind(this));
        //fetchURL += args
        if (successful) {
            socket.emit('request_solution', {model:this.state.selectedModel,args});
            socket.on('solution', function(data){
            //GetURL(fetchURL, function(http) {
                console.log(data)
                var split = data.split("{");
                split.splice(0,1);
                for (var i = 0; i < split.length; i++) {
                    split[i] = "{" + split[i];
                    split[i] = JSON.parse(split[i]);
                }
                this.setState({
                    result: this.state.result.concat(split) //each solution is added as an object to the array
                });
            }.bind(this));
        }
    },

    render: function() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <InputSelectionBar filterType={this.state.selectedArgument.type} handleBarState={this.handleBarState}
                    handleInputClick={this.handleInputClick} />

                <ModelForm args={this.state.args} models={this.state.models} selectedModel={this.state.selectedModel}
                    handleModelChange={this.handleModelChange} handleArgumentClick={this.handleArgumentClick}
                    selectedArgument={this.state.selectedArgument} handleArgumentDeselect={this.handleArgumentDeselect}
                    handleModelSubmit={this.handleModelSubmit} />
                {/* <QueensForm /> */}
                <InputHolder inputs={this.state.inputs} handleInputValueChange={this.handleInputValueChange} />
                <OutputString result={this.state.result} />
            </div>
        );
    }
});

export default App;
