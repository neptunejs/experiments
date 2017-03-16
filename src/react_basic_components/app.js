import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import OCL from 'openchemlib/minimal';
import {SvgRenderer as MolRenderer} from 'react-ocl';
import {MF} from 'react-mf';

class BasicExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        const smiles = this.state.text;
        let mol;
        let error = false;
        try {
            mol =  OCL.Molecule.fromSmiles(smiles);
        } catch (e) {
            error = true;
        }
        return (
            <div>
                <label>Enter a SMILES:</label>
                <input onChange={this.handleChange.bind(this)} value={this.state.text} />
                <p>
                    {error ? 'This is not a SMILES' : renderMolecule(mol)}
                </p>
            </div>
        );
    }
}

function renderMolecule(mol) {
    const mf = mol.getMolecularFormula().formula;
    const oclid = mol.getIDCode();
    return (
        <div>
            Molecular formula: <MF mf={mf} />
            <br />
            <MolRenderer oclid={oclid} OCL={OCL} />
        </div>
    )
}

ReactDOM.render(
    <BasicExample />,
    document.getElementById('app')
);
