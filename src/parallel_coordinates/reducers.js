import {combineReducers} from 'redux';
import {
    FETCH_MOLECULES,
    NEW_FILTERED_MOLECULES,
    LINE_HOVERED
} from './actions';


function dataReducer(state=[], action) {
    switch(action.type) {
        case `${FETCH_MOLECULES}_FULFILLED`:
            return action.payload;
        case `${FETCH_MOLECULES}_REJECTED`:
            console.error('Failed to fetch molecules');
            return [];
        default:
            return state;
    }
}

function filteredDataReducer(state=null, action) {
    switch(action.type) {
        case NEW_FILTERED_MOLECULES:
            return action.payload;
        default:
            return state;
    }
}

function tableReducer(state={activeLine: null}, action) {
    switch(action.type) {
        case LINE_HOVERED:
            return {
                activeLine: action.payload
            };
        default:
            return state;
    }
}

export default combineReducers({
    molecules: dataReducer,
    filteredMolecules: filteredDataReducer,
    table: tableReducer
});
