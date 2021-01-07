import React, { Component } from 'react'

export default class Review extends Component {
    render() {
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
                                    <a href="/create-review"  style={{ textDecoration: 'none', color: 'black' }}>Write a review</a>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row font-text review my-2">
                            <div className="col-9">
                                <h6 className="m-0">Best movie so far.</h6>
                                <div className="p-0 m-0 text-nowrap">
                                    <small>added by <span className="font-weight-bold">user1</span> on December 28,2020</small>
                                </div>
                            </div>
                            <div className="col-3 text-right ">
                                <small className="font-text m-1 font-weight-bold">Rated 10/10</small>
                            </div>
                            <div className="col-12">
                                <span className='text-justify font-text font-weight-regular mt-3' style={{ fontSize: '15px', fontWeight: 400 }}>

                                    All of the spongebob movies are great. Love all the voiceovers and
                                    am waiting for next one.
                                 </span>
                            </div>
                            <small className="col-12 text-right m-0 ">Report review</small>
                            <hr className="border col-10 border-light m-0 my-2" />
                        </div>
                        <div className="row font-text review my-1 ">
                            <div className="col-9">
                                <h6 className="m-0 text-break ">Random, but enjoyable.</h6>
                                <div className="p-0 m-0 ">
                                    <small>added by <span className="font-weight-bold">user2</span> on December 28,2020 </small>
                                </div>

                            </div>
                            <div className="col-3 text-right ">
                                <small className="font-text m-1 font-weight-bold">Rated 8/10</small>
                            </div>
                            <div className="col-12">
                                <span className='text-justify font-text font-weight-regular mt-3' style={{ fontSize: '15px', fontWeight: 400 }}>
                                    I loved this movie, but it isn't for everyone. It's got a nonsensical plot and the humour is so random that not everyone is going to like it. It seems to be made more so for people who watched the series when they were kids and are now grown up than for kids now, many of the jokes didn't have much that a kid could grasp on to compared to the series and original movie (I haven't seen the second movie as of writing this review).

                                    That said I had so much fun watching it, probably the most joyous time I've spent watching something this year, and fun is really what watching a Spongebob movie is all about.
                                 </span>
                            </div>
                            <small className="col-12 text-right m-0">Report review</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
