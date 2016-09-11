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
            selectedModel: ""
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

    handleModelChange: function(event) {
        var value = event.target.value;
        this.setState({ args: {}, selectedModel: value });

        GetURL(API_ARGUMENTS + value, function(http) {
            var args = JSON.parse(http.responseText);
            this.setState({ args: args });
        }.bind(this));
    },

    render: function() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <InputSelectionBar />

                <ModelForm args={this.state.args} models={this.state.models} selectedModel={this.state.selectedModel}
                    handleModelChange={this.handleModelChange} />
                {/* <QueensForm /> */}
            </div>
        );
    }
});

export default App;
