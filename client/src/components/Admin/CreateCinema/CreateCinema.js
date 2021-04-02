import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../../Header/header'
import { Link, Redirect } from 'react-router-dom'
import { addCinema, clearCinema } from '../../actions';
import { connect } from 'react-redux';

class CreateCinema extends Component {

    state = {
        name: '',
        city: 'Lahore',
        address: '',
        url: '',
        redirect: false,
    }

    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleInputCity = (event) => {
        this.setState({ city: event.target.value })
    }
    handleInputAddress = (event) => {
        this.setState({ address: event.target.value })
    }
    handleInputURL = (event) => {
        this.setState({ url: event.target.value })
    }

    handleSubmit = (event) => {
        // console.log("Inside handle submit")
        event.preventDefault();
        this.props.dispatch(addCinema({
            name: this.state.name,
            city: this.state.city,
            address: this.state.address,
            url: this.state.url,
        }))
    }

    static getDerivedStateFromProps(props, state) {
        // console.log("Props", props)
        if (props.cinemapost.cinema) {
            if (props.cinemapost.cinema.post)
                return {
                    redirect: true,
                }
        }
        return null;
    }

    componentWillUnmount() {
        this.props.dispatch(clearCinema());
    }

    render() {
        // console.log(this.props)
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
                            <h4 className="m-3 text-center" >Cinema Details</h4>
                            <Form className="mt-3" onSubmit={this.handleSubmit}>
                                <Form.Group className="input-style" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        pattern="[a-zA-Z]+"
                                        oninvalid="setCustomValidity('Please enter alphabets only.')"
                                        placeholder="Cinema Name"
                                        value={this.state.name}
                                        onChange={this.handleInputName}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <select id="city" name="city" onChange={this.handleInputCity}>
                                        <option value="lahore">Lahore</option>
                                        <option value="islamabad">Islamabad</option>
                                        <option value="multan">Multan</option>
                                        <option value="faisalabad">Faisalabad</option>
                                    </select>
                                </Form.Group>
                                <Form.Group className="input-style" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address"
                                        value={this.state.address}
                                        onChange={this.handleInputAddress}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="url">
                                    <Form.Label>Website URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="URL"
                                        value={this.state.url}
                                        onChange={this.handleInputURL}
                                    />
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
        cinemapost: state.cinema
    }
}

export default connect(mapStateToProps)(CreateCinema)