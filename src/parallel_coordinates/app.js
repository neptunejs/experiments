'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import OCL from 'openchemlib-extended';
import ParallelCoordinates from 'react-parallel-coordinates';
import ReactTable from 'react-table';
import {MF} from 'react-mf';
import {SvgRenderer} from 'react-ocl';
import ReactTablePC from '../../components/react-table-pc';

const size = 100;

async function fetchData() {
    const res = await window.fetch('https://www.cheminfo.org/wikipedia/src/json/data.json');
    const text = await res.text();
    const data = JSON.parse(text)
        .data.molecules.slice(0, size)
        .map(molecule => {
            var props = OCL.Molecule.fromIDCode(molecule.actID.value).getProperties();
            console.log(props);
            return {
                actID: molecule.actID,
                code: molecule.code,
                mf: molecule.mf,
                properties: {
                    logP: props.logP,
                    logS: props.logS,
                    hDonor: props.donorCount,
                    hAcceptor: props.acceptorCount,
                    polarSurface: props.polarSurfaceArea
                }
            }
        });
    return data;
}

const molSize = 200;

const centeredLine = {
    'text-align': 'center',
    'line-height': molSize
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
        render: row => {
            return (
                <MF mf={row.value} />
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
        render: row => {
            return (
                <SvgRenderer oclid={row.value.oclid} width={molSize} height={molSize} options={{}} />
            );
        }
    }
];

(async function () {
    let data = await fetchData();

    function pcMap(d) {
        const {logP, logS, hDonor, hAcceptor, polarSurface} = d.properties;
        return {logP, logS, hDonor, hAcceptor, polarSurface};
    }


    let dimensions = {
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
    ReactDOM.render((
        <ReactTablePC
            data={data}
            PCMap={pcMap}
            dimensions={dimensions}
            columns={columns}
        />
    ), document.getElementsByClassName('container')[0]);
})();



