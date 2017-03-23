import {createSelector} from 'reselect';

const getCurrentLine = state => state.table.activeLine;
const  getMolecules = state => state.molecules;

export const parallelSelector = createSelector(
    [getCurrentLine, getMolecules],
    (currentLine, molecules) => {
        return {
            highlights: currentLine === null ? [] : [currentLine],
            data: molecules
        }
    }
);