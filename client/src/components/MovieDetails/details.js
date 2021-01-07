import React, { Component } from 'react';
import Header from '../Header/header';
import { Button, Modal } from 'react-bootstrap'
import Footer from '../Footer/footer'

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Review from '../Review/review';

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

    state = {
        show: false,
    }

    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);

    playTrailer = () => {
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
                            src={'https://www.youtube-nocookie.com/embed/HfiH_526qhY?autoplay=1&loop=1&modestbranding=1&playlist=HfiH_526qhY'} frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
                            allowfullscreen="1"
                            webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
                    </div>
                </div>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                <Header />

                <div className="container-fluid mt-md-4 mt-3">
                    {this.playTrailer()}
                    <section className="row">
                        <div className="  p-md-2 rounded ">

                            <div className="col-12 offset-lg-1 offset-xl-2  px-2">
                                <div class="media p-1">

                                    <img id="postertest" className='poster d-flex mr-3 ' src='./assets/images/spongebobposter.jpg' alt="movie-poster" />

                                    <div class="media-body">

                                        <div className=" d-md-none">
                                            <div className="movie-details">
                                                <h5 className="title">
                                                    The SpongeBob Movie: Sponge on the Run
                                                </h5>
                                                <p>08/14/2020 (CA)</p>
                                            </div>
                                            <button className=" btn  btn-dark mr-2" onClick={this.handleShow}><i class="fa fa-play"></i> Play Trailer</button>
                                            <button class=" btn-dark btn my-2 d-md-none " ><i class="fa fa-heart"> Favorite</i></button>
                                        </div>

                                        <div className="movie-details d-none d-md-block col-lg-8 col-xl-7">
                                            <h3 className="title">
                                                The SpongeBob Movie: Sponge on the Run
                                            </h3>
                                            <p>08/14/2020 (CA) Fantasy, Animation, Adventure, Comedy, Family</p>
                                            <p><span className="border border-dark rounded px-1 mx-1 ">L</span>   <i class="fa fa-clock-o" aria-hidden="true" style={{ color: "#212121", opacity: '0.9' }}></i> 1H 35M</p>

                                            <h6>Overview</h6>
                                            <p>After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic
                                            adventure to The Lost City of Atlantic City to bring Gary home .
                                            </p>

                                            <div className="d-none d-md-block">
                                                <button className=" btn  btn-dark" onClick={this.handleShow}><i class="fa fa-play"></i> Play Trailer</button>
                                                <button class=" btn-dark btn-circle ml-2" ><i class="fa fa-heart"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 d-block d-md-none mt-2">
                                <h6 className="heading">
                                    Movie Details
                                </h6>
                                <p>08/14/2020 (CA) Fantasy, Animation, Adventure, Comedy, Family</p>
                                <p>L,<i class="fa fa-tick" ></i>1H 35M</p>

                                <h6>Overview</h6>
                                <p>After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic
                                adventure to The Lost City of Atlantic City to bring Gary home .
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="row">
                        <section class="col-lg-8  col-12 " >
                            {/* ---------Showtimes--------- */}
                            <div className="row col-12  m-0 ">

                                <div className=" offset-lg-2 offset-xl-2 " >
                                    <div className="ml-xl-4 ml-md-3 ml-lg-n1 ml-sm-2 my-3">
                                        <h5 className="heading ml-xl-1  mt-1">SHOWTIMES</h5>
                                        {/* --------Showtime Dates-------- */}

                                        <div className=" showtime-container  ml-xl-1  row  my-3 ">
                                            <div className="showtime-date">
                                                <div >
                                                    DEC
                                            </div>
                                                <div>
                                                    SAT 26
                                            </div>
                                            </div>
                                            <div className="showtime-date">
                                                <div >
                                                    DEC
                                            </div>
                                                <div>
                                                    SUN 27
                                            </div>
                                            </div>
                                            <div className="showtime-date">
                                                <div >
                                                    DEC
                                            </div>
                                                <div>
                                                    MON 28
                                            </div>
                                            </div>
                                            <div className="showtime-date">
                                                <div >
                                                    DEC
                                            </div>
                                                <div>
                                                    TUE 29
                                            </div>
                                            </div>
                                            <div className="showtime-date">
                                                <div >
                                                    DEC
                                            </div>
                                                <div>
                                                    WED 30
                                            </div>
                                            </div>
                                            <div className="showtime-date">
                                                <div >
                                                    DEC
                                            </div>
                                                <div>
                                                    THU 31
                                            </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row col-12 ">

                                    {/* --------Screen Plays-------- */}
                                    <div class="offset-lg-2 offset-xl-2 ">
                                        <div className="ml-xl-4  ml-lg-n1 my-3 ">

                                            <div className="col-12  my-4">
                                                <div className="cinema-title font-text ml-xs-n2  font-weight-bold">
                                                    Cinepax Amanah Mall Lahore
                                                  </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className=" session-container">
                                                        <span className="text-capitalize session ">
                                                            Screen 2
                                                    </span>
                                                        <span className="attribute ml-2 border">
                                                            08:00 PM
                                                  </span>
                                                    </div>
                                                </div>

                                                <div className="col ">
                                                    <div className="session-container">
                                                        <span className="text-capitalize session ">
                                                            Screen 5
                                                    </span>
                                                        <span className="attribute ml-2 border">
                                                            10:00 PM
                                                  </span>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="session-container">
                                                        <span className="text-capitalize session ">
                                                            Screen 7
                                                    </span>
                                                        <span className="attribute ml-2 border">
                                                            10:30 PM
                                                  </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 col-lg-8">
                                    <div className="offset-lg-2 offset-xl-4">
                                        <button className="btn border ml-lg-2 ml-xl-n2 mb-3"><i className="fa fa-send"></i>  Visit Site</button>
                                    </div>
                                </div>
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

                        <section class="col-lg-4 col-md-6 col-xl-3 col-sm-9 col-xs-12 mb-3">

                            {/* ---------Cast and Crew--------- */}
                            <div >
                                <div className="card ">
                                    <div class="card-header  heading text-center" style={{ borderBottom: 'none', background: '#fff' }}>
                                        CAST {'&'} CREW
                                    <hr className="mb-1 mt-1 ml-4 mr-4 " />
                                    </div>
                                    <div class="card-body ">
                                        <section>
                                            <div className="row mx-1 mt-n3 mb-2">
                                                <div className="col-6 ">
                                                    <div className="font-text">
                                                        <span className="heading">Tim Harry</span>
                                                        <br />
                                                        <span className="font-rc">Director</span>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <div>
                                                        <span className="heading">Jordan Dunn</span>
                                                        <br />
                                                        <span className="font-rc">Screenplay</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-1 mb-2">
                                                <div className="col-6 ">
                                                    <div className="font-text">
                                                        <span className="heading">Stephen Hillenburg</span>
                                                        <br />
                                                        <span className="font-rc">Story</span>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <div>
                                                        <span className="heading">Jonathan Aibel</span>
                                                        <br />
                                                        <span className="font-rc">Screenplay</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section>
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
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div >

        )
    }
}

export default MovieDetails;