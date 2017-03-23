import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ParallelCoordinates} from 'react-parcoords';
import {setFilteredMolecules} from './actions';
import {parallelSelector} from './selection';

const dimensions = {
    logP: {
        title: 'logP',
        type: 'number'
    },
    logS: {
        title: 'logS',
        type: 'number'
    },
    hDonor: {
        title: 'hDonor',
        type: 'number'
    },
    hAcceptor: {
        title: 'hDonor',
        type: 'number'
    },
    polarSurface: {
        title: 'hDonor',
        type: 'number'
    }
};

class MoleculeParallelCoordinates extends Component {
    render() {
        return (
            <ParallelCoordinates  dimensions={dimensions} {...this.props} onBrushEnd={data => {
                this.props.setFilteredMolecules(data.data);
            }}/>
        )
    }
}

function mapStateToProps(state) {
    return parallelSelector(state);
}

export default connect(mapStateToProps, {setFilteredMolecules})(MoleculeParallelCoordinates);
