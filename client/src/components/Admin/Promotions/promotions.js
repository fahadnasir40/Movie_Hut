import React, { Component } from 'react'
import Header from '../../Header/header'
import { connect } from 'react-redux'
import { getCinemas } from '../../../actions'
class Promotions extends Component {

    state = {
        disabled: false,
        message: '',
        cinemasList: [],
        cinemaSelected: '',
        audience: ''
    }

    componentDidMount() {
        this.props.dispatch(getCinemas())

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("Next Props", nextProps)
        if (nextProps.cinemas) {
            if (nextProps.cinemas.cinemasList) {

                return {
                    cinemasList: nextProps.cinemas.cinemasList
                }
            }
        }

        return null;
    }

    handleSubmit = (e) => {
        console.log("event");
        this.setState({ disabled: true })
    }

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
                                        <label for="staticEmail" class=" col-form-label">Audience: </label>
                                        <div class="col-sm-10">
                                            <select class="form-control  col-sm-12" id="audience">
                                                <option>All Audience</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div class="my-4 form-group form-inline">
                                        <label for="staticEmail" class=" col-form-label">Cinemas: </label>
                                        <div class="col-sm-10">
                                            <select class="form-control  col-sm-12" id="audience">
                                                {this.state.cinemasList.length > 0 ? <option>All Cinemas</option> : null}
                                                {this.state.cinemasList.map((item, key) => {
                                                    return (
                                                        <option value={item._id} >{item.name}</option>
                                                    )
                                                })}

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="float-right">
                                            {
                                                this.state.disabled ?
                                                    <button type="button" className="btn btn-dark" disabled >Sending</button>
                                                    :
                                                    <button type="button" onClick={this.handleSubmit} className="btn btn-dark" >Send Email</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col my-3">
                                        <div className="float-right">
                                            <span>{this.state.message}</span>
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
const mapStateToProps = (state) => {
    console.log("State", state);
    return {
        cinemas: state.cinema.cinemasName
    }
}
export default connect(mapStateToProps)(Promotions);