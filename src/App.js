import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ModelForm } from './Model';
import { InputSelectionBar } from './InputSelection';
import { GetURL } from './Utils';

var API_ROOT = "http://localhost:5000/";
var API_MODELS = API_ROOT + "models";
var API_ARGUMENTS = API_ROOT + "models/";

// TODO: abstract the first model loaded.
var API_MODEL_EXAMPLE = "prod_planning";

var App = React.createClass({
    getInitialState: function() {
        return {
            args: {},
            models: [],
            selectedModel: "",
            selectedArgument: {},
            mouseOverBar: false
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
        this.setState({ args: {}, selectedModel: value, selectedArgument: {} });

        GetURL(API_ARGUMENTS + value, function(http) {
            var args = JSON.parse(http.responseText);
            this.setState({ args: args });
        }.bind(this));
    },

    handleBarState: function(event) {
        if (event.type === "mouseenter") {
            this.setState({ mouseOverBar: true });
        }
        else if (event.type === "mouseleave"){
            this.setState({ mouseOverBar: false });
        }
    },

    render: function() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <InputSelectionBar filterType={this.state.selectedArgument.type} handleBarState={this.handleBarState} />

                <ModelForm args={this.state.args} models={this.state.models} selectedModel={this.state.selectedModel}
                    handleModelChange={this.handleModelChange} handleArgumentClick={this.handleArgumentClick} selectedArgument={this.state.selectedArgument} handleArgumentDeselect={this.handleArgumentDeselect}
                    />
                {/* <QueensForm /> */}
            </div>
        );
    }
});

export default App;
