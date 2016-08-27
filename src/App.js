import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <QueensForm />
      </div>
    );
  }
}

var QueensForm = React.createClass({
    getInitialState: function() {
        return {
            result: [],
            input: 1
        };
    },

    handleUserInput: function(number) {
        this.setState({
            input: number
        });
    },

    onSubmit: function(e) {
        e.preventDefault();
        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            if (http.readyState === XMLHttpRequest.DONE) {
                var split = http.responseText.split("{");
                split.splice(0,1);
                for (var i = 0; i < split.length; i++) {
                    split[i] = "{" + split[i];
                    split[i] = JSON.parse(split[i]);
                }

                this.setState({
                    result: split
                });
            }
        }.bind(this);

        http.open( "GET", "http://localhost:5000/model/queens.json", true);
        http.send(null);

    },

    render: function() {
        var rows = [];
        // TODO: split into it's own object and assign keys.
        this.state.result.forEach(function(row) {
            rows.push(<p>{row.q.join(' ')}</p>)
        });

        return (
            <div>
                {rows}
                <form onSubmit={this.onSubmit}>
                    <NumberInput min="1" max="10" onUserInput={this.handleUserInput} input={this.state.input} />
    				<button onClick={this.onSubmit}>Submit</button>
    			</form>
            </div>
        )
    }
});

var NumberInput = React.createClass({
    getInitialState: function() {
        return {
            number: this.props.min
        };
    },

    onChange: function() {
        this.props.onUserInput(this.refs.numberInput.value);
    },

    render: function() {
        return (
            <div>
                <input ref="numberInput" onChange={this.onChange} value={this.props.input} type="range" min={this.props.min} max={this.props.max}></input>
                <p>{this.props.input}</p>
            </div>
        );
    }
});

export default App;
