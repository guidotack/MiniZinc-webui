import React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { setModels, setArguments, addResult, selectModel, restoreState,
    setDevelopmentMode, setRequestSID, setData } from './Actions';

import { ModelFormContainer } from './ModelForm/ModelFormContainer';
// import { InputSelectionBarContainer } from './InputSelectionBar/InputSelectionBarContainer';
// import { OutputSelectionBarContainer } from './OutputSelectionBarContainer';
// import { InputHolderContainer } from './InputHolderContainer';
// import { OutputHolderContainer } from './OutputHolderContainer';
import { GetURL, GetTypeDimensionString, API_GET_TEMPLATE, API_MODELS, API_DATA, API_ARGUMENTS } from './Utils';

// TODO: abstract the first model loaded.
var API_MODEL_EXAMPLE = "queens";

var socket = require('socket.io-client')('ws://localhost:5000/');


var App = React.createClass({
    componentDidMount: function() {
        if (this.props.params.template != null) {
            GetURL(API_GET_TEMPLATE + this.props.params.template, function(http) {
                var prevState = JSON.parse(http.responseText);

                this.props.dispatch(restoreState(prevState));
            }.bind(this));
            var dispatch = this.props.dispatch;
            GetURL(API_DATA + this.props.params.template, function(http) {
                var dataFiles = JSON.parse(http.responseText);
                dispatch(setData(dataFiles));
            })

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

                this.props.dispatch(selectModel(API_MODEL_EXAMPLE));
                this.props.dispatch(setModels(models));
            }.bind(this));

            GetURL(API_ARGUMENTS + API_MODEL_EXAMPLE, function(http) {
                var args = JSON.parse(http.responseText);

                var inKeys = Object.keys(args.input);
                for (let i = 0; i < inKeys.length; i++) {
                    args.input[inKeys[i]].type = GetTypeDimensionString(args.input[inKeys[i]]);
                }

				args.input['fzn_options'] = { type: 'string' };

                var outKeys = Object.keys(args.output);
                for (let i = 0; i < outKeys.length; i++) {
                    args.output[outKeys[i]].type = GetTypeDimensionString(args.output[outKeys[i]]);
                }

                this.props.dispatch(setArguments(args));
            }.bind(this));
        }

        socket.on('request_solution_sid', function(request_sid) {
            this.props.dispatch(setRequestSID(request_sid))
        }.bind(this));

        socket.on('solution', function(data) {
            this.props.dispatch(addResult(data));
        }.bind(this));
        
        socket.on('solving_finished', function() {
            console.log("solving finished");
            this.props.dispatch(setRequestSID(null));
        }.bind(this));
    },

    render: function() {
        return (
            <div className="App">
                <div className={"App-header "+ (this.props.developmentMode ? '' : 'disabled')}>
                    <h2>MiniZinc-WebUI</h2>
                </div>

                {/* <InputSelectionBarContainer />
                <OutputSelectionBarContainer /> */}

                <div className="App-Content">
                    <ModelFormContainer socket={socket} />

                    {/* <InputHolderContainer />
                    <OutputHolderContainer /> */}
                </div>
            </div>
        );
    }
});

App = connect()(App);

export default App;
