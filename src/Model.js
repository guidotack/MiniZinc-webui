import React from 'react';

export var ModelForm = React.createClass({
    propTypes: {
        args: React.PropTypes.object.isRequired,
        models: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        selectedModel: React.PropTypes.string.isRequired,
        handleModelChange: React.PropTypes.func.isRequired
    },

    handleModelChange: function(event) {
        this.props.handleModelChange(event);
    },

    render: function() {
        var inputs = [];
        for (var i = 0; i < Object.keys(this.props.args).length; i++) {
            var key = Object.keys(this.props.args)[i];
            var type = this.props.args[key];
            inputs.push(<ModelArgument className="ModelArgument" key={key} argName={key} type={type} />);
        }

        return <div className="ModelForm">
            <ModelSelect models={this.props.models}
                selectedModel={this.props.selectedModel} handleModelChange={this.handleModelChange} />
            <ModelDisplay modelName={this.props.selectedModel}/>
            {inputs}
        </div>
    }
});

var ModelSelect = React.createClass({
    propTypes: {
        selectedModel: React.PropTypes.string.isRequired,
        models: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        handleModelChange: React.PropTypes.func.isRequired
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
