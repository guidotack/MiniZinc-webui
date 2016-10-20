import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from './Router';
import './index.css';
import './fontawesome/font-awesome.min.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import minizincApp from './Reducers';

const store = createStore(minizincApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);
