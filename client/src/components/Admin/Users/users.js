import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'
import DataTable from 'react-data-table-component'
import { getUsers, suspendUser, unSuspendUser } from '../../../actions'
import { connect } from 'react-redux'
import { DropdownButton, Dropdown } from 'react-bootstrap'
class User extends Component {
    state = {
        userList: [],
        search: ''
    }
    handleInputSearch = (event) => {
        this.setState({search:event.target.value})
    }
    handleSuspend = (e) => {
        // console.log(e)
        this.props.dispatch(suspendUser(e))
        window.location.reload();
    }
    handleUnSuspend = (e) => {
        // console.log(e)
        this.props.dispatch(unSuspendUser(e))
        window.location.reload();
    }
    componentDidMount() {
        this.props.dispatch(getUsers())
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.userList) {
            if (props.userList.length > 0) {
                return {
                    userList: props.userList
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
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'City',
            selector: 'city',
            sortable: true,
        },
        {
            name: 'DOB',
            selector: 'dob',
            sortable: true,
            cell: row => (
                <span>
                    {row.dob ? row.dob : 'N/A'}
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
                // <span><strong>...</strong></span>
                <DropdownButton id="dropdown-basic-button" variant="light" title="">
                    {row.status == "active" ? 
                    <Dropdown.Item onClick={()=>{this.handleSuspend(row._id)}}>Suspend</Dropdown.Item> :
                    <Dropdown.Item onClick={()=>{this.handleUnSuspend(row._id)}}>Un-suspend</Dropdown.Item>
                } 
                    
                </DropdownButton>
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
                <Header />
                <div className="container">
                    <div className='row mt-2'>
                        <div className='col-12 col-md-4 mt-2'>
                            <h2>Users</h2>
                        </div>
                        <div className='col-12 col-md-4 mt-2'>
                            <input type='text' className=' float-right form-control' placeholder="Search user by Name" onChange={this.handleInputSearch}/>
                        </div>
                        {/* <div className='col-12 col-md-4 mt-2'>
                            <Link to='/register' className=' float-right btn btn-dark'>Add User</Link>
                        </div> */}
                    </div>
                    <div>
                        <DataTable
                            columns={this.columns}
                            data={ this.state.userList.filter((val)=>{
                                if(this.state.search == "" && val.role == "user"){
                                    return val;
                                }
                                else if(val.name.toLowerCase().includes(this.state.search.toLowerCase()) && val.role == "user"){
                                    return val;
                                }
                            })}
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
// (this.state.userList.filter(user => user.role == "user"))
function mapStateToProps(state) {
    return {
        userList: state.user.userList
    }
}

export default connect(mapStateToProps)(User)
