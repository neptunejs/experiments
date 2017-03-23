import React, {Component} from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import {SvgRenderer} from 'react-ocl';
import OCL from 'openchemlib/core';
import {MF} from 'react-mf';
import '../react-table.css';
import {moleculeLineHovered} from './actions';

const molSize = 120;

const centeredLine = {
    textAlign: 'center',
    lineHeight: molSize + 'px'
};

const columns = [
    {
        header: 'Name',
        id: 'name',
        accessor: d => d.code,
        style: centeredLine
    },
    {
        header: 'Molecular Formula',
        id: 'mf',
        accessor: d => d.mf.value,
        style: centeredLine,
        render: function (row) {
            return (
                <MF mf={row.value}/>
            );
        }
    },
    {
        header: 'Structure',
        id: 'structure',
        accessor: d => {
            return {
                oclid: d.actID.value
            };
        },
        render: function (row) {
            return (
                <SvgRenderer OCL={OCL} oclid={row.value.oclid} width={molSize} height={molSize} options={{}}/>
            );
        }
    }
];

class MoleculeTable extends Component {
    render() {
        return (
            <ReactTable
                className="-highlight"
                data={this.props.data}
                columns={columns}
                defaultPageSize={5}
                showPagination={true}
                getTrProps={(state, rowInfo, column) => {
                    return {
                        onMouseEnter: () => {
                            this.props.moleculeLineHovered(rowInfo.row);
                        },
                        onMouseLeave: () => {
                            this.props.moleculeLineHovered(null);
                        }
                    };
                }}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.filteredMolecules === null ? state.molecules : state.filteredMolecules
    }
}

export default connect(mapStateToProps, {moleculeLineHovered})(MoleculeTable);