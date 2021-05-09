import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../../Header/header'
import Footer from '../../Footer/footer'
import { Link, Redirect } from 'react-router-dom'
import { addReview, clearMovieReview } from "../../../actions"
import StarRatings from 'react-star-ratings'
import Moment from 'react-moment'
import { connect } from 'react-redux'


class CreateReview extends Component {

    state = {
        movie: '',
        rating: 5,
        review: '',
        isSpoiler: false,
        message: '',
        heading: '',
        disabled: false,
        redirect: false
    };


    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.review) {
            if (nextProps.review.post == true) {
                return {
                    disabled: false,
                    redirect: true,
                    message: "Review added successfully."
                }
            }
            else if (nextProps.review.post === false) {
                return {
                    disabled: false,
                    message: "There is an error adding your review."
                }
            }
        }

        return null;
    }

    changeRating = (newRating, name) => {
        this.setState({
            rating: newRating
        });
    }

    componentDidMount() {


        if (!this.props.location.movieProps) {
            this.props.history.push('/');
        }
        else {
            this.setState({
                movie: this.props.location.movieProps.movie
            })
        }
    }

    handleInputHeading = (e) => {
        this.setState({
            heading: e.target.value
        })
    }

    handleInputReview = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    handleInputSpoiler = (e) => {
        this.setState({
            isSpoiler: e.target.value
        })
    }



    handleSubmit = (e) => {
        if (this.state.review.length > 0 && this.state.heading.length > 0) {
            const review = {
                movieId: this.state.movie._id,
                rating: this.state.rating,
                userId: this.props.user.login.id,
                userName: this.props.user.login.name,
                isSpoiler: this.state.isSpoiler,
                review: this.state.review.trim(),
                heading: this.state.heading.trim()
            }

            this.props.dispatch(addReview(review));

            this.setState({
                disabled: true
            })
        }
    }


    componentWillUnmount() {
        this.props.dispatch(clearMovieReview())
    }

    render() {
        let movie = this.state.movie;

        if (this.state.redirect === true) {
            return <Redirect to={`/movie/${movie._id}`} />
        }

        return (

            <div className="sticky-body">
                <Header user={this.props.user} />
                {
                    movie ?
                        <div>
                            <div className="top-margin-header"></div>
                            <div className="container">

                                <div className='d-flex flex-row my-md-2 display-inline '>
                                    <div className="d-inline" >
                                        <img id="postertest" className='poster-small d-flex ' src={movie.poster_url} alt="movie-poster" />
                                    </div>

                                    <div className="d-inline" >
                                        <h5 className=" col-12" >{movie.title}</h5>
                                        <div className=" col-12"><span> Release: <Moment date={movie.releaseDate} format={"YYYY"} /></span></div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <h5 className="mt-3" >Add new review</h5>
                                    </div>
                                </div>

                                <div >

                                    <Form className="row" >
                                        <Form.Group className="input-style col-12" controlId="rating">
                                            <Form.Label><strong></strong>Your Rating </Form.Label>
                                            <span className="mx-2">

                                                <StarRatings
                                                    rating={this.state.rating}
                                                    starRatedColor="black"
                                                    changeRating={this.changeRating}
                                                    numberOfStars={10}
                                                    starHoverColor="black"
                                                    starDimension="24px"
                                                    name='rating'
                                                />
                                            </span>
                                            <div className=" heading p-1">
                                                <strong>{this.state.rating}/10</strong>
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="col-12 col-md-8" controlId="heading">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control required type="text" maxLength={100} placeholder={"Write a small title of your review here"} value={this.state.heading} onChange={this.handleInputHeading} />
                                        </Form.Group>

                                        <Form.Group className="col-12 col-md-8" controlId="review">
                                            <Form.Label>Your review</Form.Label>
                                            <Form.Control required as="textarea" rows={12} value={this.state.review} placeholer={"Your complete review here"} onChange={this.handleInputReview} />
                                        </Form.Group>
                                        <Form.Group className="input-style col-12" controlId="isSpoiler">
                                            <Form.Label className="mr-3">Mark as Spoiler  </Form.Label>
                                            <input type="checkbox" id="isSpoiler" name="isSpoiler" value={this.state.isSpoiler} onChange={this.handleInputSpoiler} />
                                        </Form.Group>
                                        <button type="button" onClick={this.handleSubmit} className="btn btn-dark border-round mb-3 ml-2" disabled={this.state.disabled}>Save review</button>
                                        <div className="col-12">
                                            <span>{this.state.message}</span>
                                        </div>
                                    </Form>

                                </div>


                            </div>
                            <div className="bottom-margin-header"></div>
                            <div className="sticky-footer">
                                <Footer />
                            </div>
                        </div>
                        : null
                }

            </div >
        )
    }
}




function mapStateToProps(state) {

    return {
        review: state.movie.movieReview
    }
}

export default connect(mapStateToProps)(CreateReview)