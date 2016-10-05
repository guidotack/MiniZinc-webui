import React from 'react';

export var OutputMatrix1D = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },

    render: function() {
        var rows = [];
        for (let i = 0; i < this.props.result.length; i++) {
            rows.push(<div key={i} className="row">{this.props.result[i]}</div>)
        }

        return <div className="Output Matrix1D">
            <div className="container">
                <div className="name">{this.props.id}</div>
            </div>
            {rows}
        </div>
    }
});
