import React from 'react';
import App from './App';
import { BrowserRouter, Match } from 'react-router';


export var Router = React.createClass({
    render: function() {
        return <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={App} />
                <Match pattern="/:template" component={App} />
                {/* <Match pattern="/about" component={About} />
                <Match pattern="/topics" component={Topics} /> */}

                {/* If none of those match, then a sibling `Miss` will render. */}
                {/* <Miss component={NoMatch}/> */}
            </div>
        </BrowserRouter>
    }
});
