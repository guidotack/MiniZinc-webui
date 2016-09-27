import React from 'react';
import { DropDownBar } from './DropDownBar.js';

export var ModelForm = React.createClass({
    propTypes: {
        args: React.PropTypes.object.isRequired,
        models: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        selectedModel: React.PropTypes.string.isRequired,
        selectedArgument: React.PropTypes.object.isRequired,
        handleModelChange: React.PropTypes.func.isRequired,
        handleArgumentClick: React.PropTypes.func.isRequired,
        handleArgumentDeselect: React.PropTypes.func.isRequired,
        handleModelSubmit: React.PropTypes.func.isRequired,
        handleSolveStop: React.PropTypes.func.isRequired
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
            <DropDownBar options={this.props.models}
                selectedOption={this.props.selectedModel} handleOptionChange={this.handleModelChange} />
            <ModelDisplay modelName={this.props.selectedModel}/>
            {inputs}
            <ModelSubmit handleModelSubmit={this.props.handleModelSubmit} />
            <SolveStop handleSolveStop={this.props.handleSolveStop} />
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

var SolveStop = React.createClass({
  propTypes: {
      handleSolveStop: React.PropTypes.func.isRequired
  },

  handleSolveStop: function(e) {
      e.preventDefault();
      this.props.handleSolveStop();
  },

  render: function() {
      return <div className="ModelButton">
          <button onClick={this.handleSolveStop}>Stop</button>
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
        this.props.onUserClick(this.props.argName, this.props.type);
    },

    render: function() {
        return <div className={"ModelArgument" + (this.props.selected === true ? " selected" : "")} onClick={this.onUserClick}>
            <span className="ModelArgumentName">{this.props.argName}</span>
            <span className="ModelArgumentType">{this.props.type}</span>
        </div>
    }
});
