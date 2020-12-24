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
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Login to your Account</h4>
                            <Form className="mt-5">
                                <Form.Group size="lg" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        
                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                    />
                                </Form.Group>
                                <p>Forgot Password</p>
                                <Button className="btn-dark mt-5 mb-3" style={{ borderRadius: '200px' }}block size="lg" type="submit">
                                    Sign In
                                </Button>
                                <p style={{ fontFamily: 'Roboto' }}>Do not have an account? Create here</p>
                            </Form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




export default Login;