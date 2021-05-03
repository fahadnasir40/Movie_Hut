import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Header/header'

class Dashboard extends PureComponent {
    render() {
        console.log("DASHBOASRD PROPS", this.props)
        return (
            <div>
                <Header user={this.props.user}/>
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