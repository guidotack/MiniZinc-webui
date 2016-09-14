import React from 'react';

export var OutputString = React.createClass({
    propTypes: {
        result: React.PropTypes.array.isRequired
    },

    render: function() {
        var lines = [];

        this.props.result.forEach(function(row) {
            var keys = Object.keys(row);

            lines.push(<p key={row[keys[0]]}>{row[keys[0]]}</p>);
        });

        return (
            <div className="OutputString">
                {lines}
            </div>
        );
    }
});
