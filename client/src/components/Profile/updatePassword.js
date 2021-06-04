import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'react-bootstrap'
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import { changePassword, clearUpdatePassword } from './../../actions/index';

class updatePassword extends Component {
    state = {
        email: this.props.user.login.email,
        newPassword: '',
        password: '',
        error: '',
        success: '',
        validated: false,
        redirect: false
    }
    handleInputNewPassword = (event) => {
        this.setState({newPassword:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }
    componentWillUnmount(){
        this.props.dispatch(clearUpdatePassword())
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.user.message){
            // setTimeout(()=>{this.setState({success:''}) }, 5000)
            if(nextProps.user.message.message === "Current Password is wrong"){
                return {
                    error:nextProps.user.message.message,
                    success:''
                };
            }
            else if (nextProps.user.message.message === "Password updated"){
                nextProps.history.push('/profile')
            }
        }
        return null
    }
    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(changePassword(this.state))
    }
    render() {
        return (
            <div>
                <Header user={this.props.user} />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Change Account Password</h4>
                            <Form className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Current Password"
                                        value={this.state.password}
                                        onChange={this.handleInputPassword}
                                        maxLength="20"
                                        minLength="6"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        value={this.state.newPassword}
                                        onChange={this.handleInputNewPassword}
                                        maxLength="20"
                                        minLength="6"
                                        required
                                    />
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Update Password
                                </Button>
                                <div className="error">{this.state.error}</div>
                                <div className="success">{this.state.success}</div>
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

export default connect(mapStateToProps)(updatePassword);