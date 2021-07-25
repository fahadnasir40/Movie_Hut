import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'
import DataTable from 'react-data-table-component'
import { getCinemasList } from '../../../actions'
import { connect } from 'react-redux'
import { DropdownButton, Dropdown } from 'react-bootstrap'
class Cinemas extends Component {


    state = {
        cinemaList: []
    }

    componentDidMount() {
        this.props.dispatch(getCinemasList())
    }
    handleCinemaEdit = (e) => {
        console.log(e)
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
            cell: row => (
                <span >
                    <strong>{row.name}</strong>

                </span>
            )
        },
        {
            name: 'City',
            selector: 'city',
            sortable: true,
        },
        {
            name: 'Address',
            selector: 'address',
            sortable: true,
        },
        {
            name: 'Url',
            selector: 'url',
            sortable: true,
            cell: row => (
                <span>
                    {row.url ? row.url : 'N/A'}
                </span>
            )
        },
        {
            name: 'Showtimes',
            sortable: true,
            cell: row => (
                <span className="p-2">
                    {/* <button className='btn btn-outline-dark'>View </button> */}
                    <Link to={`/create-showtime/${row._id}`} className='btn btn-outline-dark'>View showtimes </Link>

                </span>
            )
        },

        {
            name: 'Action',
            hide: 'md',
            cell: row => (
                <Link to={`/edit-cinema/${row._id}`} className='btn btn-outline-dark'>Edit</Link>
                // <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                //     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                //     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                //     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                // </DropdownButton>
                // <div className="nk-tb-col nk-tb-col-tools">
                //     <ul className="nk-tb-actions gx-1 my-n1">
                //         <li className="mr-n1">
                //             <div className="dropdown">
                //                 <a href="#" className="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em className="icon ni ni-more-h"></em></a>
                //                 <div className="dropdown-menu dropdown-menu-right">
                //                     <ul className="link-list-opt no-bdr">
                //                         <li><Link to={{
                //                             pathname: "/editProduct",
                //                             state: {
                //                                 productInfo: row
                //                             }
                //                         }}>
                //                             <em className="icon ni ni-pen"></em><span>Edit Product</span></Link></li>
                //                         <li><a onClick={() => { this.showData(row) }}><em className="icon ni ni-eye"></em><span>View Product</span></a></li>
                //                         {
                //                             row.status === "active" ?
                //                                 <li><a onClick={() => { this.props.changeStatus(row) }}>
                //                                     <em className="icon ni ni-na"></em><span style={{ cursor: "pointer" }} className="text-danger">Change Status</span>
                //                                 </a></li>
                //                                 :
                //                                 <li><a onClick={() => { this.props.changeStatus(row) }}>
                //                                     <em class="icon ni ni-check-thick"></em><span style={{ cursor: "pointer" }}>Change Status</span>
                //                                 </a></li>
                //                         }
                //                     </ul>
                //                 </div>
                //             </div>
                //         </li>
                //     </ul>
                // </div>
            ),
            allowOverflow: true,
            button: true,
        },
    ];


    render() {
        return (
            <div>
                <Header user={this.props.user}/>
                <div className="container">
                    <div className='row mt-2'>
                        <div className='col-12 col-md-4 mt-2'>
                            <h2>Cinemas</h2>
                        </div>
                        <div className='col-12 col-md-8 mt-2'>
                            <Link to='/create-cinema' className=' float-right btn btn-dark'>Add Cinema </Link>
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
