import React, { Component } from 'react';
import Header from '../Header/header';
import { Button, Modal } from 'react-bootstrap'

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
                                    <h5>Overview</h5>
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
                            <div class="col-lg-8 col-12">col-8</div>
                            <div class="col-lg-4 col-xl-3 col-12 "> <div className="card ">
                                <div class="card-header heading text-center" style={{ borderBottom: 'none' }}>
                                    CAST {'&'} CREW
                                    <hr className="mb-1 mt-1 ml-4 mr-4 " />
                                </div>
                                <div class="card-body ">
                                    <div className="row mx-1 mt-n3">
                                        <div className="col-6 ">
                                            <div>
                                                <span className="heading">Tim Harry</span>
                                                <br />
                                                <span>Director</span>
                                            </div>

                                        </div>
                                        <div className='col-6'>
                                            col-2
                                    </div>

                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div >
        )
    }
}

export default MovieDetails;