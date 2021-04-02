import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h3>Admin Dashboard</h3>
                    <div className="row">
                        <Link to='admin-cinemas'>Cinemas</Link>
                    </div>
                </div>
            </div>

        )
    }
}

export default Dashboard;