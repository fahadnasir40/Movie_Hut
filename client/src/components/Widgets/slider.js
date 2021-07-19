import React, { Component } from 'react'
import { Carousel, Modal } from 'react-bootstrap'


class Slider extends Component {
    state = {
        show: false,
        trailer: ''
    };

    componentDidMount() {
        const { coverflow } = this.refs;
        this.setState({
            position: (coverflow && coverflow.getPosition()) || 0
        });
    }

    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    handleClose = () => this.setShow(false);
    handleShow = (video) => {

        this.setShow(true);
        if (video) {
            if (video.length > 0) {
                this.setState({ trailer: video[0] })
            }

        }
    };

    getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    playTrailer = (videos) => {

        if (videos) {
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
                                src={'https://www.youtube-nocookie.com/embed/' + this.getVideoId(videos) + '?autoplay=1&loop=1&modestbranding=1&playlist=' + this.getVideoId(videos[0])} frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
                                allowfullscreen="1"
                                webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
                        </div>
                    </div>
                </Modal>
            )
        }

    }

    showItems = () => {
        var length = 0;
        const movies = this.props.movies;
        if (movies) {
            length = this.props.movies.length;
            return (
                movies ?
                    movies.map((item, i) => {
                        const videoLinks = item.videoLinks;
                        return (
                            <Carousel.Item key={i} interval={this.props.settings.interval} >

                                <img style={{ width: "18%", objectFit: "cover", opacity: '0.5', backgroundColor: '#000' }}
                                    src={(i - 1) >= 0 ? movies[i - 1].background_url : movies[length - 1].background_url}
                                    alt={item.title}
                                    height="420px"

                                />
                                <img className="shadow-lg  rounded" style={{ width: "64%" }}
                                    src={item.background_url}
                                    alt={item.title}
                                    height="420px"

                                />
                                <img style={{
                                    width: "18%", objectFit: "cover", opacity: '0.5', backgroundColor: '#000'
                                }}
                                    src={i + 1 < length ? movies[i + 1].background_url : item.background_url
                                    }
                                    alt={item.title}
                                    height="420px"
                                />

                                <Carousel.Caption>
                                    <div className="container ">
                                        <h3>{item.title}</h3>
                                        <p> {item.runtime} Minutes</p>

                                        <div className="row mr-2">
                                            <div className="btn bg-white ml-auto mr-5 mb-3 mt-n5 " onClick={() => { this.handleShow(videoLinks) }}><i class="fas fa-video" style={{ opacity: '0.9' }}></i> Play Trailer</div>

                                        </div>
                                    </div>

                                </Carousel.Caption>

                            </Carousel.Item >
                        )
                    })
                    : null)
        }
    }

    render() {
        console.log(this.state);
        return (

            <div>
                {this.playTrailer(this.state.trailer)}
                {
                    this.props.movies ?
                        <Carousel className="w-100" fade variant="dark" indicators={false}>{this.showItems()}</Carousel>
                        : null
                }
            </div>
        );
    }
}
export default Slider;