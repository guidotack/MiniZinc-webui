import React from 'react';
import { DropDownBar } from '../DropDownBar';
import { GetURL, API_DATA } from '../Utils';
import './Input.css';

export var InputSolve = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        handleSolveClick: React.PropTypes.func.isRequired,
        is_solving: React.PropTypes.bool.isRequired
    },

    handleSolveClick: function() {
        this.props.handleSolveClick();
    },

    render: function() {
        return (
            <div className="Input SolverControl">
                <div className="container dragHandle">
                    <div className="name">Solver Control</div>
                </div>
                <button onClick={this.handleSolveClick} type="button">{ this.props.is_solving ? "Stop" : "Solve"}</button>
            </div>
        )
    }
});

export var InputFile = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        selectedModel: React.PropTypes.string.isRequired,
        dataFiles: React.PropTypes.array.isRequired,
        value: React.PropTypes.array.isRequired,
        selectedParameters: React.PropTypes.object.isRequired,
        setInputComponentParameter: React.PropTypes.func.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    setInputComponentParameter: function(parameter, parameterName) {
        this.props.setInputComponentParameter(this.props.id, parameterName, parameter);
        var onUserInput = this.props.onUserInput;
        GetURL(API_DATA + this.props.selectedModel + "/" + parameter, function(http) {
            var instance = JSON.parse(http.responseText);
            var instanceKeys = Object.keys(instance);
            for (let i = 0; i<instanceKeys.length; ++i) {
                onUserInput(instanceKeys[i], instance[instanceKeys[i]]);
            }
        })
    },
    
    render: function() {
        return (
            <div className="Input File">
                <div className="container dragHandle">
                    <div className="name">File input</div>
                </div>
            <DropDownBar name={"filename"} options={this.props.dataFiles}
                selectedOption={this.props.selectedParameters["filename"] || ""}
                handleOptionChange={this.setInputComponentParameter} default_value="Choose file" />
            
            </div>
        )
    }
});

export var InputRange = React.createClass({ //slider
    propTypes: {
        id: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        value: React.PropTypes.number.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            min: 1,
            max: 15
        }
    },

    onChange: function(event) {
        this.props.onUserInput(this.props.id, parseInt(event.target.value, 10));
    },

    render: function() {
        return (
            <div className="Input Range">
                <div className="container dragHandle">
                    <div className="name">{this.props.id}</div>
                    <div className="value">{this.props.value}</div>
                </div>
                <input onChange={this.onChange} value={this.props.value} type="range" min={this.props.min} max={this.props.max}></input>
            </div>
        );
    }
});

export var InputTextField = React.createClass({ //text Field
    propTypes: {
        id: React.PropTypes.string.isRequired,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    onChange: function(event) {
        var value = event.target.value;

        if (this.props.type.split('-')[0] === "int") {
            value = parseInt(value, 10) || 0;
        }

        this.props.onUserInput(this.props.id, value);
    },

    render: function() {
        return (
            <div className="Input TextField">
                <div className="container dragHandle">
                    <div className="name">{this.props.id}</div>
                </div>
                <TextField placeholder={"Enter a number"} onTextChange={this.onChange} value={this.props.value || ""} />
            </div>
        );
    }
});

var TextField = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        onTextChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
        placeholder: React.PropTypes.string
    },

    onChange: function(event) {
        this.props.onTextChange(event, this.props.id);
    },

    render: function() {
        return <input onChange={this.onChange} value={this.props.value} placeholder={this.props.placeholder} type="text"></input>
    }
});

