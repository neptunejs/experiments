import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import {CHANGE_QUERY, MAKE_REQUEST} from './actions';

function query(state = null, action) {
    if (action.type === CHANGE_QUERY) return action.payload;
    return state;
}

function prediction(state = null, action) {
    if (action.type === `${MAKE_REQUEST}_FULFILLED`) {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    prediction,
    query,
    form
});
