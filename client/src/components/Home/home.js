import React, { Component } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import HomeSlider from '../Widgets/slider'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getHomeMovies, getRecommendedMovies, getCinemaHomeMovies } from '../../actions'
import HomeMovies from './homeMovies';
import _ from 'lodash'
class Home extends Component {

    state = {
        movies: [],
        commingSoon: [],
        recommendedMovies: [],
        cinemaMovies: '',
        cachedProps: '',
        active: 'Top Movies',
        activeCinemas: 'Now Showing'
    }

    componentDidMount() {
        this.props.dispatch(getHomeMovies());
        this.props.dispatch(getCinemaHomeMovies());
        if (this.props.user.login) {
            if (this.props.user.login.isAuth == true) {
                this.props.dispatch(getRecommendedMovies());
            }
        }
    }

    static getDerivedStateFromProps(props, prevState) {
        console.log(props);
        if (prevState.cachedProps !== props) {

            if (props.recommendedMovies != prevState.recommendedMovies) {
                return {
                    recommendedMovies: props.recommendedMovies,
                    cachedProps: props,
                }
            }

            if (props.cinemaMovies != prevState.cinemaMovies) {
                if (props.movies.moviesList) {
                    if (props.movies.moviesList) {
                        if (props.movies.moviesList.length > 0) {
                            return {
                                movies: props.movies.moviesList,
                                commingSoon: props.movies.commingSoon,
                                recommendedMovies: props.recommendedMovies,
                                cinemaMovies: props.cinemaMovies,
                                cachedProps: props,
                            }

                        }
                    }
                }
                return {
                    cinemaMovies: props.cinemaMovies,
                    cachedProps: props,
                }
            }
            if (props.movies.moviesList) {
                if (props.movies.moviesList) {
                    if (props.movies.moviesList.length > 0) {
                        return {
                            movies: props.movies.moviesList,
                            commingSoon: props.movies.commingSoon,
                            recommendedMovies: props.recommendedMovies,
                            cinemaMovies: props.cinemaMovies,
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

    checkActiveCinemas = (item) => {
        if (this.state.activeCinemas === item)
            return 'active';
    }

    setActiveCinemas = (item) => {
        this.setState({
            activeCinemas: item
        })
    }

    render() {
        let nowShowing = [];
        let commingSoon = [];


        if (this.state.cinemaMovies) {
            if (this.state.cinemaMovies.nowShowing)
                nowShowing = this.state.cinemaMovies.nowShowing;
            if (this.state.cinemaMovies.commingSoon)
                commingSoon = this.state.cinemaMovies.commingSoon;
        }

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
                            {
                                this.state.cinemaMovies ?
                                    nowShowing.length > 0 || commingSoon.length > 0 ?
                                        <div className="my-2">
                                            <div className="row mt-3 ml-5">
                                                <button className={'cbtn  my-1 ' + `${this.checkActiveCinemas("Now Showing")}`} onClick={() => { this.setActiveCinemas("Now Showing") }}>
                                                    NOW SHOWING
                                                </button>
                                                <button className={'cbtn  my-1 ' + `${this.checkActiveCinemas("Upcomming Shows")}`} onClick={() => { this.setActiveCinemas("Upcomming Shows") }}>
                                                    UPCOMMING SHOWS
                                                </button>
                                                <div className="col text-right">
                                                    <div className="heading mx-5 my-2">IN CINEMAS</div>
                                                </div>
                                            </div>

                                            {this.state.activeCinemas === 'Now Showing' ?
                                                nowShowing.length > 0 ?
                                                    <HomeMovies
                                                        movies={this.state.cinemaMovies.nowShowing}
                                                        pagination={false}
                                                        filter={false}
                                                    /> : <span className="row m-5 nt-3">No shows available for today</span>
                                                : this.state.activeCinemas === 'Upcomming Shows' ?
                                                    commingSoon.length > 0 ?
                                                        <HomeMovies
                                                            movies={this.state.cinemaMovies.commingSoon}
                                                            pagination={false}
                                                            filter={false}
                                                        /> : <span className="row m-5 nt-3">No upcomming shows available</span>
                                                    : null


                                            }

                                        </div>
                                        : null
                                    : null
                            }


                            <div className="row mt-4 ml-5">
                                <button className={'cbtn  my-1 ' + `${this.checkActive("Top Movies")}`} onClick={() => { this.setActive("Top Movies") }}>
                                    TOP MOVIES
                                </button>
                                <button className={'cbtn  my-1 ' + `${this.checkActive("Comming Soon")}`} onClick={() => { this.setActive("Comming Soon") }}>
                                    COMING SOON
                                </button>
                                {
                                    this.props.user.login.isAuth ?
                                        <button className={'cbtn  my-1 ' + `${this.checkActive("Recommended")}`} onClick={() => { this.setActive("Recommended") }}>
                                            RECOMMENDED
                                        </button>

                                        : null
                                }
                                <button className="cbtn my-1">
                                    <Link style={{ color: "inherit", textDecoration: "none" }} to="/cinemas">CINEMAS</Link>
                                </button>
                            </div>
                            {
                                this.state.active === 'Top Movies' ?
                                    <HomeMovies
                                        movies={this.state.movies}
                                    /> :
                                    this.state.active === 'Comming Soon' ?
                                        this.state.commingSoon.length > 0 ?
                                        <HomeMovies
                                            movies={this.state.commingSoon}
                                        />
                                        : <span className="row m-5 nt-3">No coming soon movies available</span>
                                        : this.state.active === 'Recommended' ?
                                            this.state.recommendedMovies ?
                                                < HomeMovies
                                                    movies={this.state.recommendedMovies}

                                                />
                                                : <span className="row m-5 nt-3">No recommended movies available</span>


                                            : null
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

    return {
        movies: state.movie.moviesList,
        recommendedMovies: state.movie.recommendedMovies,
        cinemaMovies: state.movie.cinemaMovies
    }
}

export default connect(mapStateToProps)(Home)