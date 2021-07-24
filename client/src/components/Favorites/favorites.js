import React, { Component } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { connect } from 'react-redux'
import { getFavoriteMovies } from '../../actions'


class Favorites extends Component {
    render() {
        return (
            <div className="sticky-body">
                <Header user={this.props.user} />
                <div className="container mb-5"  >
                    <div className="row mt-3 pl-2">
                        <nav aria-label="breadcrumb" style={{ background: "white" }}>
                            <ol class="breadcrumb heading" style={{ background: "inherit", color: "black" }}>
                                <li class="breadcrumb-item" ><a href="/" style={{ color: "black" }}>HOME</a></li>
                                <li class="breadcrumb-item active" aria-current="page">FAVORITES</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="sticky-footer" >
                    <Footer />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
    }
}

export default connect(mapStateToProps)(Favorites)