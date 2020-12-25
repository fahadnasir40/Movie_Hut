import React, { Component } from 'react';
import Header from '../Header/header';
import { Button, Modal } from 'react-bootstrap'
import Footer from '../Footer/footer'
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

                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="secondary" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="heading text-center" style={{ opacity: '0.8', fontSize: '18px' }}>
                        Movie Trailer
                    </Modal.Title>
                </Modal.Header>
                <div className="trailer-body mt-n1" >
                    <div className="trailer-container">
                        <iframe className="player" type="text/html" width="100%" height="100%"
                            src={'https://www.youtube-nocookie.com/embed/HfiH_526qhY?autoplay=1&loop=1&modestbranding=1&playlist=HfiH_526qhY'} frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

                <div className="container-fluid mt-4">
                    {this.playTrailer()}
                    <section className=" container ">
                        <div className="row border p-2 rounded">
                            <div className="col-lg-4 col-xl-3 col-12 p-1">
                                <div className="poster-container nopadding">
                                    <img id="postertest" className='poster' src='./assets/images/spongebobposter.jpg' alt="movie-poster" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-8 col-xl-9 ml-lg-n5 ml-xl-0 p-2">
                                <div className="movie-details">
                                    <h3 className="title">
                                        The SpongeBob Movie: Sponge on the Run
                                    </h3>
                                    <p>08/14/2020 (CA) Fantasy, Animation, Adventure, Comedy, Family</p>
                                    <p>L,<i class="fa fa-tick" ></i>1H 35M</p>
                                    <p>User score: 70%</p>
                                    <h6>Overview</h6>
                                    <p>After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic
                                    adventure to The Lost City of Atlantic City to bring Gary home .</p>
                                </div>

                                <div>
                                    <button className=" btn  btn-dark" onClick={this.handleShow}><i class="fa fa-play"></i> Play Trailer</button>
                                    <button class=" btn-dark btn-circle ml-2" ><i class="fa fa-heart"></i></button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="m-3">
                        <div class="row">
                            {/* ---------Showtimes--------- */}

                            <div class="col-lg-8 col-12">
                                <div className="offset-lg-3">
                                    <h5 className="heading ml-n1 mt-2">SHOWTIMES</h5>
                                    {/* --------Showtime Dates-------- */}
                                    <div className=" showtime-container row my-3 ">
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
                                {/* --------Screen Plays-------- */}
                                <div class="col-12 mt-4 mb-5">
                                    <div className="offset-lg-3 ">

                                        <div className="row my-4">
                                            <div className="cinema-title font-text font-weight-bold">
                                                Cinepax Amanah Mall Lahore
                                             </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-5 col-lg-3 mr-2 p-0">
                                                <div className="session-container">
                                                    <span className="text-capitalize session ">
                                                        Screen 2
                                                    </span>
                                                    <span className="attribute ml-2 border">
                                                        08:00 PM
                                                  </span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-3  mt-5 mt-md-0 mr-2  p-0">
                                                <div className="session-container">
                                                    <span className="text-capitalize session ">
                                                        Screen 5
                                                    </span>
                                                    <span className="attribute ml-2 border">
                                                        10:00 PM
                                                  </span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-5 col-lg-3 mt-5 mt-lg-0 mr-2  p-0">
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
                                <div className="col-12 col-lg-8">
                                    <div className="offset-lg-4">
                                        <button className="btn border col-offset-4 ml-1 mb-3"><i className="fa fa-send"></i>  Visit Site</button>
                                    </div>
                                </div>
                            </div>

                            {/* ---------Cast and Crew--------- */}
                            <div class="col-lg-4 col-xl-3 col-12 ">
                                <div className="card ">
                                    <div class="card-header heading text-center" style={{ borderBottom: 'none', background: '#fff' }}>
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
                        </div>
                    </section>
                </div>
                <Footer />
            </div >

        )
    }
}

export default MovieDetails;