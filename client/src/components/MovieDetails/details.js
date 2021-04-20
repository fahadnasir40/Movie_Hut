import React, { Component } from 'react';
import Header from '../Header/header';
import { Modal } from 'react-bootstrap'
import Footer from '../Footer/footer'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Review from '../Review/review';

import { getMovieInfo, } from '../../actions';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import moment from 'moment';
import showtimes from '../Admin/CreateShowtime/showtimes';


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const items = [
    <iframe className="player item" type="text/html" width="300px" height="300px"
        src={'https://www.youtube-nocookie.com/embed/HfiH_526qhY'} frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
        allowfullscreen="1"
        webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>,
    <iframe className="player item" type="text/html" width="300px" height="300px"
        src={'https://www.youtube-nocookie.com/embed/HfiH_526qhY'} frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
        allowfullscreen="1"
        webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>,
    <iframe className="player item" type="text/html" width="300px" height="300px"
        src={'https://www.youtube-nocookie.com/embed/HfiH_526qhY'} frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
        allowfullscreen="1"
        webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>,
    <iframe className="player item" type="text/html" width="300px" height="300px"
        src={'https://www.youtube-nocookie.com/embed/HfiH_526qhY'} frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
        allowfullscreen="1"
        webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>,
    <div className="item" data-value="4">4</div>,
    <div className="item" data-value="5">5</div>,
];

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            castToDisplay: 14
        };
    }


    componentDidMount = () => {
        this.props.dispatch(getMovieInfo(this.props.match.params.movieId));
    }

    static getDerivedStateFromProps(props, state) {
        console.log("Props", props)
        if (props.movie.movieInfo) {
            return {
                movieInfo: props.movie.movieInfo.movie,
                showtimeInfo: props.movie.movieInfo.showtime,
                cinemaInfo: props.movie.movieInfo.cinema
            }
        }
        return null;
    }

    state = {
        show: false,
        selectedDate: moment()
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

                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="xl"
                    dialogClassName="modal-90w"
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

    showMore = () => {
        let castLength = this.state.movieInfo.cast.length;
        this.setState({ castToDisplay: castLength });
    }

    showLess = () => {
        this.setState({ castToDisplay: 12 });
    }

    handleSelectedDate = (date) => {
        this.setState({
            selectedDate: date
        })
    }

    getShowtimeDates = () => {
        const today = moment().startOf('day');;

        const days = [0, 0, 0, 0, 0, 0];
        var i = 0;
        return days.map((d, key) => {
            const date = moment(today).add(i++, "days").toDate();
            let c = (moment(this.state.selectedDate).isSame(date, "date")) ? 'active' : '';
            return (
                <div className={`showtime-date ${c}`} onClick={() => { return this.handleSelectedDate(date) }}>
                    <div>
                        <Moment date={date} format="MMM" />
                    </div>
                    <div>
                        <Moment date={date} format="ddd" />  <Moment date={date} format="DD" />
                    </div>
                </div>
            )
        });
    }

    getScreenPlays = () => {
        console.log("State", this.state);
        if (this.state.cinemaInfo) {
            if (this.state.showtimeInfo.some(item => moment(item.date).isSame(this.state.selectedDate, "date"))) {

                return this.state.cinemaInfo.map(cinema => {

                    var showtimeCinemas = this.state.showtimeInfo.some(item => {
                        if (item.cinemaId == cinema._id &&
                            moment(item.date).isSame(this.state.selectedDate, "date")) return true;
                        else return false
                    });
                    console.log("Showtimes", showtimeCinemas);
                    if (showtimeCinemas) {
                        return (
                            <div className="row col-12 ">
                                <div className="offset-lg-2 offset-xl-2 ">
                                    <div className="ml-xl-4  ml-lg-n1 my-3 ">
                                        <div className="col-12  my-4">
                                            <div className="cinema-title font-text ml-xs-n2  font-weight-bold">
                                                {cinema.name} {cinema.address}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {
                                                this.state.showtimeInfo.map((showtime, key) => {
                                                    if (cinema._id == showtime.cinemaId && moment(showtime.date).isSame(this.state.selectedDate, "date")) {
                                                        return (
                                                            <div className="col" key={key}>
                                                                <div className=" session-container">
                                                                    <span className="text-capitalize session ">
                                                                        Screen {showtime.screenType} {showtime.language == 'Urdu' ? '(Urdu)' : null}
                                                                    </span>
                                                                    <span className="attribute ml-2 border">
                                                                        <Moment date={showtime.date} format="hh:mm A" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8">
                                    <div className="offset-lg-2 offset-xl-4">
                                        <Link to={{ pathname: `http://${cinema.url}` }} target="_blank" className="btn border ml-lg-2 ml-xl-n2 mb-3"><i className="fa fa-send"></i>  Visit Site</Link>
                                    </div>
                                </div>
                            </div>


                        )
                    }

                }

                )
            }
            else {
                return <div className="row col-12 ">
                    <div className="offset-lg-2 offset-xl-2 p-2">
                        <div className="ml-xl-4  ml-lg-n1 my-3 text-muted"> No showtimes available.  </div>
                    </div>
                </div>

            }
        }
    }



    render() {
        let cast = '';
        if (this.state.movieInfo)
            cast = this.state.movieInfo.cast;

        return (
            <div>
                <Header />


                {
                    this.state.movieInfo ?
                        <div className="container-fluid mt-md-4 mt-3 overflow-hidden">
                            {this.playTrailer(this.state.movieInfo.videoLinks)}
                            <section className="row">
                                <div className="  p-md-2 rounded ">

                                    <div className="col-12 offset-lg-1 offset-xl-2  px-2">
                                        <div className="media p-1">

                                            <img id="postertest" className='poster d-flex mr-3 ' src={this.state.movieInfo.poster_url} alt="movie-poster" />


                                            <div className="media-body">

                                                <div className=" d-md-none">
                                                    <div className="movie-details">
                                                        <h5 className="title">
                                                            {this.state.movieInfo.title}
                                                        </h5>
                                                        <p><Moment format="DD/MM/YYYY">{this.state.movieInfo.releaseDate}</Moment></p>
                                                    </div>
                                                    <button className=" btn  btn-dark mr-2" onClick={this.handleShow}><i className="fa fa-play"></i> Play Trailer</button>
                                                    <button className=" btn-dark btn my-2 d-md-none " ><i className="fa fa-heart"> Favorite</i></button>
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
                                                    <p><span className="border border-dark rounded px-1 mx-1 ">{this.state.movieInfo.certification ? this.state.movieInfo.certification : 'N/A'}</span>   <i className="fa fa-clock-o" aria-hidden="true" style={{ color: "#212121", opacity: '0.9' }}></i> {this.state.movieInfo.runtime} Minutes</p>

                                                    <h6>Overview</h6>
                                                    <p>{this.state.movieInfo.description}
                                                    </p>

                                                    <div className="d-none d-md-block">
                                                        <button className=" btn  btn-dark" onClick={this.handleShow}><i className="fa fa-play"></i> Play Trailer</button>
                                                        <button className=" btn-dark btn-circle ml-2" ><i className="fa fa-heart"></i></button>
                                                    </div>
                                                </div>
                                            </div>
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
                                        <p><span className="border border-dark rounded px-1 mx-1 ">{this.state.movieInfo.certification ? this.state.movieInfo.certification : 'N/A'}</span> <i className="fa fa-clock-o" aria-hidden="true" style={{ color: "#212121", opacity: '0.9' }}></i> {this.state.movieInfo.runtime} Minutes</p>

                                        <h6>Overview</h6>
                                        <p>{this.state.movieInfo.description}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="row">
                                <section className="col-lg-8  col-12 " >
                                    {/* ---------Showtimes--------- */}
                                    <div className="row col-12  m-0 ">

                                        <div className=" offset-lg-2 offset-xl-2 " >
                                            <div className="ml-xl-4 ml-md-3 ml-lg-n1 ml-sm-2 my-3">
                                                <h5 className="heading ml-xl-1  mt-1">SHOWTIMES</h5>
                                                {/* --------Showtime Dates-------- */}

                                                <div className=" showtime-container  ml-xl-1  row  my-3 ">

                                                    {this.getShowtimeDates()}
                                                </div>

                                            </div>
                                        </div>
                                        {/* --------Screen Plays-------- */}
                                        {this.getScreenPlays()}


                                    </div>

                                    {/* Video Slider */}
                                    {/* <div className="row col-12 slider-details">
                                        Slider ///
                                    <div className="offset-lg-2 offset-xl-2">

                                            <AliceCarousel
                                                mouseTracking
                                                items={items}
                                                responsive={responsive}
                                            />
                                        </div>
                                    </div> */}
                                    <div className="row my-4 order-last">
                                        <div className=" col-12 offset-lg-2 offset-xl-2 col-lg-10 ">
                                            <Review />
                                        </div>
                                    </div>
                                </section>

                                <section className="col-lg-4 col-md-6 col-xl-3 col-sm-9 col-xs-12 mb-3">

                                    {/* ---------Cast and Crew--------- */}
                                    <div >
                                        <div className="card ">
                                            <div className="card-header  heading text-center" style={{ borderBottom: 'none', background: '#fff' }}>
                                                CAST {'&'} CREW
                                        <hr className="mb-1 mt-1 ml-4 mr-4 " />
                                            </div>
                                            <div className="card-body ">
                                                <section>
                                                    <div className="row mx-1 mt-n3 mb-2">
                                                        {

                                                            cast.slice(0, this.state.castToDisplay).map((cast, i) => {
                                                                return (
                                                                    <div className='col-6 mb-2' key={i} >
                                                                        <div>
                                                                            <span className="heading">{cast.name}</span>
                                                                            <br />
                                                                            <span className="font-rc">{cast.character}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    {
                                                        this.state.castToDisplay < cast.length ?
                                                            <div className="row"><div className="col fw-500 showmore text-center"><span onClick={this.showMore}>SHOW MORE</span></div></div>
                                                            : (cast.length > 12 && (cast.length == this.state.castToDisplay)) ?
                                                                <div className="row"><div className="col fw-500 showmore text-center"><span onClick={this.showLess}>SHOW LESS</span></div></div>
                                                                : null
                                                    }
                                                </section>
                                                {/* <section>
                                                    <div className="row mx-1"><span className="heading col " >Starring </span></div>
                                                    <div className="row mx-1 mt-2 mb-1">
                                                        <div className="col-6 ">
                                                            <div className="font-text">
                                                                <span className="heading">Tom Kenny</span>
                                                                <br />
                                                                <span className="font-rc">Spongebob Voice</span>
                                                            </div>
                                                        </div>
                                                        <div className='col-6'>
                                                            <div>
                                                                <span className="heading">Roger Bumpass</span>
                                                                <br />
                                                                <span className="font-rc">Squidward Tentacles voice</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mx-1 mb-2">
                                                        <div className="col-6 ">
                                                            <div className="font-text">
                                                                <span className="heading">Bill Fagerbakke</span>
                                                                <br />
                                                                <span className="font-rc">Patrick Star voice</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section> */}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        : <div>

                            <h2>Loading</h2>
                        </div>
                }


                <Footer />
            </div >

        )
    }
}


function mapStateToProps(state) {
    return {
        movie: state.movie
    }
}

export default connect(mapStateToProps)(MovieDetails)