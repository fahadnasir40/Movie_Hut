import React, { Component } from 'react'

class ReviewDescription extends Component {

    state = {
        textCutLength: 570,
        textToDisplay: 570,
        hideSpoiler: true
    }

    showMore = (review) => {
        this.setState({
            textToDisplay: review.length
        })
    }

    showLess = () => {
        this.setState({
            textToDisplay: this.state.textCutLength
        })
    }




    showReviewDescription = (reviewDescription) => {
        return (

            this.state.textToDisplay < reviewDescription.length ?
                <span>
                    {reviewDescription.slice(0, this.state.textToDisplay)}... <span className="showmore text-inline " onClick={() => { this.showMore(reviewDescription) }}><strong>Show More</strong></span>
                    <div className="row" > <div className="col fw-500 showmore text-center"></div>
                    </div>
                </span>
                : (reviewDescription.length > this.state.textCutLength && (reviewDescription.length == this.state.textToDisplay)) ?
                    <span>
                        {reviewDescription} <span className="showmore text-inline " onClick={this.showLess}><strong>Show Less</strong></span>
                    </span>

                    : <span>{reviewDescription}</span>

        )
    }

    showSpoiler = () => {
        this.setState({
            hideSpoiler: false
        })
    }

    getReview = (review) => {
        const reviewDescription = this.props.filterProfanity(review.review);


        if (review.isSpoiler) {

            return (
                <span>
                    {
                        this.state.hideSpoiler ?
                            <div className=" btn btn-sm btn-outline-dark " onClick={this.showSpoiler}>Show review</div>

                            : this.showReviewDescription(reviewDescription)
                    }

                </span>
            )
        }
        else {
            return this.showReviewDescription(reviewDescription);
        }
    }



    render() {
        return this.getReview(this.props.review);



    }
}

export default ReviewDescription