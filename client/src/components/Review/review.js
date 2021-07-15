import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import ReviewDescription from './reviewDescription'
import ReportReview from './reportReview'
import { clearReviewVote, reportReview, upvoteReview, downvoteReview } from '../../actions'
class Review extends Component {

    state = {
        reviewsToShow: 3,
        isVoted: false,
        reviews: [],
    }

    componentDidMount() {
        this.setState({
            reviews: this.props.reviews
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.reviews != prevState.reviews) {
            return {
                reviews: nextProps.reviews
            }
        }

        if (nextProps.votedReview) {
            var foundIndex = prevState.reviews.findIndex(x => x._id == nextProps.votedReview._id);
            let reviews = prevState.reviews;
            reviews[foundIndex] = nextProps.votedReview;
            return {
                reviews: reviews,
            };
        }
        return null;
    }


    showMore = () => {
        this.setState({
            reviewsToShow: this.state.reviewsToShow + 5
        })
    }

    showLess = () => {
        this.setState({
            reviewsToShow: 3
        })
    }

    filterProfanity = (comment) => {
        var Filter = require('bad-words');
        var customFilter = new Filter({ placeHolder: '*' });

        var newBadWords = ['gandu', 'bsdk', 'bullshit', 'madarchod'];  //add as many bad words to this list
        let removeWords = ['sexy', 'sex']; //add bad words to remove

        customFilter.addWords(...newBadWords);
        customFilter.removeWords(...removeWords);

        return customFilter.clean(comment);
    }


    upvoteReview = (review) => {
        if (this.props.user.login.isAuth) {
            this.props.dispatch(upvoteReview(review._id));
        }
        else {
            this.props.history.push('/login');
        }

    }

    downvoteReview = (review) => {
        if (this.props.user.login.isAuth) {
            this.props.dispatch(downvoteReview(review._id));
        } else {
            this.props.history.push('/login');
        }
    }

    getReviewUpvote = (review) => {
        const reviewFound = review.votes.find(({ userId }) => userId == this.props.user.login.id);
        if (reviewFound) {
            if (reviewFound.vote == 1) {
                return 'fas';
            }
        }
        return 'far'
    }
    getReviewUpvoteCount = (review) => {
        const reviewFound = [review.votes.filter(({ vote }) => vote === 1)];
        if (reviewFound[0].length > 0) {
            return reviewFound[0].length;
        }
        return 0;
    }

    getReviewDownvote = (review) => {
        const reviewFound = review.votes.find(({ userId }) => userId == this.props.user.login.id);
        if (reviewFound) {
            if (reviewFound.vote == -1) {
                return 'fas';
            }
        }
        return 'far'
    }

    getReviewDownvoteCount = (review) => {
        const reviewFound = [review.votes.filter(({ vote }) => vote === -1)];
        if (reviewFound[0].length > 0) {
            return reviewFound[0].length;
        }
        return 0;
    }

    reportReview = (review) => {
        this.props.dispatch(reportReview(review._id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearReviewVote);
    }

    render() {
        let reviews = this.state.reviews;

        return (
            <div className="container m-0">
                <div className="card p-2 ">
                    <div className="card-header bg-white">
                        <div className="row">
                            <div className="col-6 m-0 ">
                                <h5 className="heading text-capitalize">   User reviews </h5>
                            </div>
                            <div className="col-6 text-right ">

                                <small className="font-text font-weight-normal" >
                                    {/* <small className="text-mute p-0 m-0">   {reviews.length > 1 ? reviews.length + ' reviews ' : reviews.length == 1 ? reviews.length + ' review ' : null}</small>
 */}

                                    {reviews.length > 1 ? reviews.length + ' reviews ' : reviews.length == 1 ? reviews.length + ' review ' : null}

                                    {/* <i class="fa fa-thumbs-up  "></i> 90% positive reviews */}
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
                                                        <small className="font-text m-1 font-weight-bold"> Rated {review.rating}/10  </small>
                                                    </div>
                                                    <div className="col-12 mt-1 pr-5">
                                                        <span className='text-justify font-text font-weight-regular  ' style={{ fontSize: '16px', fontWeight: 400 }}>
                                                            {
                                                                <ReviewDescription review={review} filterProfanity={this.filterProfanity} />
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-md-9  ">
                                                        <small >Do you find this review helpful? <i className={`ml-1 ${this.getReviewUpvote(review)} fa-thumbs-up `}
                                                            style={{ cursor: "pointer" }} onClick={() => { return this.upvoteReview(review) }}></i> {this.getReviewUpvoteCount(review)} <i className={` ${this.getReviewDownvote(review)}  fa-thumbs-down`} style={{ cursor: "pointer" }}
                                                                onClick={() => { return this.downvoteReview(review) }}></i> {this.getReviewDownvoteCount(review)}.
                                                            {this.props.user.login.isAuth == true ? null : <span> <Link style={{ color: 'black', fontWeight: '500' }} to="/login">Sign in</Link> to vote.</span>}</small>
                                                    </div>
                                                    <ReportReview {...this.props} review={review} />
                                                    <hr className="border col-10 border-light m-0 my-2" />
                                                </div >
                                            </section>
                                        ))}
                                    {this.state.reviewsToShow < reviews.length ?
                                        <div className="row"><div className="col fw-500 showmore text-center"><span onClick={this.showMore}>SHOW MORE</span></div></div>
                                        : (reviews.length > 3 || (reviews.length == this.state.reviewsToShow && reviews.length > 3)) ?
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
        votedReview: state.movie.votedReview
    }
}

export default connect(mapStateToProps)(Review)