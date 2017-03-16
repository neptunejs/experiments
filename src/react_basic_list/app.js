import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import OCL from 'openchemlib/minimal';
import {SvgRenderer as MolRenderer} from 'react-ocl';
import {MF} from 'react-mf';

class BasicExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            list: []
        };
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        const smiles = this.state.text;
        let mol = getMol(smiles);
        let error = !mol ? 'This is not a SMILES' : (mol.getAtoms() === 0 ? ' ' : false);
        return (
            <div>
                <label>Enter a SMILES:</label>
                <input onChange={this.handleChange.bind(this)} value={this.state.text} onKeyPress={this.handleKeypress.bind(this)} />
                <p>
                    {error ? error : renderMolecule(mol, 0)}
                </p>
                <br /><br /><br /><br /><br />
                <div>
                    {renderList(this.state.list)}
                </div>
            </div>
        );
    }

    handleKeypress(e) {
        if (e.key === 'Enter') {
            console.log('enter');
            var mol = getMol(this.state.text);
            if (mol) {
                const newList = this.state.list.slice();
                newList.push(mol);
                this.setState({text: '', list: newList});
            }
        }
    }
}

function getMol(smiles) {
    try {
        return  OCL.Molecule.fromSmiles(smiles);
    } catch (e) {
        // ignore
    }
}

function renderMolecule(mol, key) {
    const mf = mol.getMolecularFormula().formula;
    const oclid = mol.getIDCode();
    return (
        <div key={key}>
            Molecular formula: <MF mf={mf} />&nbsp;<MolRenderer oclid={oclid} OCL={OCL} />
        </div>
    )
}

function renderList(list) {
    return list.map((el, i) => {
        return renderMolecule(el, i)
    })
}

ReactDOM.render(
    <BasicExample />,
    document.getElementById('app')
);
