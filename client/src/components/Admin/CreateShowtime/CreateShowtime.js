import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../../Header/header'
import { Link, Redirect } from 'react-router-dom'
import { addShowtime, clearCinemaMovie, clearShowtime, getCinemaMovies } from '../../../actions';
import { connect } from 'react-redux';
import Moment from 'react-moment';

class CreateShowtime extends Component {
    setDate = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }
    setDateMax = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 3; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }
    state = {
        // name: '',
        // language: 'English',
        // date: '',
        // time: '',
        // screenType: '',
        moviesList: [],
        dupList: [],
        redirect: false,
        cachedProps: ''
    }

    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleInputLanguage = (event) => {
        this.setState({ language: event.target.value })
    }
    handleInputDate = (event) => {
        this.setState({ date: event.target.value })
    }
    handleInputTime = (event) => {
        this.setState({ time: event.target.value })
    }
    handleInputScreen = (event) => {
        this.setState({ screenType: event.target.value })
    }


    static getDerivedStateFromProps(nextProps, state) {

        if (nextProps != state.cachedProps) {
            if (nextProps.cinemaInfo) {
                if (nextProps.cinemaInfo.movies) {
                    return {
                        moviesList: nextProps.cinemaInfo.movies.reverse(),
                        dupList: nextProps.cinemaInfo.movies.reverse(),
                        cachedProps: nextProps
                    }
                }
            }
        }
        return null;
    }

    componentWillUnmount() {
        this.props.dispatch(clearShowtime());
        this.props.dispatch(clearCinemaMovie());
    }

    componentDidMount() {
        let id = this.props.match.params.cinemaId;
        this.props.dispatch(getCinemaMovies(id));
        this.setState({
            cinemaId: id
        })
    }

    handleSearchChange = (e) => {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.moviesList;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.title.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.moviesList;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            dupList: newList
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <Header />

                <div className="container-fluid">
                    <div className="container">

                        <div className="row ">
                            <div className="col col-md-4 my-4">
                                <h4>Create new showtime</h4>
                            </div>
                            <div className="col my-4 mr-md-5">
                                <div className="float-right mr-md-2">
                                    <Link to={`/addMovie/${this.state.cinemaId}`} className="btn btn-dark"><i className="fa fa-cup"> </i>  New Movie</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group col-md-4 col float-right  mb-3 mr-md-5">

                                    <div class="input-group-prepend ">
                                        <span class="input-group-text " style={{ backgroundColor: "black" }} id="basic-addon1">
                                            <i className="fa fa-search" style={{ color: '#ffff' }}></i></span>
                                    </div>
                                    <input type="text" onChange={this.handleSearchChange} class="form-control" placeholder="Search Movie" aria-label="Search" aria-describedby="basic-addon1" />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row d-flex mx-md-5 px-md-5" style={{ float: "none", justifyContent: 'between' }}>

                        {
                            this.state.dupList.map((movie, key) => {
                                return (
                                    <div key={key} className=' cinema-movie-container  d-flex flex-row my-2 mx-md-4 mx-1 rounded border p-2 display-inline '>

                                        <div className="d-inline" >
                                            <img id="postertest" className='poster-small d-flex mr-3 ' src={movie.poster_url} alt="movie-poster" />
                                        </div>
                                        <div className="d-inline">
                                            <Link to={`/movie/${movie._id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                                                <strong >
                                                    {movie.title}
                                                </strong>
                                            </Link>

                                            <div>
                                                Release: {movie.releaseDate ? <Moment format="DD-MM-YYYY">{movie.releaseDate}</Moment> : 'N/A'}
                                            </div>
                                            <div>
                                                Runtime: {movie.runtime} Minutes
                                            </div>
                                            <div>
                                                Rating: {movie.rating}
                                            </div>

                                            <div>
                                                <Link to={{
                                                    pathname: `/showtimes`,
                                                    showtimeProps: {
                                                        cinemaId: this.state.cinemaId,
                                                        movie: movie
                                                    }
                                                }} className="btn btn-dark my-3">
                                                    Showtimes
                                                </Link>
                                            </div>
                                            {/* <div>
                                                <button className="btn border my-1">
                                                    Edit Showtime
                                                    </button>
                                            </div> */}
                                        </div>

                                    </div>

                                )
                            })
                        }

                    </div >
                </div >
            </div >
        )
    }
}

/* <Form className="mt-3" onSubmit={this.handleSubmit}>
                <Form.Group className="input-style" controlId="moviename">
                    <Form.Label>Movie Name</Form.Label>
                    <Form.Control
                        autoFocus
                        placeholder="Movie Name"
                        value={this.state.name}
                        onChange={this.handleInputName}
                    />
                </Form.Group>
                <Form.Group className="input-style" controlId="language">
                    <Form.Label>Language</Form.Label>
                    <select id="language" name="language" onChange={this.handleInputLanguage}>
                        <option value="english">English</option>
                        <option value="urdu">Urdu</option>
                    </select>
                </Form.Group>
                <Form.Group className="input-style" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        min={this.setDate()}
                        max={this.setDateMax()}
                        value={this.state.date}
                        onChange={this.handleInputDate}
                    />
                </Form.Group>
                <Form.Group className="input-style" controlId="time">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Time"
                        value={this.state.time}
                        onChange={this.handleInputTime}
                    />
                </Form.Group>
                <Form.Group className="input-style" controlId="screen">
                    <Form.Label>Screen type</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Screen Type"
                        value={this.state.screenType}
                        onChange={this.handleInputScreen}
                    />
                    {/* <select id="type" name="type">
                        <option value="gold1">Gold-1</option>
                        <option value="gold2">Gold-2</option>
                        <option value="plat1">Platinum-1</option>
                        <option value="plat2">Platinum-2</option>
                    </select> */
/* </Form.Group>
                        <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                            SAVE
                                </Button>
                            </Form> */





function mapStateToProps(state) {
    return {
        cinemaInfo: state.cinema.cinemaMoviesList
    }
}

export default connect(mapStateToProps)(CreateShowtime);