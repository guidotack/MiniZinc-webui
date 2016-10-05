import React from 'react';
import { DropDownBar } from '../DropDownBar';

export var OutputMatrix1D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        onUserInput: React.PropTypes.func,
        // options:
    },

    render: function() {
        var rows = [];

        if (this.props.result != null) {
            for (let i = 0; i < this.props.result.length; i++) {
                rows.push(<div key={i} className="row">{this.props.result[i]}</div>)
            }
        }

        return <div className="Output Matrix1D">
            <div className="container">
                <div className="name">{this.props.id}</div>
            </div>
            {/* <DropDownBar options={this.props.options} selectedOption={this.props.selectedOption} handleOptionChange */}
            {rows}
        </div>
    }
});
