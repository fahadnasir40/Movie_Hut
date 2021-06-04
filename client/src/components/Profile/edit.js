import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import { getUser, updateUserInfo, clearUser } from './../../actions/index';


class EditProfile extends Component {
    state = {
        _id:this.props.user.login.id,
        name:'',
        dob:'',
        city:'',
        error: '',
        success: '',
        validated: false,
        cachedProps: null
    }

    handleInputName = (event) => {
        this.setState({name:event.target.value})
    }
    handleInputDob = (event) => {
        this.setState({dob:event.target.value})
    }
    handleInputCity = (event) => {
        this.setState({city:event.target.value})
    }
    componentDidMount = () => {
        console.log(this.props)
        this.props.dispatch(getUser(this.props.user.login.id));
    }
    static getDerivedStateFromProps(nextProps, state) {
        console.log("Curr" ,nextProps)
        if(state.cachedProps !== nextProps){
            if(nextProps.currentUser){
                if(nextProps.currentUser.user){
                    return {
                        name: nextProps.currentUser.user.name,
                        dob: nextProps.currentUser.user.dob,
                        city: nextProps.currentUser.user.city,
                        cachedProps: nextProps
                    }
                }
            }
        }
        if(nextProps.currentUser){
            if(nextProps.currentUser.message === "Updated successfully"){
                nextProps.history.push('/profile')
                // this.setState({success: 'Profile Updated'})
                // setTimeout(()=>{this.setState({error:'', success: ''}) }, 5000);
            }
        }
        return null;
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateUserInfo(this.state));
    }

    componentWillUnmount(){
        this.props.dispatch(clearUser())
    }


    render() {
        return (
            <div>
                <Header user={this.props.user} />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Edit Profile</h4>
                            <Form className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style" controlId="name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        placeholder="Full Name"
                                        value={this.state.name}
                                        onChange={this.handleInputName}
                                        maxLength="100"
                                        minLength="3"
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
                                <Form.Group className="input-style " controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <select id="city" name="city" className="form-control" onChange={this.handleInputCity}>
                                        <option value="Lahore">Lahore</option>
                                        <option value="Islamabad">Islamabad</option>
                                        <option value="Multan">Multan</option>
                                        <option value="Karachi">Karachi</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Update Profile
                                </Button>
                                <div className="error">
                                    {this.state.error}
                                </div>
                                <div className="success">
                                    {this.state.success}
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
        currentUser: state.user.user
    }
}

export default connect(mapStateToProps)(EditProfile);