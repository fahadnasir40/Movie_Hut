import React, { Component } from 'react'
import Header from '../../Header/header'
class Promotions extends Component {
    render() {
        return (
            <div>
                <Header />

                <div className="container">
                    <div className="row">
                        <div className="col mt-3">
                            <h3>Promotions</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mt-5">
                            <div>
                                <h5>Campaigns</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div class="shadow p-3 mb-5 bg-white rounded">
                                <div className="my-2">
                                    <span>Campaign # 1</span>
                                </div>
                                <div className="my-3">
                                    <span>Name: <strong className="ml-2">  Top Picks</strong></span>
                                </div>
                                <div>
                                    <div class="my-4 form-group form-inline">
                                        <label for="staticEmail" class=" col-form-label">Audience</label>
                                        <div class="col-sm-10">
                                            <select class="form-control  col-sm-12" id="audience">
                                                <option>All Audience</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="my-4 form-group form-inline">
                                        <label for="staticEmail" class=" col-form-label">Cinemas</label>
                                        <div class="col-sm-10">
                                            <select class="form-control  col-sm-12" id="audience">
                                                <option>All Cinemas</option>
                                                <option>Cinepax</option>
                                                <option>Universal Cinemas</option>
                                                <option>Vouge Tower</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default Promotions;