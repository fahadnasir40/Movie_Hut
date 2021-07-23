import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from "react-paginate";
import { Modal } from 'react-bootstrap'
import _ from 'lodash'

class HomeMovies extends Component {

    state = {
        movies: [],
        filterModal: true,
        filter: {
            genres: [],
            ratings: [],
        },
        savedFilter: {
            genres: [],
            ratings: []
        },
        movieFiltered: false,
        currentPage: 0,
    }

    PER_PAGE = 12;

    componentDidMount() {
        if (this.props.movies) {
            this.setState({
                movies: this.props.movies,
                filteredMovies: this.props.movies,
                filterModal: false,
                currentPage: 0,
                filter: {
                    genres: [],
                    ratings: [],
                },
                savedFilter: {
                    genres: [],
                    ratings: []
                },
            })
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (state.cachedProps !== props) {
            if (props.movies) {
                if (props.movies.length > 0) {
                    return {
                        movies: props.movies,
                        filteredMovies: props.movies,
                        currentPage: 0,
                        cachedProps: props,
                        filter: {
                            genres: [],
                            ratings: [],
                        },
                        savedFilter: {
                            genres: [],
                            ratings: []
                        },
                    }
                }
            }
        }

        return null;
    }


    setShow = (value) => {
        this.setState({
            filterModal: value
        })
    }

    handleClose = () => {
        this.setShow(false);
        if ((this.state.filter !== this.state.savedFilter)) {
            this.clearFilter();
        }
    };

    handleShow = () => {
        this.setShow(true);
        if (this.state.savedFilter.genres.length > 0 || this.state.savedFilter.ratings.length > 0) {
            var copyFilter = _.cloneDeep(this.state.savedFilter);
            this.setState({
                filter: copyFilter
            })
        }
    }

    addGenreFilter = (genre) => {
        const checkFound = this.state.filter.genres.find(item => item == genre);
        let filter = this.state.filter;

        if (checkFound == null) {
            filter.genres.push(genre);
            this.setState({
                filter: filter
            })
        }
        else {
            const index = filter.genres.indexOf(genre);
            filter.genres.splice(index, 1);
            this.setState({
                filter: filter
            })
        }
    }

    checkActiveGenre = (genre) => {
        if (this.state.filter) {
            const found = this.state.filter.genres.find(item => item == genre);
            if (found)
                return 'btn-dark active'
            return '';

        }
    }

    addRatingFilter = (rating) => {
        const checkFound = this.state.filter.ratings.find(item => item == rating);
        let filter = this.state.filter;

        if (checkFound == null) {
            filter.ratings.push(rating);
            this.setState({
                filter: filter
            })
        }
        else {
            const index = filter.ratings.indexOf(rating);
            filter.ratings.splice(index, 1);
            this.setState({
                filter: filter
            })
        }
    }

    checkActiveRating = (rating) => {
        if (this.state.filter) {
            const found = this.state.filter.ratings.find(item => item == rating);
            if (found)
                return 'btn-dark active'
            return '';

        }
    }


    clearFilter = () => {
        if (this.state.filter) {
            let clearFilter = this.state.filter;
            clearFilter.genres = [];
            clearFilter.ratings = [];
            this.setState({
                filter: clearFilter,
            });

        }
    }

    submitFilter = () => {
        var copyFilter = _.cloneDeep(this.state.filter);
        this.setState({
            savedFilter: copyFilter,
            movieFiltered: true
        })
        this.handleClose();
    }

    filterMoviesModal = () => (

        <Modal
            show={this.state.filterModal} onHide={this.handleClose}
            size="lg"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="primary" closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="heading text-center" style={{ opacity: '0.8', fontSize: '18px' }}>
                    Filter Movies
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <strong className="heading">Genres</strong>
                    </div>
                    <div className="row">
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Action')}`} onClick={() => { this.addGenreFilter('Action') }}>Action</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Adventure')}`} onClick={() => { this.addGenreFilter('Adventure') }}>Adventure</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Animation')}`} onClick={() => { this.addGenreFilter('Animation') }}>Animation</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Comedy')}`} onClick={() => { this.addGenreFilter('Comedy') }}>Comedy</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Crime')}`} onClick={() => { this.addGenreFilter('Crime') }}>Crime</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Drama')}`} onClick={() => { this.addGenreFilter('Drama') }}>Drama</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Fantasy')}`} onClick={() => { this.addGenreFilter('Fantasy') }}>Fantasy</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Family')}`} onClick={() => { this.addGenreFilter('Family') }}>Family</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Horror')}`} onClick={() => { this.addGenreFilter('Horror') }}>Horror</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Mystery')}`} onClick={() => { this.addGenreFilter('Mystery') }}>Mystery</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Romance')}`} onClick={() => { this.addGenreFilter('Romance') }}>Romance</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Science Fiction')}`} onClick={() => { this.addGenreFilter('Science Fiction') }}>Science Fiction</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveGenre('Thriller')}`} onClick={() => { this.addGenreFilter('Thriller') }}>Thriller</div>


                    </div>

                    <div className="row mt-3">
                        <strong className="heading">MPAA Rating</strong>
                    </div>
                    <div className="row">
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveRating('G')}`} onClick={() => { this.addRatingFilter('G') }}>G</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveRating('PG')}`} onClick={() => { this.addRatingFilter('PG') }}>PG</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveRating('PG-13')}`} onClick={() => { this.addRatingFilter('PG-13') }}>PG-13</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveRating('R')}`} onClick={() => { this.addRatingFilter('R') }}>R</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveRating('NC-17')}`} onClick={() => { this.addRatingFilter('NC-17') }}>NC-17</div>
                        <div className={'btn btn-sm genreItem ' + `${this.checkActiveRating('Not Rated')}`} onClick={() => { this.addRatingFilter('Not Rated') }}>Not Rated</div>
                    </div>
                </div>

                <div className="row mt-5">
                    <span className="col-12 text-center">
                        <div className="btn btn-light mr-4" onClick={this.clearFilter}>Clear</div>
                        <div className="btn btn-dark" onClick={this.submitFilter}>Save</div>
                    </span>
                </div>
            </Modal.Body>
        </Modal>
    )


    getFilterCheck = () => {
        if (this.state.savedFilter) {
            if (this.state.savedFilter.genres.length > 0 || this.state.savedFilter.ratings.length > 0)
                return ('btn-dark');
        }
        return ('btn-dark-outlined');
    }

    filterMovies = () => {
        if (this.state.movies) {
            const movies = this.state.movies;
            const savedFilter = this.state.savedFilter;
            let filteredMovies = movies.filter(function (movie) {
                if (savedFilter.ratings.includes(movie.certification))
                    return true;
                else if (movie.certification === null && savedFilter.ratings.includes('Not Rated'))
                    return true;

                if (movie.genreList != null) {
                    for (var i = 0; i < savedFilter.genres.length; i++) {
                        if (movie.genreList.includes(savedFilter.genres[i]) == true)
                            return true;
                    }
                }
            });

            if (this.state.savedFilter.genres.length == 0 && this.state.savedFilter.ratings.length == 0) {
                this.setState({
                    filteredMovies: this.state.movies,
                    movieFiltered: false,
                })
            }
            else {
                this.setState({
                    filteredMovies: filteredMovies,
                    movieFiltered: false,
                })
            }
        }

    }

    handlePageClick = ({ selected: selectedPage }) => {
        this.setState({
            currentPage: selectedPage
        })
    }

    render() {

        if (this.state.movieFiltered == true) {
            this.filterMovies();
        }
        let offset = this.state.currentPage * this.PER_PAGE;
        let movies = this.state.filteredMovies;
        let moviesLength = 0;
        if (movies) { moviesLength = movies.length }
        let pageCount = Math.ceil(moviesLength / this.PER_PAGE)
        if (this.props.pagination !== false) {
            if (movies) {
                movies = this.state.filteredMovies.slice(offset, offset + this.PER_PAGE).map((movie, key) => {
                    return (
                        <div className=" movie-container " key={key}>
                            <Link class="p-1" to={`/movie/${movie._id}`}>
                                <img id="postertest" className='movie-poster d-flex ' src={movie.poster_url} alt={movie.title} />

                            </Link>

                        </div>
                    )
                })
            }
        }
        else {
            if (movies) {
                movies = this.state.filteredMovies.map((movie, key) => {
                    return (
                        <div className=" movie-container " key={key}>
                            <Link class="p-1" to={`/movie/${movie._id}`}>
                                <img id="postertest" className='movie-poster d-flex ' src={movie.poster_url} alt={movie.title} />

                            </Link>

                        </div>
                    )
                })
            }
        }

        return (
            <div className="container">

                {this.filterMoviesModal()}
                <div className="row px-5 mr-md-5">
                    <div className={'btn btn-sm  ml-auto mb-1 mr-md-5 ' + `${this.getFilterCheck()}`} onClick={this.handleShow}>
                        <i class="fas fa-filter" style={{ opacity: '0.8' }}></i>  Filter
                    </div>
                </div>
                <div className="row px-5">

                    {
                        movies
                    }

                </div>
                {
                    this.props.pagination !== false ?
                        <div className="row mt-3 mb-2 px-5">
                            <div className="col-12 col-lg-6">
                                <ReactPaginate
                                    previousLabel={"← Previous"}
                                    nextLabel={"Next →"}
                                    pageCount={pageCount}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"pagination__link"}
                                    nextLinkClassName={"pagination__link"}
                                    disabledClassName={"pagination__link--disabled"}
                                    activeClassName={"pagination__link--active"}
                                />

                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }
}

export default HomeMovies;