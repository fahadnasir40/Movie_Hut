import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../Header/header'
import { Link } from 'react-router-dom'
import Footer from '../Footer/footer'
import { getCinemaShowingMovies, clearCinema } from '../../actions'
import moment from 'moment'

class MoviesCinmeas extends Component {

    state = {
        cinemaId: '',
        current: 'now-showing',
        cinema: '',
        moviesList: [],
        showtimes: [],
        nowShowingList: [],
        comingSoonList: [],
        today: new moment(),
        nowShowingCount: 0,
        comingSoonCount: 0,
        cachedProps: '',


    }

    handleClick = (e) => {
        this.setState({ current: e.target.id })
    }

    componentDidMount() {
        const cinemaId = this.props.match.params.cinemaId

        if (!cinemaId) {
            this.props.history.push('/cinemas')
        }
        else {
            this.setState({ cinemaId: cinemaId });

            this.props.dispatch(getCinemaShowingMovies(cinemaId));
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {


        if (nextProps.data) {
            if (nextProps.data.cinema) {
                const date = moment(prevState.today).add(0, "days").toDate();
                let comingSoonList = [], nowShowingList = [];

                nextProps.data.showData.forEach(show => {
                    if (moment(show.showtimeDate).startOf("day").diff(moment()) < 0) {
                        const movie = nowShowingList.find(({ movieId }) => movieId === show.movieId);
                        if (!movie)
                            nowShowingList.push(show)
                    }
                    else {
                        const movie = comingSoonList.find(({ movieId }) => movieId === show.movieId);
                        if (!movie)
                            comingSoonList.push(show)
                    }
                });

                return {
                    cinema: nextProps.data.cinema,
                    moviesList: nextProps.data.movies,
                    showtimes: nextProps.data.showData,
                    nowShowingList: [...nowShowingList],
                    comingSoonList: [...comingSoonList],
                }

            }
        }

        return null;
    }

    showItems = () => {


        if (this.state.current === 'now-showing') {

            return this.state.nowShowingList.map((show, key) => {
                const movie = this.state.moviesList.find(({ _id }) => _id === show.movieId);

                return (
                    <div className=" movie-container m-3 " key={key}>
                        <Link class="p-1" to={`/movie/${movie._id}`}>
                            <img id="postertest" className='movie-poster d-flex ' src={movie.poster_url} alt={movie.title} />
                        </Link>
                    </div>
                )

            })

        }
        else if (this.state.current === 'coming-soon') {
            return this.state.comingSoonList.map((show, key) => {
                const movie = this.state.moviesList.find(({ _id }) => _id === show.movieId);

                return (
                    <div className=" movie-container m-3 " key={key}>
                        <Link class="p-1" to={`/movie/${movie._id}`}>
                            <img id="postertest" className='movie-poster d-flex ' src={movie.poster_url} alt={movie.title} />
                        </Link>
                    </div>
                )

            })
        }


    }

    checkCity = (value) => {
        if (this.state.current == value) {
            return "cities-names-active"
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearCinema());
    }

    render() {

        return (
            <div className="sticky-body">
                <Header user={this.props.user} />
                <div className="container">
                    <div className="row mt-3 pl-2">
                        <nav aria-label="breadcrumb" style={{ background: "white" }}>
                            <ol className="breadcrumb heading" style={{ background: "inherit", color: "black" }}>
                                <li className="breadcrumb-item" ><Link to="/" style={{ color: "black" }}>HOME</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"><Link to="/cinemas" style={{ color: "black" }}>CINEMAS</Link></li>
                                <li className="breadcrumb-item active text-uppercase" aria-current="page">{this.state.cinema.city}</li>

                                <li className="breadcrumb-item active text-uppercase" aria-current="page">{this.state.cinema.name}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="showtime-container ml-xl-1 row my-1">
                        <div id="now-showing" onClick={this.handleClick} className={` my-1 pl-4 pr-4 cities-names ${this.checkCity("now-showing")} `}>
                            NOW SHOWING
                        </div>
                        <div id="coming-soon" onClick={this.handleClick} className={` my-1 pl-4 pr-4 cities-names ${this.checkCity("coming-soon")} `}>
                            COMING SOON
                        </div>
                    </div>
                    <div className="row">
                        {
                            this.showItems()
                        }
                        {this.state.nowShowingList.length === 0 && this.state.current === 'now-showing' ?
                            <div className="col m-2 p-3">
                                <h5 className="text-muted">No movie shows avaiable today.</h5>
                            </div> :
                            this.state.comingSoonList.length === 0 && this.state.current === 'coming-soon' ?
                                <div className="col m-2 p-3">
                                    <h5 className="text-muted">No upcomming shows available.</h5>
                                </div> : null}
                    </div>

                </div>
                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        data: state.cinema.cinemaMovies
    }
}

export default connect(mapStateToProps)(MoviesCinmeas)