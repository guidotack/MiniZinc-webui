import React from 'react';
import { InputRange, AllInputs } from './Inputs'

export var InputSelectionBar = React.createClass({
    propTypes: {
        filterType: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            filterType: ""
        }
    },

    render: function() {
        var inputs = [];
        for (var i = 0; i < AllInputs.length; i++) {
            if (this.props.filterType.length === 0 || AllInputs[i].type === this.props.filterType)
                inputs.push(<InputButton name={AllInputs[i].name} type={AllInputs[i].type} image={AllInputs[i].image} />);
        }

        // TODO: If no elements are shown after filter, show text saying select an element.

        return <div className="InputSelectionBar">
            {inputs}
        </div>
    }
});

var InputButton = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        image: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            image: "question"
        }
    },

    render: function() {
        return <div className="InputButton">
            <div className="InputName">{this.props.name}</div>
            <i className={"fa fa-2x InputImage fa-" + this.props.image}></i>
            <div className="InputType">{this.props.type}</div>
        </div>
    }
});

export default InputSelectionBar;
