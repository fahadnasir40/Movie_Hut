import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../Header/header'
class Login extends Component {
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
                            <h4 className="m-3 text-center" >Login to your Account</h4>
                            <Form className="mt-3" action='/'>
                            <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <p className="left-margin-text">Forgot Password?</p>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Sign In
                                </Button>
                                <p style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Do not have an account? Create here</p>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="bottom-margin-header"></div>
            </div>
        )
    }
}




export default Login;