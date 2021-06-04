import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import ReviewDescription from './reviewDescription'
class Review extends Component {

    state = {
        reviewsToShow: 5
    }


    showMore = () => {
        this.setState({
            reviewsToShow: this.state.reviewsToShow + 5
        })
    }

    showLess = () => {
        this.setState({
            reviewsToShow: 5
        })
    }

    filterProfanity = (comment) => {
        var Filter = require('bad-words');
        var customFilter = new Filter({ placeHolder: '*' });

        var newBadWords = ['gandu', 'bsdk', 'bullshit'];  //add as many bad words to this list
        let removeWords = ['sexy', '']; //add bad words to remove

        customFilter.addWords(...newBadWords);
        customFilter.removeWords(...removeWords);

        return customFilter.clean(comment);
    }

    render() {
        let reviews = this.props.reviews;

        return (
            <div className="container m-0">
                <div className="card p-2 ">
                    <div className="card-header bg-white">
                        <div className="row">
                            <div className="col-6 m-0 ">
                                <h5 className="heading text-capitalize">   User reviews</h5>
                            </div>
                            <div className="col-6 text-right ">
                                <small className="font-text font-weight-normal" >

                                    <i class="fa fa-thumbs-up  "></i> 90% positive reivews
                                </small>
                                <span className="border border-dark rounded p-1 px-2  mx-2 text-nowrap ">
                                    <Link to={{
                                        pathname: `/create-review`,
                                        movieProps: {
                                            movie: this.props.movie
                                        }
                                    }}
                                        style={{ textDecoration: 'none', color: 'black' }}>Write a review</Link>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        {
                            reviews.length > 0 ?
                                <span >
                                    {
                                        reviews.slice(0, this.state.reviewsToShow).map((review, key) => (

                                            <section key={key}>

                                                < div className="row font-text review ">
                                                    <div className="col-9">
                                                        <h6 className="m-0">{this.filterProfanity(review.heading)}</h6>
                                                        <div className="p-0 m-0 text-nowrap">
                                                            <small>added by <span className="font-weight-bold">{review.userName}</span> on <Moment date={review.createdAt} format="MMM DD, YYYY" />
                                                                {
                                                                    review.isSpoiler ?
                                                                        <span className="ml-2">
                                                                            <OverlayTrigger
                                                                                key={key}
                                                                                placement={'top'}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-top`}>
                                                                                        This review is marked as spoiler by the author.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <span className="text-danger"><i class="fa fa-info-circle " > </i>  Spoiler</span>
                                                                            </OverlayTrigger>
                                                                        </span>
                                                                        : null
                                                                }
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 text-right ">
                                                        <small className="font-text m-1 font-weight-bold">Rated {review.rating}/10</small>
                                                    </div>
                                                    <div className="col-12 mt-2 pr-5">
                                                        <span className='text-justify font-text font-weight-regular mt-3 ' style={{ fontSize: '16px', fontWeight: 400 }}>
                                                            {
                                                                <ReviewDescription review={review} filterProfanity={this.filterProfanity} />
                                                            }
                                                        </span>
                                                    </div>
                                                    <small className="col-12 text-right m-0 ">Report review</small>
                                                    <hr className="border col-10 border-light m-0 my-2" />
                                                </div >
                                            </section>
                                        ))}
                                    {this.state.reviewsToShow < reviews.length ?
                                        <div className="row"><div className="col fw-500 showmore text-center"><span onClick={this.showMore}>SHOW MORE</span></div></div>
                                        : (reviews.length > 5 || (reviews.length == this.state.reviewsToShow && reviews.length > 5)) ?
                                            <div className="row"><div className="col fw-500 showmore text-center"><span onClick={this.showLess}>SHOW LESS</span></div></div>
                                            : null}
                                </span>
                                : <div>
                                    No reviews available
                            </div>

                        }

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(Review)