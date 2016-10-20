import React from 'react';
import './GridComponents.css';

export var UIBox = React.createClass({
    propTypes: {
        id:  React.PropTypes.string.isRequired,
        removeComponent:  React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        developmentMode: React.PropTypes.bool.isRequired,
    },
    
    removeComponent: function() { this.props.removeComponent(this.props.id); },
    
    render: function() {
        var children = this.props.children;
        var closeButton = this.props.developmentMode ? (
            <div onClick={this.removeComponent} className="closeButton">
                <i className={"fa fa-times"}></i>
            </div>
        ) : (<div></div>);
        
        return (
        <div className="UIBox">
            <div className="container dragHandle">
                <div className="name">{this.props.title}</div>
            </div>
            
          {children}
          {closeButton}
        </div>
        )
    }
});
