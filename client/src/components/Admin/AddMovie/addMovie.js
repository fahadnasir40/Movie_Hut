import React, { Component } from 'react'
import Header from '../../Header/header'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { getMovieByName, getMovieFromTMDB, addMovieInCinema, clearMovie, clearCinemaMovie } from '../../../actions'
import { Modal } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

class AddMovie extends Component {

    state = {
        name: '',
        movieInfo: '',
        tmdb: null,
        show: false,
        loading: false,
        searching: false,
        redirect: false,
    }

    handleInputChange = (event) => {
        this.setState({
            name: event.target.value
        })

    }

    submitForm = () => {

        if (this.state.name) {
            this.props.dispatch(getMovieByName(this.state.name.trim()));
        }
        else {
            this.setState({
                movieInfo: ''
            })
        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("Next Props: ", nextProps.movieDetails, "Prev State", prevState)

        if (nextProps.postDetails) {

            if (nextProps.postDetails.post == true) {

                return ({
                    redirect: true
                })

            }
        }

        if (nextProps.movieDetails) {
            if (nextProps.movieDetails.movie) {
                let tmdb = null;
                if (nextProps.movieDetails.tmdb)
                    tmdb = nextProps.movieDetails.tmdb;

                return {
                    movieInfo: nextProps.movieDetails.movie,
                    notFound: false,
                    searching: false,
                    tmdb: tmdb
                }
            }
            else if (nextProps.movieDetails.found == false) {
                return {
                    movieInfo: '',
                    notFound: true,
                    searching: false,
                    tmdb: null
                }
            }
            else
                return { movieInfo: '', };
        }
        return null;
    }

    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);
    getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    playTrailer = (videos) => {
        if (videos.length > 0) {
            return (

                <Modal
                    show={this.state.show} onHide={this.handleClose}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    // className="container-fluid"

                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header className="primary" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="heading text-center" style={{ opacity: '0.8', fontSize: '18px' }}>
                            Movie Trailer
                        </Modal.Title>
                    </Modal.Header>
                    <div className="trailer-body m-0 mt-n1 p-0 primary" >
                        <div className="trailer-container">
                            <iframe className="player" type="text/html" width="100%" height="100%"
                                src={'https://www.youtube-nocookie.com/embed/' + this.getVideoId(videos[0]) + '?autoplay=1&loop=1&modestbranding=1&playlist=' + this.getVideoId(videos[0])} frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
                                allowfullscreen="1"
                                webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
                        </div>
                    </div>
                </Modal>
            )
        }

    }

    closeMovie = () => {
        this.props.dispatch(clearMovie())
    }

    getMovieTMDB = () => {
        if (this.state.name) {
            this.props.dispatch(getMovieFromTMDB(this.state.name.trim()))
            this.setState({
                searching: true
            })
        }
    }

    saveMovie = () => {
        if (this.state.movieInfo) {
            let movieData = {
                cinemaID: this.props.match.params.cinemaId,
                movie: this.state.movieInfo,
                tmdb: this.state.tmdb
            }
            this.props.dispatch(addMovieInCinema(movieData))
            this.setState({
                loading: true
            })
        }
    }

    componentDidMount() {
        this.setState({
            cinemaId: this.props.match.params.cinemaId
        })
    }

