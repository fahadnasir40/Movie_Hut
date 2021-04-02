import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../../Header/header'
import { Link, Redirect } from 'react-router-dom'
import { addShowtime, clearShowtime } from '../../actions';
import { connect } from 'react-redux';

class CreateShowtime extends Component {
    setDate = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today)
        return today;
    }
    setDateMax = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 3; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today)
        return today;
    }
    state = {
        name: '',
        language: 'English',
        date: '',
        time: '',
        screenType: '',
        redirect: false,
    }

    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleInputLanguage = (event) => {
        this.setState({ language: event.target.value })
    }
    handleInputDate = (event) => {
        this.setState({ date: event.target.value })
    }
    handleInputTime = (event) => {
        this.setState({ time: event.target.value })
    }
    handleInputScreen = (event) => {
        this.setState({ screenType: event.target.value })
    }

    handleSubmit = (event) => {
        // console.log("Inside handle submit")
        event.preventDefault();
        this.props.dispatch(addShowtime({
            name: this.state.name,
            language: this.state.language,
            date: this.state.date,
            time: this.state.time,
            screenType: this.state.screenType,
        }))
    }

    static getDerivedStateFromProps(props, state) {
        // console.log("Props", props)
        if (props.showtimepost.showtime) {
            if (props.showtimepost.showtime.post)
                return {
                    redirect: true,
                }
        }
        return null;
    }

    componentWillUnmount() {
        this.props.dispatch(clearShowtime());
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Add Showtime to Cinema</h4>
                            <Form className="mt-3" onSubmit={this.handleSubmit}>
                                <Form.Group className="input-style" controlId="moviename">
                                    <Form.Label>Movie Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        placeholder="Movie Name"
                                        value={this.state.name}
                                        onChange={this.handleInputName}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="language">
                                    <Form.Label>Language</Form.Label>
                                    <select id="language" name="language" onChange={this.handleInputLanguage}>
                                        <option value="english">English</option>
                                        <option value="urdu">Urdu</option>
                                    </select>
                                </Form.Group>
                                <Form.Group className="input-style" controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        min={this.setDate()}
                                        max={this.setDateMax()}
                                        value={this.state.date}
                                        onChange={this.handleInputDate}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="time">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        placeholder="Time"
                                        value={this.state.time}
                                        onChange={this.handleInputTime}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="screen">
                                    <Form.Label>Screen type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Screen Type"
                                        value={this.state.screenType}
                                        onChange={this.handleInputScreen}
                                    />
                                    {/* <select id="type" name="type">
                                        <option value="gold1">Gold-1</option>
                                        <option value="gold2">Gold-2</option>
                                        <option value="plat1">Platinum-1</option>
                                        <option value="plat2">Platinum-2</option>
                                    </select> */}
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    SAVE
                                </Button>
                            </Form>



                        </div>
                    </div>
                </div>
                <div className="bottom-margin-header"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        showtimepost: state.showtime
    }
}

export default connect(mapStateToProps)(CreateShowtime);