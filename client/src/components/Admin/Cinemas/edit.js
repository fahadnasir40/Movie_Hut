import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Header from '../../Header/header';
import { Link } from 'react-router-dom';
import { getCinemaDetails, updateCinema, clearCinemaUpdate } from '../../../actions/index';


class EditCinema extends Component {
    state = {
        _id: '',
        name: '',
        city: '',
        address: '',
        url: '',
        error: '',
        success: '',
        validated: false,
        cachedProps: null
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
    componentDidMount = () => {
        this.props.dispatch(getCinemaDetails(this.props.match.params.cinemaId));
    }
    static getDerivedStateFromProps(nextProps, state) {
        if (state.cachedProps !== nextProps) {
            if (nextProps.cinema) {
                if (nextProps.cinema.cinema) {
                    return {
                        _id: nextProps.cinema.cinema._id,
                        name: nextProps.cinema.cinema.name,
                        city: nextProps.cinema.cinema.city,
                        address: nextProps.cinema.cinema.address,
                        url: nextProps.cinema.cinema.url,
                        cachedProps: nextProps
                    }
                }
            }
        }
        if (nextProps.cinema) {
            if (nextProps.cinema.message === "Updated successfully") {
                nextProps.history.push('/admin-cinemas')
            }
        }
        return null;
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateCinema(this.state));
    }

    componentWillUnmount() {
        this.props.dispatch(clearCinemaUpdate())
    }


    render() {
        return (
            <div>
                <Header user={this.props.user} />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Edit Cinema</h4>
                            <Form className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style" controlId="name">
                                    <Form.Label>Cinema Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        placeholder="Cinema Name"
                                        value={this.state.name}
                                        onChange={this.handleInputName}
                                        maxLength="100"
                                        minLength="3"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="input-style " controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <select id="city" name="city" value={this.state.city} className="form-control" onChange={this.handleInputCity}>
                                        <option value="Lahore">Lahore</option>
                                        <option value="Islamabad">Islamabad</option>
                                        <option value="Multan">Multan</option>
                                        <option value="Karachi">Karachi</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </Form.Group>
                                <Form.Group className="input-style" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cinema Address"
                                        value={this.state.address}
                                        onChange={this.handleInputAddress}
                                        maxLength="100"
                                        minLength="3"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="address">
                                    <Form.Label>Website URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cinema URL"
                                        value={this.state.url}
                                        onChange={this.handleInputURL}
                                        maxLength="100"
                                        minLength="3"
                                        required
                                    />
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Update Cinema
                                </Button>
                                <div className="error">
                                    {this.state.error}
                                </div>
                                <div className="success">
                                    {this.state.success}
                                </div>
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
        cinema: state.cinema.cinema
    }
}

export default connect(mapStateToProps)(EditCinema);