import React, { Component } from 'react'
import Header from '../../Header/header'
import { connect } from 'react-redux'
import { getCinemas, sendPropmotionalEmails } from '../../../actions'
class Promotions extends Component {

    state = {
        disabled: false,
        error: false,
        message: '',
        cinemasList: [],
        cinemaSelected: 'All Cinemas',
        audience: 'All Audience'
    }

    componentDidMount() {
        this.props.dispatch(getCinemas())

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("Next Props", nextProps)


        if (nextProps.promotionalEmail) {
            if (nextProps.promotionalEmail.message) {
                return {
                    disabled: false,
                    message: nextProps.promotionalEmail.message
                }
            }
        }

        if (nextProps.cinemas) {
            if (nextProps.cinemas.cinemasList) {
                return {
                    cinemasList: nextProps.cinemas.cinemasList,
                }
            }
        }
        return null;
    }

    handleInputAudience = (event) => {
        this.setState({ audience: event.target.value })
    }

    handleInputCinemas = (event) => {
        this.setState({ cinemaSelected: event.target.value })
    }


    handleSubmit = (e) => {

        this.setState({ disabled: true })

        if (this.state.cinemaSelected != "" && this.state.audience != "") {

            let cinema = '';
            if (this.state.cinemaSelected !== 'All Cinemas') {
                cinema = this.state.cinemaSelected;
            }
            const emailData = {
                audience: this.state.audience,
                cinemas: cinema
            }
            this.props.dispatch(sendPropmotionalEmails(emailData));

        }

    }

    render() {
        return (
            <div>
                <Header user={this.props.user} />

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
                                            <select class="form-control  col-sm-12" id="audience" onChange={this.handleInputAudience}>
                                                <option value="All Audience">All Audience</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div class="my-4 form-group form-inline">
                                        <label for="staticEmail" class=" col-form-label">Cinemas: </label>
                                        <div class="col-sm-10">
                                            <select class="form-control  col-sm-12" id="audience" onChange={this.handleInputCinemas}>
                                                {this.state.cinemasList.length > 0 ? <option value="All Cinemas">All Cinemas</option> : null}
                                                {this.state.cinemasList.map((item, key) => {
                                                    return (
                                                        <option value={item._id} key={key} >{item.name}</option>
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
                                                    this.state.cinemasList.length > 0 && this.state.audience ?
                                                        <button type="button" onClick={this.handleSubmit} className="btn btn-dark" >Send Email</button>
                                                        : <button type="button" onClick={this.handleSubmit} className="btn btn-dark" disabled>Send Email</button>

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

    return {
        cinemas: state.cinema.cinemasName,
        promotionalEmail: state.cinema.promotionalMails
    }
}
export default connect(mapStateToProps)(Promotions);