import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import { loginUser } from './../../actions/index';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        success: false,
        validated: false,
        redirect: false
    }
    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }
    componentDidMount(){
        if(this.props.user){
            if(this.props.user.login){
                if(this.props.user.login.isAuth){
                    this.props.history.push('/')
                }
            }
        }
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.user.login.isAuth){
            nextProps.history.push('/')
        }
        else{
            // this.setState({error:nextProps.user.login.message})
            //setTimeout(()=>{this.setState({error:''}) }, 5000)
            return {
                error:nextProps.user.login.message
            };
        }
        return null
    }
    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }
    render() {
        return (
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Login to your Account</h4>
                            <Form className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputEmail}
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
                                        required
                                    />
                                </Form.Group>
                                <Link to="forgot"><p className="left-margin-text">Forgot Password?</p></Link>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Sign In
                                </Button>
                                <div className="error">{this.state.error}</div>
                                <p style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Do not have an account? <Link to="register">Create here</Link></p>
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

export default connect(mapStateToProps)(Login);