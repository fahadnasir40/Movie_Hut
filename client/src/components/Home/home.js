import React, { Component } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import HomeSlider from '../Widgets/slider'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getHomeMovies } from '../../actions'
import ReactPaginate from "react-paginate";
import HomeMovies from './homeMovies';
import { Modal } from 'react-bootstrap'
import _ from 'lodash'
class Home extends Component {

    state = {
        movies: [],
        commingSoon: [],
        cachedProps: '',
        active: 'Now Showing',
    }

    componentDidMount() {
        this.props.dispatch(getHomeMovies());
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props);
        if (state.cachedProps !== props) {
            if (props.movies) {
                if (props.movies.moviesList) {
                    if (props.movies.moviesList.length > 0) {
                        return {
                            movies: props.movies.moviesList,
                            commingSoon: props.movies.commingSoon,
                            cachedProps: props,
                        }

                    }
                }
            }
        }
        return null;
    }

    checkActive = (item) => {
        if (this.state.active === item)
            return 'active';
    }

    setActive = (item) => {
        this.setState({
            active: item
        })
    }

    render() {

        return (
            <div>
                <Header user={this.props.user} />
                <div className="container-fluid sticky-body">
                    <div className="row justify-content-center d-none d-lg-block " style={{ backgroundColor: 'black' }}>
                        {
                            this.state.movies ?
                                <HomeSlider
                                    settings={{
                                        interval: '10000'
                                    }}
                                    movies={this.state.movies}
                                />
                                : null
                        }
                    </div>
                    <div className="row">

                        <div className="container">
                            <div className="row mt-3 ml-5">
                                <button className={'cbtn  my-1 ' + `${this.checkActive("Now Showing")}`} onClick={() => { this.setActive("Now Showing") }}>
                                    TOP MOVIES
                                </button>
                                <button className={'cbtn  my-1 ' + `${this.checkActive("Comming Soon")}`} onClick={() => { this.setActive("Comming Soon") }}>
                                    COMING SOON
                                </button>
                                <button className="cbtn my-1">
                                    <Link style={{ color: "inherit", textDecoration: "none" }} to="/cinemas">CINEMAS</Link>
                                </button>
                            </div>
                            {
                                this.state.active === 'Now Showing' ?
                                    <HomeMovies
                                        movies={this.state.movies}
                                    /> :
                                    <HomeMovies
                                        movies={this.state.commingSoon}
                                    />
                            }

                        </div>
                    </div>
                </div>
                <Footer className="sticky-footer" />
            </div >
        )
    }
}


function mapStateToProps(state) {
    console.log(state);
    return {
        movies: state.movie.moviesList,
    }
}

export default connect(mapStateToProps)(Home)