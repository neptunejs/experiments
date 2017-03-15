import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';
import OCLE from './OCLE';
import JsGraph from './JsGraph';
import Form from './Form';
import {addListener} from './listener';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware()
)(createStore);

const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

addListener(store);

class App extends Component {
    render() {
        return (
            <div>
                <OCLE />
                <Form />
                <JsGraph />
            </div>
        );
    }
}

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));
