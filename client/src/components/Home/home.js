import React, { Component } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import HomeSlider from '../Widgets/slider'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getHomeMovies } from '../../actions'
import ReactPaginate from "react-paginate";


class Home extends Component {

    state = {
        movies: [],
        cachedProps: ''
    }
    PER_PAGE = 12;

    responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    state = {
        index: 0
    }

    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex })
    };

    slideImages = [
        './assets/images/lionkingbackdrop.jpg',
        './assets/images/lionkingbackdrop.jpg',
        './assets/images/lionkingbackdrop.jpg'
    ];

    componentDidMount() {

        this.props.dispatch(getHomeMovies());
    }

    static getDerivedStateFromProps(props, state) {

        if (state.cachedProps != props) {
            if (props.movies) {
                if (props.movies.length > 0) {
                    return {
                        movies: props.movies,
                        currentPage: 0,
                        cachedProps: props
                    }
                }
            }
        }

        return null;
    }


    handlePageClick = ({ selected: selectedPage }) => {
        this.setState({
            currentPage: selectedPage
        })
    }

    render() {

        let offset = this.state.currentPage * this.PER_PAGE;
        let movies = this.state.movies;
        let moviesLength = 0;
        if (movies) { moviesLength = movies.length }
        let pageCount = Math.ceil(moviesLength / this.PER_PAGE)


        if (movies) {
            movies = this.state.movies.slice(offset, offset + this.PER_PAGE).map((movie, key) => {
                return (
                    <div className=" movie-container " key={key}>
                        <Link class="p-1" to={`/movie/${movie._id}`}>
                            <img id="postertest" className='movie-poster d-flex ' src={movie.poster_url} alt={movie.title} />

                        </Link>

                    </div>
                )
            })
        }
        return (
            <div>
                <Header user={this.props.user} />
                <div className="container-fluid sticky-body">
                    <div className="row justify-content-center d-sm-none d-lg-block" style={{ backgroundColor: 'black' }}>
                        <HomeSlider
                            settings={{
                                interval: '10000'
                            }}
                            movies={this.state.movies}
                        />
                    </div>
                    <div className="row">

                        <div className="container">
                            <div className="row mt-3 ml-5">
                                <button className="cbtn active my-1">
                                    NOW SHOWING
                                </button>
                                <button className="cbtn my-1">
                                    COMING SOON
                                </button>
                                <button className="cbtn my-1">
                                    <Link style={{ color: "inherit", textDecoration: "none" }} to="/cinemas">CINEMAS</Link>
                                </button>
                            </div>

                            <div className="row mt-3 px-5">

                                {
                                    movies
                                    // movies.map((movie, key) => {
                                    //     return (
                                    //         <div className=" movie-container " key={key}>
                                    //             <Link class="p-1" to={`/movie/${movie._id}`}>
                                    //                 <img id="postertest" className='movie-poster d-flex ' src={movie.poster_url} alt={movie.title} />

                                    //             </Link>

                                    //         </div>
                                    //     )
                                    // })
                                }

                            </div>
                            <div className="row mt-3 px-5">
                                <div className="col-12 col-md-5">
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
        movies: state.movie.moviesList
    }
}

export default connect(mapStateToProps)(Home)