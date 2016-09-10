import React from 'react';
import { GetURL } from './Utils';

export var ModelForm = React.createClass({
    getInitialState: function() {
        return {
            args: {},
            models: [],
            selectedModel: ""
        }
    },

    componentWillMount: function() {
        GetURL("http://localhost:5000/", function(http) {
            var modelFiles = JSON.parse(http.responseText);
            var models = modelFiles.result;

            for (var i = 0; i < models.length; i++) {
                models[i] = models[i].slice(0, models[i].length - 4);
            }

            this.setState({ models: models, selectedModel: models[0] });
        }.bind(this));

        // TODO: abstract the first model loaded.
        GetURL("http://localhost:5000/model/prod_planning", function(http) {
            var args = JSON.parse(http.responseText);
            this.setState({ args: args });
        }.bind(this));
    },

    handleModelChange: function(event) {
        var value = event.target.value;
        this.setState({ args: {}, selectedModel: value });

        GetURL("http://localhost:5000/model/" + value, function(http) {
            var args = JSON.parse(http.responseText);
            this.setState({ args: args });
        }.bind(this));
    },

    render: function() {
        var inputs = [];
        for (var i = 0; i < Object.keys(this.state.args).length; i++) {
            var key = Object.keys(this.state.args)[i];
            var type = this.state.args[key];
            inputs.push(<ModelArgument className="ModelArgument" key={key} argName={key} type={type} />);
        }

        return <div className="ModelForm">
            <ModelSelect models={this.state.models}
                selectedModel={this.state.selectedModel} handleModelChange={this.handleModelChange} />
            <ModelDisplay modelName={this.state.selectedModel}/>
            {inputs}
        </div>
    }
});

var ModelSelect = React.createClass({
    propTypes: {
        selectedModel: React.PropTypes.string.isRequired,
        models: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    onChange: function(event) {
        this.props.handleModelChange(event);
    },

    render: function() {
        var models = [];
        for (var i = 0; i < this.props.models.length; i++) {
            models.push(<option key={this.props.models[i]} value={this.props.models[i]}>{this.props.models[i]}</option>);
        }

        return <select className="ModelSelect" onChange={this.onChange} value={this.props.selectedModel}>
                    {models}
                </select>
    }
});

var ModelDisplay = React.createClass({
    propTypes: {
        modelName: React.PropTypes.string.isRequired
    },

    render: function() {
        return <div className="ModelDisplay">
            {this.props.modelName}
        </div>
    }
});

var ModelArgument = React.createClass({
    propTypes: {
        argName: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired
    },

    render: function() {
        return <div className="ModelArgument">
            <span className="ModelArgumentName">{this.props.argName}</span>
            <span className="ModelArgumentType">{this.props.type}</span>
        </div>
    }
});
