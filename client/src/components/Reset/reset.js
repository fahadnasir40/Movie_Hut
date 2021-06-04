import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../Header/header';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { resetPassword, updatePasswordEmail } from './../../actions/index';

class reset extends Component {
    state = {
        password: '',
        error: '',
        success: ''
    }
    componentDidMount() {
      console.log(this.props)
      this.props.dispatch(resetPassword(this.props.match.params.id))
    }
    componentWillReceiveProps(nextProps){
      console.log(nextProps)
      if(nextProps.user.message == "password reset link is invalid or has expired"){
            nextProps.history.push("/reset-expired")
        //   this.setState({error:'Password Reset Link is Invalid or has Expired', success:''})
        //   setTimeout(()=>{this.setState({success:'',error:''}) }, 5000);
        //   document.getElementById("mybtn").disabled = true;
      }
      else if(nextProps.user.message.message == "password updated"){
        this.setState({success:'Password updated successfully.'})
        setTimeout(()=>{nextProps.history.push("/login") }, 2000);
      }
      
    }    
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }
    updatePassword = (e) => {
        e.preventDefault();
        this.props.dispatch(updatePasswordEmail(this.props.match.params.id, this.state.password))
    };
    render() {
        return (
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Reset Password</h4>
                            <Form className="mt-3" onSubmit={this.updatePassword}>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter new Password"
                                        value={this.state.password}
                                        onChange={this.handleInputPassword}
                                        minlength="6"
                                        required
                                    />
                                </Form.Group>
                                <Button block id="mybtn" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
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

export default connect(mapStateToProps)(reset);