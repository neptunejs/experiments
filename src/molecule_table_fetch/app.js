import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import {SvgRenderer} from 'react-ocl';
import {MF} from 'react-mf';
import reactTabelStyle from '../react-table.css';

const size = 200;

const centeredLine = {
    texAlign: 'center',
    lineHeight: size + 'px'
};

const columns = [
    {
        header: 'Name',
        id: 'name',
        accessor: d => d.iupac,
        style: centeredLine
    },
    {
        header: 'Molecular Formula',
        id: 'mf',
        accessor: d => d.mf,
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
                oclid: d.ocl
            };
        },
        render: row => {
            return (
                <SvgRenderer oclid={row.value.oclid} width={size} height={size} options={{}} />
            );
        }
    }
];

class DynTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
    }

    async fetchData(state) {
        this.setState({
            loading: true
        });
        const res = await window.fetch(`https://pubchem.cheminfo.org/molecules/mf?mf=C6H6&sort=-mf&skip=${state.pageSize * state.page}&limit=${state.pageSize}`);
        const text = await res.text();
        const data = JSON.parse(text);
        this.setState({
            data: data.result,
            loading: false,
            pages: 10
        });
    }

    render() {
        return (
            <ReactTable
                columns={columns}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                defaultPageSize={5}
                data={this.state.data} // Set the rows to be displayed
                pages={this.state.pages} // Display the total number of pages
                loading={this.state.loading} // Display the loading overlay when we need it
                onChange={this.fetchData.bind(this)} // Request new data when things change
            />
        );
    }
}

ReactDOM.render((
    <DynTable />
), document.getElementsByClassName('container')[0]);
