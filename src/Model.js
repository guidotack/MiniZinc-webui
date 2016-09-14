import React from 'react';

export var ModelForm = React.createClass({
    propTypes: {
        args: React.PropTypes.object.isRequired,
        models: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        selectedModel: React.PropTypes.string.isRequired,
        selectedArgument: React.PropTypes.object.isRequired,
        handleModelChange: React.PropTypes.func.isRequired,
        handleArgumentClick: React.PropTypes.func.isRequired,
        handleArgumentDeselect: React.PropTypes.func.isRequired,
        handleModelSubmit: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        window.addEventListener('mousedown', this.onUserClick, false);
    },

    onUserClick: function(event) {
        if (this.mouseDown) {
            return;
        }
        else {
            this.props.handleArgumentDeselect();
        }
    },

    onMouseUp: function(event) {
        this.mouseDown = false;
    },

    onMouseDown: function(event) {
        this.mouseDown = true;
    },

    handleModelChange: function(event) {
        this.props.handleModelChange(event);
    },

    render: function() {
        var inputs = [];
        for (var i = 0; i < Object.keys(this.props.args).length; i++) {
            var key = Object.keys(this.props.args)[i];
            var type = this.props.args[key];

            var selected = this.props.selectedArgument.argName === key;

            inputs.push(<ModelArgument key={key} argName={key} selected={selected}
                type={type} onUserClick={this.props.handleArgumentClick} />);
        }

        return <div className="ModelForm" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
            <ModelSelect models={this.props.models}
                selectedModel={this.props.selectedModel} handleModelChange={this.handleModelChange} />
            <ModelDisplay modelName={this.props.selectedModel}/>
            {inputs}
            <ModelSubmit handleModelSubmit={this.props.handleModelSubmit} />
        </div>
    }
});

var ModelSubmit = React.createClass({
    propTypes: {
        handleModelSubmit: React.PropTypes.func.isRequired
    },

    handleModelSubmit: function(e) {
        e.preventDefault();
        this.props.handleModelSubmit();
    },

    render: function() {
        return <div className="ModelButton">
            <button onClick={this.handleModelSubmit}>Submit</button>
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
        type: React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool,
        onUserClick: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            selected: false
        }
    },

    onUserClick: function(event) {
        this.props.onUserClick(this.props.argName, this.props.type);
    },

    render: function() {
        return <div className={"ModelArgument" + (this.props.selected === true ? " selected" : "")} onClick={this.onUserClick}>
            <span className="ModelArgumentName">{this.props.argName}</span>
            <span className="ModelArgumentType">{this.props.type}</span>
        </div>
    }
});
