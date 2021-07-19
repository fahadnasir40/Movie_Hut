import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import { } from './../../actions/index';


class Settings extends Component {
    state = {
        // _id:this.props.user.login.id,
        // name:'',
        // dob:'',
        // city:'',
        // error: '',
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
        // console.log(this.props)
        // this.props.dispatch(getUser(this.props.user.login.id));
    }
    static getDerivedStateFromProps(nextProps, state) {
        // console.log("Curr" ,nextProps)
        // if(state.cachedProps !== nextProps){
        //     if(nextProps.currentUser){
        //         if(nextProps.currentUser.user){
        //             return {
        //                 name: nextProps.currentUser.user.name,
        //                 dob: nextProps.currentUser.user.dob,
        //                 city: nextProps.currentUser.user.city,
        //                 cachedProps: nextProps
        //             }
        //         }
        //     }
        // }
        // if(nextProps.currentUser){
        //     if(nextProps.currentUser.message === "Updated successfully"){
        //         nextProps.history.push('/profile')
        //         // this.setState({success: 'Profile Updated'})
        //         // setTimeout(()=>{this.setState({error:'', success: ''}) }, 5000);
        //     }
        // }
        return null;
    }

    submitForm = (e) => {
        // e.preventDefault();
        // this.props.dispatch(updateUserInfo(this.state));
    }

    componentWillUnmount(){
        // this.props.dispatch(clearUser())
    }


    render() {
        return (
            <div>
                <Header user={this.props.user} />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h2 className="m-3 text-center" >Settings</h2>
                            <h4 className="m-3 ml-4" >General Settings</h4>
                            <Form id="myform" className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style col-12 inline-block" controlId="isSpoiler"> 
                                    <input type="checkbox" id="isSpoiler" name="isSpoiler" value={this.state.isSpoiler} onChange={this.handleInputSpoiler} />
                                    <Form.Label className="ml-3 textsize">Show reviews containing profane words</Form.Label>
                                </Form.Group>
                                <Form.Group className="input-style col-12 inline-block" controlId="isSpoiler"> 
                                    <input type="checkbox" id="isSpoiler" name="isSpoiler" value={this.state.isSpoiler} onChange={this.handleInputSpoiler} />
                                    <Form.Label className="ml-3 textsize">Show reviews containing spoilers</Form.Label>
                                </Form.Group>
                                <h4 className="m-3 ml-4 mb-4" >Notification Settings</h4>
                                <Form.Group className="input-style col-12 inline-block" controlId="isSpoiler"> 
                                    <input type="checkbox" id="isSpoiler" name="isSpoiler" value={this.state.isSpoiler} onChange={this.handleInputSpoiler} />
                                    <Form.Label className="ml-3 textsize">Email me about showtimes in favourite cinemas</Form.Label>
                                </Form.Group>
                                <Form.Group className="input-style col-12 inline-block" controlId="isSpoiler"> 
                                    <input type="checkbox" id="isSpoiler" name="isSpoiler" value={this.state.isSpoiler} onChange={this.handleInputSpoiler} />
                                    <Form.Label className="ml-3 textsize">Email me about upcoming movies</Form.Label>
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark ml-4 mb-3" style={{ borderRadius: '100px', textAlign: "center", width: "15em" }} size="lg" type="submit">
                                    Update Settings
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

export default connect(mapStateToProps)(Settings);