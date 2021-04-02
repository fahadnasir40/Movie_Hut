import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../../Header/header'
import { Link } from 'react-router-dom'

class CreateCinema extends Component {

    render() {

        function handleSubmit(event) {
            event.preventDefault();
        }
        return (
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Cinema Details</h4>
                            <Form className="mt-3" action="/create-showtime">
                                <Form.Group className="input-style" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        pattern="[a-zA-Z]+"
                                        oninvalid="setCustomValidity('Please enter alphabets only.')"
                                        placeholder="Cinema Name"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <select id="city" name="city">
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
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="url">
                                    <Form.Label>Website URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="URL"
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




export default CreateCinema;