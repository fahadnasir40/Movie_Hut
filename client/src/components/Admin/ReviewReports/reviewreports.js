import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'
import DataTable from 'react-data-table-component'
import { getReports } from '../../../actions'
import { connect } from 'react-redux'
class ReviewReports extends Component {
    state = {
        reportList: [],
        reviewList: [],
        search: ''
    }
    handleInputSearch = (event) => {
        this.setState({search:event.target.value})
    }
    componentDidMount() {
        this.props.dispatch(getReports())
    }
    static getDerivedStateFromProps(props, state) {
        // console.log("NEW PROPS", props)
        if (props.reportList) {
            if (props.reportList.length > 0) {
                return {
                    reportList: props.reportList
                }
            }
        }
        return null;
    }

    columns = [
        // {
        //     name: 'Name',
        //     selector: 'name',
        //     sortable: true,
        //     cell: row => (
        //         <span >
        //             <strong>{row.name}</strong>
        //         </span>
        //     )
        // },
        {
            name: 'Reason',
            selector: 'reasons',
            sortable: true,
            cell: row => (
                <span>
                    {row.reasons.map(r => r + ", ")}
                </span>
            )
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'Description',
            selector: 'reasonDescription',
            sortable: true,
            cell: row => (
                <span>
                    {row.reasonDescription ? row.reasonDescription : 'N/A'}
                </span>
            )
        },
        // {
        //     name: 'Showtimes',
        //     sortable: true,
        //     cell: row => (
        //         <span className="p-2">
        //             {/* <button className='btn btn-outline-dark'>View </button> */}
        //             <Link to={`/create-showtime/${row._id}`} className='btn btn-outline-dark'>View showtimes </Link>

        //         </span>
        //     )
        // },

        {
            name: 'Action',
            hide: 'md',
            cell: row => (
                <span><strong>...</strong></span>
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

    SampleExpandedComponent = ({ data }) => {
        return (
            <div className="container-fluid">
               <div className="row d-lg-none">
                    <div className="col">
                        <span className="title fw-medium">Id# </span> <span className="fw-normal"> {data.reasonDescription}</span>
                    </div>
                </div>
            </div>
        )
    };
    
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className='row mt-2'>
                        <div className='col-12 col-md-4 mt-2'>
                            <h2>Reports</h2>
                        </div>
                        {/* <div className='col-12 col-md-4 mt-2'>
                            <input type='text' className=' float-right form-control' placeholder="Search user by Name" onChange={this.handleInputSearch}/>
                        </div> */}
                    </div>
                    <div>
                        <DataTable
                            columns={this.columns}
                            data={ this.state.reportList}
                            // data2={ this.state.reviewList}
                            highlightOnHover
                            pointerOnHover
                            pagination
                            // onRowClicked={(data) => { this.showData(data) }}
                            paginationPerPage={10}
                            expandableRows
                            expandableRowsComponent={<this.SampleExpandedComponent />}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
// (this.state.userList.filter(user => user.role == "user"))
function mapStateToProps(state) {
    return {
        reportList: state.user.reportList,
        reviewList: state.user.reviewList,
    }
}

export default connect(mapStateToProps)(ReviewReports)
