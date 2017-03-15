import {isEqual} from 'lodash-es';

import {makeRequest} from './actions';

const getType = (state) => {
    if (state.form && state.form.Options && state.form.Options.values) {
        return state.form.Options.values.type || 'Proton';
    } else {
        return 'Proton';
    }
};

export function addListener(store) {
    var cache = null;
    store.subscribe(function () {
        var state = store.getState();
        var newState = {
            type: getType(state),
            query: state.query ? state.query.oclid : null
        };
        var previousState = cache;
        cache = newState;
        if (newState.query !== null && (!previousState || !isEqual(newState, previousState))) {
            store.dispatch(makeRequest(newState));
        }
    });
}