    componentWillUnmount() {
        this.props.dispatch(clearMovie());
        this.props.dispatch(clearCinemaMovie());
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={`/create-showtime/${this.props.match.params.cinemaId}`} />
        }

        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col my-3">
                            <h3>Add movie</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="input-group col-md-6 col  mb-3 mr-md-5">
                                <div class="input-group-prepend ">
                                    <span class="input-group-text " style={{ backgroundColor: "black" }} id="basic-addon1">
                                        <i className="fa fa-search" style={{ color: '#ffff' }}></i></span>
                                </div>
                                <input type="text" value={this.state.name} onChange={this.handleInputChange} class="form-control" placeholder="Enter Movie Name"
                                    aria-label="Search" aria-describedby="basic-addon1" required />
                                <button type="button" onClick={this.submitForm} className="btn btn-dark mx-3"> Search </button>
                            </div>
                            {
                                this.state.notFound == true ?
                                    <div className="col-md-6 col">
                                        <Link to="#" onClick={this.getMovieTMDB}>Search movie from TMDB.</Link>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="row ">
                        {
                            this.state.movieInfo ?
                                <section className="col border rounded" >
                                    {this.playTrailer(this.state.movieInfo.videoLinks)}
                                    <div >

                                        <div className="col-12 m-md-4 m-2">
                                            <div className=" mx-1 float-right">
                                                <button type="button" onClick={this.closeMovie} class="close" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="media ">
                                                <img id="postertest" className='poster d-flex mr-3 ' src={this.state.movieInfo.poster_url} alt="movie-poster" />

                                                <div class="media-body">
                                                    <div className=" d-md-none">
                                                        <div className="movie-details">
                                                            <h5 className="title">
                                                                {this.state.movieInfo.title}
                                                            </h5>
                                                            <p><Moment format="DD/MM/YYYY">{this.state.movieInfo.releaseDate}</Moment></p>
                                                        </div>
                                                        <button className=" btn  btn-dark mr-2" onClick={this.handleShow}><i class="fa fa-play"></i> Play Trailer</button>

                                                    </div>

                                                    <div className="movie-details d-none d-md-block col-lg-8 col-xl-7">
                                                        <h3 className="title">
                                                            {this.state.movieInfo.title}
                                                        </h3>
                                                        <p><Moment format="DD/MM/YYYY">{this.state.movieInfo.releaseDate}</Moment>
                                                            {this.state.movieInfo.genreList.map((genre, i) => {
                                                                return (<span key={i} > {(i ? ', ' : '') + genre}</span>)
                                                            })}
                                                        </p>
                                                        <p><span className="border border-dark rounded px-1 mx-1 ">{this.state.movieInfo.certification ? this.state.movieInfo.certification : 'N/A'}</span>   <i class="fa fa-clock-o" aria-hidden="true" style={{ color: "#212121", opacity: '0.9' }}></i> {this.state.movieInfo.runtime} Minutes</p>

                                                        <h6>Overview</h6>
                                                        <p>{this.state.movieInfo.description}
                                                        </p>

                                                        <div className="d-none d-md-block">
                                                            <button className=" btn  btn-dark" onClick={this.handleShow}><i class="fa fa-play"></i> Play Trailer</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col my-1 mr-4 ml-n3 mx-md-3 p-4'>
                                                <button className=" btn  btn-dark float-md-right" onClick={this.saveMovie} disabled={this.state.loading}> Save Movie to Cinema</button>
                                            </div>

                                        </div>

                                        <div className="col-12 d-block d-md-none mt-2">
                                            <h6 className="heading">
                                                Movie Details
                                            </h6>
                                            <p><Moment format="DD/MM/YYYY">{this.state.movieInfo.releaseDate}</Moment>
                                                {this.state.movieInfo.genreList.map((genre, i) => {
                                                    return (<span key={i} > {(i ? ', ' : '') + genre}</span>)
                                                })}</p>
                                            <p><span className="border border-dark rounded px-1 mx-1 ">{this.state.movieInfo.certification ? this.state.movieInfo.certification : 'N/A'}</span> <i class="fa fa-clock-o" aria-hidden="true" style={{ color: "#212121", opacity: '0.9' }}></i> {this.state.movieInfo.runtime} Minutes</p>

                                            <h6>Overview</h6>
                                            <p>{this.state.movieInfo.description}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                                : this.state.searching == true ? <div className="m-4 p-2">Searching...</div>
                                    : null
                        }

                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        movieDetails: state.movie.movieDetails,
        postDetails: state.cinema.cinemaMovie
    }
}

export default connect(mapStateToProps)(AddMovie);