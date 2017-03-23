import OCL from 'openchemlib-extended';

export const FETCH_MOLECULES = 'FETCH_MOLECULES';
export const NEW_FILTERED_MOLECULES = 'NEW_FILTERED_MOLECULES';
export const LINE_HOVERED = 'LINE_HOVERED';

export function fetchMolecules() {
    return {
        type: FETCH_MOLECULES,
        payload: fetchData()
    }
}

export function setFilteredMolecules(molecules) {
    return {
        type: NEW_FILTERED_MOLECULES,
        payload: molecules
    };
}

export function moleculeLineHovered(data) {
    return {
        type: LINE_HOVERED,
        payload: data
    }
}

async function fetchData() {
    const size = 100;
    const res = await window.fetch('https://www.cheminfo.org/wikipedia/src/json/data.json');
    const text = await res.text();
    const data = JSON.parse(text)
        .data.molecules.slice(0, size)
        .map(molecule => {
            var props = new OCL.MoleculeProperties(OCL.Molecule.fromIDCode(molecule.actID.value));
            return {
                actID: molecule.actID,
                code: molecule.code,
                mf: molecule.mf,
                logP: props.logP,
                logS: props.logS,
                hDonor: props.donorCount,
                hAcceptor: props.acceptorCount,
                polarSurface: props.polarSurfaceArea
            }
        });
    return data;
}