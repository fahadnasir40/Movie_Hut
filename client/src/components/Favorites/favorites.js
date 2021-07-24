import React, { Component } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { connect } from 'react-redux'
import { getFavoriteMovies } from '../../actions'
import { Link } from 'react-router-dom'

class Favorites extends Component {

    state = {
        moviesList: [],
        cachedProps: '',
    }

    componentDidMount() {
        this.props.dispatch(getFavoriteMovies())
    }

    static getDerivedStateFromProps(props, prevState) {

        if (props != prevState.cachedProps) {
            if (props.favoriteMovies) {
                if (props.favoriteMovies.length > 0) {
                    return {
                        moviesList: props.favoriteMovies,
                        cachedProps: props
                    }
                }
            }
        }
        return null;
    }


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

                    <div className="row">
                        <div class="row d-flex p-2" style={{ float: "none", justifyContent: 'between' }}>

                            {
                                this.state.moviesList.map((movie, key) => {
                                    return (
                                        <div key={key} className=' cinema-movie-container  d-flex flex-row my-2 mx-md-4 mx-1 rounded border p-2 display-inline '>

                                            <div className="d-inline" >
                                                <img id="postertest" className='poster-small d-flex mr-3' src={movie.poster_url} alt="movie-poster" />
                                            </div>
                                            <div className="d-inline">
                                                <Link to={`/movie/${movie._id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                                                    <strong >
                                                        {movie.title}
                                                    </strong>
                                                </Link>

                                                <div>
                                                    Release: {movie.releaseDate}
                                                </div>
                                                <div>
                                                    Runtime: {movie.runtime} Minutes
                                                </div>
                                                <div>
                                                    Rating: {movie.rating}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {this.state.moviesList.length == 0 ? <span className="m-5 text-muted">No favorite movies added yet. </span> : null
                            }
                        </div >
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
        favoriteMovies: state.movie.favoriteMovies
    }
}

export default connect(mapStateToProps)(Favorites)