export var InputMatrix1D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        value: React.PropTypes.array.isRequired,
        type: React.PropTypes.string,
        onUserInput: React.PropTypes.func.isRequired,
        setInputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    onChange: function(event, id) {
        var currentValue = this.props.value.slice();

        if (this.props.type.split('-')[0] === "int") {
            currentValue[id] = parseInt(event.target.value, 10) || 0;
        }
        else {
            currentValue[id] = event.target.value;
        }

        this.props.onUserInput(this.props.id, currentValue);
    },

    setInputComponentParameter: function(event, parameterName) {
        var currentValue = this.props.value.slice();

        if (event.target.value < this.props.selectedParameters['cols']) {
            currentValue = currentValue.slice(0, event.target.value);
        }
        else {
            while (currentValue.length < event.target.value) {
                currentValue.push("");
            }
        }

        this.props.onUserInput(this.props.id, currentValue);
        this.props.setInputComponentParameter(this.props.id, parameterName, event.target.value);
    },

    render: function() {
        var boxes = [];
        for (let i = 0; i < this.props.value.length; i++) {
            boxes.push(<TextField key={i} id={i.toString()} onTextChange={this.onChange} value={this.props.value[i] || ""} />)
        }

        return <div className="Input Matrix 1D">
            <div className="container dragHandle">
                <div className="name">{this.props.id}</div>
            </div>
            <div className="Parameters">
                <TextField id={"cols"} placeholder={"Length"} onTextChange={this.setInputComponentParameter} value={this.props.selectedParameters["cols"] || ""} />
            </div>
            <div className="row">
                {boxes}
            </div>
        </div>
    }
});

export var InputMatrix2D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        value: React.PropTypes.array.isRequired,
        onUserInput: React.PropTypes.func.isRequired,
        setInputComponentParameter: React.PropTypes.func,
        selectedParameters: React.PropTypes.object,
    },

    onChange: function(event, id) {
        var location = id.split('-');
        var currentValue = this.props.value.slice();

        currentValue[location[0]][location[1]] = event.target.value;

        if (this.props.type.split('-')[0] === "int") {
            currentValue[location[0]][location[1]] = parseInt(event.target.value, 10) || 0;
        }

        this.props.onUserInput(this.props.id, currentValue);
    },

    setInputComponentParameter: function(event, parameterName) {
        let currentValue = this.props.value.slice();

        if (parameterName === "cols") {
            if (event.target.value < this.props.selectedParameters['cols']) {
                for (let i = 0; i < currentValue.length; i++) {
                    currentValue[i] = currentValue[i].slice(0, event.target.value);
                }
            }
            else {
                for (let i = 0; i < currentValue.length; i++) {
                    while (currentValue[i].length < event.target.value) {
                        currentValue[i].push("");
                    }
                }
            }
        }
        else if (parameterName === "rows") {
            if (event.target.value < this.props.selectedParameters['rows']) {
                currentValue = currentValue.slice(0, event.target.value);
            }
            else {
                while (currentValue.length < event.target.value) {
                    currentValue.push([]);
                }
            }
        }

        this.props.onUserInput(this.props.id, currentValue);
        this.props.setInputComponentParameter(this.props.id, parameterName, event.target.value);
    },

    render: function() {
        var rows = [];
        for (let i = 0; i < this.props.value.length; i++) {
            var boxes = [];
            for (let j = 0; j < this.props.value[i].length; j++) {
                boxes.push(<TextField key={i + '-' + j} id={i + '-' + j} onTextChange={this.onChange}
                    value={(this.props.value[i] != null && this.props.value[i][j] != null) ? this.props.value[i][j] : "" } />)
            }

            rows.push(<div key={i} className="row">{boxes}</div>)
        }

        return <div className="Input Matrix 2D">
            <div className="container dragHandle">
                <div className="name">{this.props.id}</div>
            </div>
            <div className="Parameters">
                <TextField id={"rows"} placeholder={"Rows"} onTextChange={this.setInputComponentParameter} value={this.props.selectedParameters["rows"] || ""} />
                <TextField id={"cols"} placeholder={"Columns"} onTextChange={this.setInputComponentParameter} value={this.props.selectedParameters["cols"] || ""} />
            </div>
            {rows}
        </div>
    }
});
