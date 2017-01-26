'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import {SvgRenderer} from 'react-ocl';

async function fetchData() {
    const res = await window.fetch('https://www.cheminfo.org/wikipedia/src/json/data.json');
    const text = await res.text();
    const data = JSON.parse(text)
        .data.molecules;
    return data;
}

const columns = [
    {
        header: 'Name',
        id: 'name',
        accessor: d => d.code
    },
    {
        header: 'Structure',
        id: 'structure',
        accessor: d => {
            return {
                oclid: d.actID.value
            }
        },
        render: row => {
            return (
                <SvgRenderer oclid={row.value.oclid} width={200} height={200} options={{}}/>
            )
        }
    }
];


(async function () {
    const data = await fetchData();
    ReactDOM.render((
        <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={5}
            showPagination={true}

        />

    ), document.getElementsByClassName('container')[0]);
})();
