import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'

class Dashboard extends PureComponent {
    render() {
        return (
            <div>
                <Header user={this.props.user} />
                <div className="container">
                    <div className="row  m-2">
                        <div className="col p-2">
                            <h3>Admin Dashboard</h3>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 mt-2">
                            <div class="card" styles={{ width: "12rem" }}>
                                <div class="card-body">
                                    <h5 class="card-title">Cinemas</h5>
                                    <p class="card-text">Add new movies, showtimes and information of cinemas.</p>
                                    <Link to='/admin-cinemas' class="btn btn-dark">See cinemas</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mt-2">
                            <div class="card" styles={{ width: "12rem" }}>
                                <div class="card-body">
                                    <h5 class="card-title">Users</h5>
                                    <p class="card-text">User information and update their account status.</p>
                                    <Link to='/admin-users' class="btn btn-dark">See users</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mt-2">
                            <div class="card" styles={{ width: "12rem" }}>
                                <div class="card-body">
                                    <h5 class="card-title">Reports</h5>
                                    <p class="card-text">See user reports and queries related information.</p>
                                    <Link to='/admin-reports' class="btn btn-dark">See reports</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mt-2 mt-md-4">
                            <div class="card" styles={{ width: "12rem" }}>
                                <div class="card-body">
                                    <h5 class="card-title">Promotions</h5>
                                    <p class="card-text">Send promotional emails about movies and showtimes.</p>
                                    <Link to='/promotions' class="btn btn-dark">Send promotional emails</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Dashboard;