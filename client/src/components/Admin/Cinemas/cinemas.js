import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'
import DataTable from 'react-data-table-component'
import { getCinemasList } from '../../../actions'
import { connect } from 'react-redux'
class Cinemas extends Component {


    state = {
        cinemaList: []
    }

    componentDidMount() {
        this.props.dispatch(getCinemasList())
    }

    static getDerivedStateFromProps(props, state) {

        if (props.cinemaList) {
            if (props.cinemaList.length > 0) {
                return {
                    cinemaList: props.cinemaList
                }
            }
        }
        return null;
    }

    columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,

        },
        {
            name: 'City',
            selector: 'city',
            sortable: true,
        },
        {
            name: 'Url',
            selector: 'url',
            sortable: true,

        },
        {
            name: 'Showtimes',
            sortable: true,
            cell: row => (
                <div>

                    <button className='btn btn-outline-dark'>View </button>
                    <Link to={`/create-showtime/${row._id}`} className='btn btn-outline-dark m-2'>Add </Link>

                </div>
            )
        },

        {
            name: 'Action',
            hide: 'md',
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
                        <div className='col mt-2'>
                            <h2>Cinemas</h2>
                        </div>
                        <div className='col mt-2'>
                            <Link to='create-cinema' className='btn btn-dark'>Add Cinema </Link>
                        </div>
                    </div>
                    <div>
                        <DataTable
                            columns={this.columns}
                            data={this.state.cinemaList}
                            highlightOnHover
                            pointerOnHover
                            pagination
                            // onRowClicked={(data) => { this.showData(data) }}
                            paginationPerPage={10}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        cinemaList: state.cinema.cinemaList
    }
}

export default connect(mapStateToProps)(Cinemas)
