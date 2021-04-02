import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'
import DataTable from 'react-data-table-component'

class Cinemas extends Component {



    columns = [
        {
            name: 'SKU',
            selector: 'sku',
            hide: 'md',
            sortable: true,

        },
        {
            name: 'Stock',
            selector: 'stock',
            hide: 'md',
            sortable: true,
        },
        {
            name: 'Brand',
            selector: 'brand',
            sortable: true,
            hide: 'md',
            cell: row => (
                <span className="ccap">{row.brand}</span>
            )

        },
        {
            name: 'UOM',
            selector: 'uom',
            sortable: true,
            hide: 'md',
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            hide: 'md',
            cell: row => (
                <div>
                    {
                        row.status === 'active' ?
                            <span className="tb-status text-success ccap">{row.status}</span>
                            : <span className="tb-status text-danger ccap">{row.status}</span>
                    }
                </div>
            )
        },

        {
            name: 'Action',
            cell: row => (
                <div className="nk-tb-col nk-tb-col-tools">
                    <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="mr-n1">
                            <div className="dropdown">
                                <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="link-list-opt no-bdr">
                                        <li><Link to={{
                                            pathname: "/editProduct",
                                            state: {
                                                productInfo: row
                                            }
                                        }}>
                                            <em className="icon ni ni-pen"></em><span>Edit Product</span></Link></li>
                                        <li><a onClick={() => { this.showData(row) }}><em className="icon ni ni-eye"></em><span>View Product</span></a></li>
                                        {
                                            row.status === "active" ?
                                                <li><a onClick={() => { this.props.changeStatus(row) }}>
                                                    <em className="icon ni ni-na"></em><span style={{ cursor: "pointer" }} className="text-danger">Change Status</span>
                                                </a></li>
                                                :
                                                <li><a onClick={() => { this.props.changeStatus(row) }}>
                                                    <em class="icon ni ni-check-thick"></em><span style={{ cursor: "pointer" }}>Change Status</span>
                                                </a></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            ),
            allowOverflow: true,
            button: true,
        },
    ];


    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className='row'>
                        <div className='column mt-2'>
                            <h2>Cinemas</h2>
                        </div>
                    </div>
                    <div>
                        <DataTable
                            columns={this.columns}
                            data={{ 'status': 'prec' }}
                            highlightOnHover
                            pointerOnHover
                            pagination
                            onRowClicked={(data) => { this.showData(data) }}
                            paginationPerPage={10}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Cinemas;
