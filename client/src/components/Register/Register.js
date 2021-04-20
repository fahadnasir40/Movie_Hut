import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import {userRegister} from './../../actions/index';


class Register extends Component {
    state = {
        name:'',
        email: '',
        dob:'',
        password: '',
        confirmPassword:'',
        error: '',
        success: false,
        validated: false,
    }

    handleInputName = (event) => {
        this.setState({name:event.target.value})
    }
    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handleInputDob = (event) => {
        this.setState({dob:event.target.value})
    }
    handleInputPassword= (event) => {
        this.setState({password:event.target.value})
    }
    handleInputConfirmPassword = (event) => {
        this.setState({confirmPassword:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error,try again'})
        } else{
            this.setState({
                name:'',
                lastname:'',
                email:'',
                password:''
            })
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''});

        this.props.dispatch(userRegister({
            name:this.state.name,
            email:this.state.email,
            dob:this.state.dob,
            password:this.state.password
        }))
        
    }

    render() {
        return (
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Create your Account</h4>
                            <Form className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style" controlId="name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        placeholder="Full Name"
                                        value={this.state.name}
                                        onChange={this.handleInputName}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputEmail}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="dob">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        min="1920-01-01"
                                        max="2010-12-31"
                                        value={this.state.dob}
                                        onChange={this.handleInputDob}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputPassword}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="cPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleInputConfirmPassword}
                                    />
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Sign Up
                                </Button>
                                <p style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Already have an account? <Link to="login">Sign In</Link></p>
                                <hr class="register-line" size="1" />
                                <p className="input-style" style={{ fontFamily: 'Roboto', textAlign: 'center' }}>By clicking Sign Up, you agree to you agree to the <Link to="#">Terms</Link> and <Link to="#">Private policy</Link></p>
                                <div className="error">
                                    {this.state.error}
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

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);