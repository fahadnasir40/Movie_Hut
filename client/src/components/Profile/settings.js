import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import { getUserSettings, updateUserInfo, clearUser } from './../../actions/index';


class Settings extends Component {
    state = {
        _id:this.props.user.login.id,
        // name:'',
        // dob:'',
        // city:'',
        // error: '',
        cb1: false,
        cb2: false,
        cb3: false,
        cb4: false,
        success: '',
        validated: false,
        cachedProps: null
    }

    handleInputCb1 = (event) => {
        this.setState({cb1:event.target.checked})
    }
    handleInputCb2 = (event) => {
        this.setState({cb2:event.target.checked})
    }
    handleInputCb3 = (event) => {
        this.setState({cb3:event.target.checked})
    }
    handleInputCb4 = (event) => {
        this.setState({cb4:event.target.checked})
    }
    componentDidMount = () => {
        // console.log(this.props)
        this.props.dispatch(getUserSettings(this.props.user.login.id));
    }
    static getDerivedStateFromProps(nextProps, state) {
        console.log("Curr" ,nextProps)
        if(state.cachedProps !== nextProps){
            if(nextProps.currentUser){
                if(nextProps.currentUser.user){
                    return {
                        cb1: nextProps.currentUser.user.cb1,
                        cb2: nextProps.currentUser.user.cb2,
                        cb3: nextProps.currentUser.user.cb3,
                        cb4: nextProps.currentUser.user.cb4,
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
                            <h2 className="m-3 text-center" >Settings</h2>
                            <h4 className="m-3 ml-4" >General Settings</h4>
                            <Form id="myform" className="mt-3" onSubmit={this.submitForm}>
                                <Form.Group className="input-style col-12 inline-block" controlId="cb1"> 
                                    <input type="checkbox" id="cb1" name="cb1" checked={this.state.cb1} onChange={this.handleInputCb1} />
                                    <Form.Label className="ml-3 textsize">Show reviews containing profane words</Form.Label>
                                </Form.Group>
                                <Form.Group className="input-style col-12 inline-block" controlId="cb2"> 
                                    <input type="checkbox" id="cb2" name="cb2" checked={this.state.cb2} onChange={this.handleInputCb2} />
                                    <Form.Label className="ml-3 textsize">Show reviews containing spoilers</Form.Label>
                                </Form.Group>
                                <h4 className="m-3 ml-4 mb-4" >Notification Settings</h4>
                                <Form.Group className="input-style col-12 inline-block" controlId="cb3"> 
                                    <input type="checkbox" id="cb3" name="cb3" checked={this.state.cb3} onChange={this.handleInputCb3} />
                                    <Form.Label className="ml-3 textsize">Email me about showtimes in favourite cinemas</Form.Label>
                                </Form.Group>
                                <Form.Group className="input-style col-12 inline-block" controlId="cb4"> 
                                    <input type="checkbox" id="cb4" name="cb4" checked={this.state.cb4} onChange={this.handleInputCb4} />
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