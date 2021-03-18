import React, { Component } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import HomeSlider from '../Widgets/slider'
class Home extends Component {

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
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <HomeSlider
                            settings={{
                                interval: '5000'
                            }}
                        />
                    </div>
                    <div className="row">

                        <div className="container">
                            <div className="row mt-5 ml-5">
                                <button className="cbtn active">
                                    NOW SHOWING
                                </button>
                                <button className="cbtn">
                                    COMING SOON
                                </button>
                                <button className="cbtn">
                                    CINEMAS
                                </button>
                            </div>

                            <div className="row mt-3 px-5">
                                <div className=" movie-container ">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/spongebobposter.jpg' alt="movie-poster" />
                                    </Link>

                                </div>
                                <div className="movie-container ">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/thelionking.jpg' alt="movie-poster" />
                                    </Link>
                                </div>
                                <div className="movie-container">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/tennet.jpg' alt="movie-poster" />
                                    </Link>
                                </div>
                                <div className="movie-container">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie" >
                                        <img id="postertest" className='movie-poster d-flex  ' src='./assets/images/soul.jpg' alt="movie-poster" />
                                    </Link>
                                </div>
                                <div className="movie-container ">
                                    {/* <h1>Home Page - Getting Started</h1> */}

                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/mulan.jpg' alt="movie-poster" />
                                    </Link>
                                </div>
                                <div className="movie-container">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/nmfa.jpg' alt="movie-poster" />
                                    </Link>
                                </div>
                                <div className=" movie-container">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/Daalchawal.jpeg' alt="movie-poster" />
                                    </Link>
                                </div>
                                <div className=" movie-container">
                                    {/* <h1>Home Page - Getting Started</h1> */}
                                    <Link class="p-1" to="/movie">
                                        <img id="postertest" className='movie-poster d-flex ' src='./assets/images/avenger.jpg' alt="movie-poster" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                {/* <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={"holder.js/800x400?text=First slide&bg=373940"}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Second slide&bg=282c34"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Third slide&bg=20232a"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> */}

                <Footer />
            </div >
        )
    }
}


export default Home;