import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import { userRegister, loginUser } from './../../actions/index';


class Register extends Component {
    state = {
        name: '',
        email: '',
        dob: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: '',
        validated: false,
    }

    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleInputEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    handleInputDob = (event) => {
        this.setState({ dob: event.target.value })
    }
    handleInputPassword = (event) => {
        this.setState({ password: event.target.value })
    }
    handleInputConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    static getDerivedStateFromProps(nextProps, state) {
        console.log(nextProps)
        if (nextProps.user.register === false) {
            return { error: 'Error registering the user, try again' }
        }
        if (nextProps.user.login.isAuth) {
            nextProps.history.push('/')
        }
        else if (nextProps.user.register === true) {
            {

                if (nextProps.user.login.isAuth) {
                    nextProps.history.push('/')
                }

                // if(nextProps.user.login.error){
                //     nextProps.history.push('/login')
                // } 
                nextProps.dispatch(loginUser({
                    email: state.email,
                    password: state.password
                }))
                // this.setState({
                //     name:'',
                //     email:'',
                //     dob:'',
                //     password: '',
                //     confirmPassword:'',
                //     success: 'Registered successfully',
                // })

            }
            return null;
            // setTimeout(()=>{this.setState({error:'', success: ''}) }, 5000);
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ error: '', success: '' });
        if (this.state.password === this.state.confirmPassword) {
            this.props.dispatch(userRegister({
                name: this.state.name,
                email: this.state.email,
                dob: this.state.dob,
                password: this.state.password
            }))
        }
        else {
            this.setState({ error: 'Password and Confirm pawword do not match', success: '' });
            setTimeout(() => { this.setState({ error: '', success: '' }) }, 5000);
        }
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
                                        maxlength="100"
                                        minlength="3"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputEmail}
                                        maxlength="50"
                                        required
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
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputPassword}
                                        maxlength="20"
                                        minlength="6"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="cPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleInputConfirmPassword}
                                        maxlength="20"
                                        minlength="6"
                                        required
                                    />
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Sign Up
                                </Button>
                                <div className="error">
                                    {this.state.error}
                                </div>
                                <div className="success">
                                    {this.state.success}
                                </div>
                                <p style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Already have an account? <Link to="login">Sign In</Link></p>
                                <hr class="register-line" size="1" />
                                <p className="input-style" style={{ fontFamily: 'Roboto', textAlign: 'center' }}>By clicking Sign Up, you agree to you agree to the <Link to="terms-and-conditions">Terms</Link> and <Link to="privacy-policy">Private policy</Link></p>

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
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);