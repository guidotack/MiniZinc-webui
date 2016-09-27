import React from 'react';

export var DropDownBar = React.createClass({
    propTypes: {
        selectedOption: React.PropTypes.string,
        options: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string),
            React.PropTypes.arrayOf(React.PropTypes.number)
        ]),
        handleOptionChange: React.PropTypes.func.isRequired
    },

    onChange: function(event) {
        this.props.handleOptionChange(event);
    },

    render: function() {
        var options = [];
        for (var i = 0; i < this.props.options.length; i++) {
            options.push(<option key={this.props.options[i]} value={this.props.options[i]}>{this.props.options[i]}</option>);
        }

        return <select className="DropDownBar" onChange={this.onChange} value={this.props.selectedOption}>
                    {options}
                </select>
    }
});
