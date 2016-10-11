import React from 'react';

export var DropDownBar = React.createClass({
    propTypes: {
        selectedOption: React.PropTypes.string.isRequired,
        options: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.string),
            React.PropTypes.arrayOf(React.PropTypes.number)
        ]),
        handleOptionChange: React.PropTypes.func.isRequired,
        default_value: React.PropTypes.string,
        name: React.PropTypes.string
    },

    onChange: function(event) {
        event.preventDefault();
        this.props.handleOptionChange(event.target.value, this.props.name);
    },

    render: function() {
        var default_value = this.props.default_value;
        if (this.props.default_value==null) {
            default_value = 'Select an option!'
        }

        var options = [];
        for (var i = 0; i < this.props.options.length; i++) {
            options.push(<option key={this.props.options[i]} value={this.props.options[i]}>{this.props.options[i]}</option>);
        }

        return <select className="DropDownBar" onChange={this.onChange} value={this.props.selectedOption}>
                    <option value={""} disabled>{default_value}</option>
                    {options}
                </select>
    }
});
