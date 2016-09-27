import React from 'react';

export var OutputString = React.createClass({
    propTypes: {
        result: React.PropTypes.array
    },

    render: function() {
        var lines = [];

        if (this.props.result != null) {
            this.props.result.forEach(function(row) {
                lines.push(<p key={row}>{row}</p>);
            });
        }
        return (
            <div className="OutputString">
                {lines}
            </div>
        );
    }
});
