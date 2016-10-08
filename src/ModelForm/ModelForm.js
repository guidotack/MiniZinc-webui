import React from 'react';
import { DropDownBar } from '../DropDownBar';
import { API_SAVE_TEMPLATE } from '../Utils';

export var ModelForm = React.createClass({
    propTypes: {
        args: React.PropTypes.object.isRequired,
        inputs: React.PropTypes.object.isRequired,
        models: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        selectedModel: React.PropTypes.string.isRequired,
        selectedArgument: React.PropTypes.object.isRequired,
        handleModelChange: React.PropTypes.func.isRequired,
        handleArgumentClick: React.PropTypes.func.isRequired,
        handleArgumentDeselect: React.PropTypes.func.isRequired,
        handleClearResults: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        window.addEventListener('mousedown', this.onUserClick, false);
    },

    onUserClick: function(event) {
        if (this.props.selectedArgument.argName != null) {
            setTimeout(function() { this.props.handleArgumentDeselect(); }.bind(this), 100);
        }
    },

    handleModelChange: function(value) {
        this.props.handleModelChange(value);
    },

    handleModelSubmit: function() {
        var successful = true;

        this.props.handleClearResults();

        var argList = {};
        Object.keys(this.props.args.input).forEach(function(arg) {
            if (this.props.inputs[arg] != null) {
                argList[arg] = {};
                argList[arg].value =  this.props.inputs[arg].value;
                argList[arg].dim = this.props.args.input[arg].dim;
            }
            else {
                successful = false;
                return;
            }
        }.bind(this));

        if (successful) {
            argList.model = this.props.selectedModel;
            this.props.socket.emit('request_solution', argList);
        }
    },

    handleSolveStop: function() {
        this.props.socket.emit('kill_solution');
    },

    handleTemplateSave: function(templateName) {
        var template = {
            name: this.props.selectedModel,
            args: this.props.args,
            inputs: this.props.inputs
        }

        var request = new XMLHttpRequest();
        request.open('POST', API_SAVE_TEMPLATE, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(template));
    },

    render: function() {
        var inputs = [];
        if (this.props.args.input != null) {
            for (let i = 0; i < Object.keys(this.props.args.input).length; i++) {
                let key = Object.keys(this.props.args.input)[i];
                let type = this.props.args.input[key].type;

                let selected = this.props.selectedArgument.argName === key;

                inputs.push(<ModelArgument key={key} argName={key} selected={selected}
                    type={type} onUserClick={this.props.handleArgumentClick} />);
            }
        }

        var outputs = [];
        if (this.props.args.output != null) {
            for (let i = 0; i < Object.keys(this.props.args.output).length; i++) {
                let key = Object.keys(this.props.args.output)[i];
                let type = this.props.args.output[key].type;

                let selected = this.props.selectedArgument.argName === key;

                outputs.push(<ModelArgument key={key} argName={key} selected={selected}
                    type={type} />);
            }
        }

        return <div className="ModelForm">
            <DropDownBar options={this.props.models}
                selectedOption={this.props.selectedModel} handleOptionChange={this.handleModelChange} />
            <ModelDisplay modelName={this.props.selectedModel}/>
            {inputs}
            <div className="Outputs">
                {outputs}
            </div>
            <Button text={"Submit"} handleClick={this.handleModelSubmit} />
            <Button text={"Stop"} handleClick={this.handleSolveStop} />
            {this.props.developmentMode ? <Button text={"Save"} handleClick={this.handleTemplateSave} /> : null}
        </div>
    }
});

var Button = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        handleClick: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div className="ModelButton">
            <button onClick={this.props.handleClick}>{this.props.text}</button>
        </div>
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
        if (this.props.onUserClick != null)
            this.props.onUserClick(this.props.argName, this.props.type);
    },

    render: function() {
        return <div className={"ModelArgument" + (this.props.selected === true ? " selected" : "")} onClick={this.onUserClick}>
            <span className="ModelArgumentName">{this.props.argName}</span>
            <span className="ModelArgumentType">{this.props.type}</span>
        </div>
    }
});
