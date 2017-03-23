import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MoleculeTable from './MoleculeTable';
import MoleculeParallelCoordinates from './MoleculeParallelCoordinates';

import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware()
)(createStore);

const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import {fetchMolecules} from './actions';

class App extends Component {
    componentDidMount() {
        store.dispatch(fetchMolecules())
    }
    render() {
        return (
            <div>
                <MoleculeTable/>
                <MoleculeParallelCoordinates/>
            </div>
        );
    }
}

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));
