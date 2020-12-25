import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../Header/header'
import { Link } from 'react-router-dom'



class Register extends Component {
    // state = {
    //     email: '',
    //     password: '',
    //     error: '',
    //     success: false,
    //     validated: false,
    // }
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
                            <h4 className="m-3 text-center" >Create your Account</h4>
                            <Form className="mt-3" action="/login">
                                <Form.Group className="input-style" controlId="name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        pattern="[a-zA-Z]+"
                                        oninvalid="setCustomValidity('Please enter alphabets only.')"
                                        placeholder="Full Name"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="dob">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        min="1920-01-01"
                                        max="2010-12-31"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="cPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Sign Up
                                </Button>
                                <p style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Already have an account? Sign In</p>
                                <hr class="register-line" size="1"/>
                                <p className="input-style" style={{ fontFamily: 'Roboto', textAlign: 'center' }}>By clicking Sign Up, you agree to you agree to the <Link to="#">Terms</Link> and <Link to="#">Private policy</Link></p>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="bottom-margin-header"></div>
            </div>
        )
    }
}




export default Register;