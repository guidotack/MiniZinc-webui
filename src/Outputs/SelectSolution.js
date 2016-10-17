import React from 'react';
import { DropDownBar } from '../DropDownBar';

export var SelectSolution = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        result: React.PropTypes.array,
        selectedResult: React.PropTypes.string,
        setSelectedResult: React.PropTypes.func,
    },

    setSelectedResult: function(result) {
        this.props.setSelectedResult(result);
    },

    render: function() {
        return <div className="SelectSolution Box">
            <div className="container dragHandle">
                <div className="name">{this.props.id}</div>
            </div>
            <div className="parameters">
                <DropDownBar name={"resultNum"} options={Object.keys(this.props.result)}
                    selectedOption={this.props.selectedResult || ""}
                    handleOptionChange={this.setSelectedResult} />
            </div>
        </div>
    }
});
