import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../Header/header';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { forgotPassword } from './../../actions/index';

class forgot extends Component {
    state = {
        email: '',
        error: '',
        success: ''
    }
    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    sendEmail = (e) => {
      e.preventDefault();
      this.props.dispatch(forgotPassword(this.state.email))
    };
    componentWillReceiveProps(nextProps){
      console.log(nextProps)
      if(nextProps.user.message == "recovery email sent"){
          this.setState({error:'', success:'Recovery Email sent'})
          setTimeout(()=>{this.setState({success:''}) }, 5000);
      }else if(nextProps.user.message == "email not in db"){
        this.setState({error:'Email not in db', success:''})
        setTimeout(()=>{this.setState({error:''}) }, 5000);
      }
      else if(nextProps.user.message == "email required"){
        this.setState({error:'Email required', success:''})
          setTimeout(()=>{this.setState({error:''}) }, 5000);
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
                            <h4 className="m-3 text-center" >Forgot Password</h4>
                            <Form className="mt-3" onSubmit={this.sendEmail}>
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
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                Send Reset Link
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

export default connect(mapStateToProps)(forgot);