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
        showProfaneWords: false,
        emailNotification: false,
        success: '',
        validated: false,
        cachedProps: null
    }

    handleInputshowProfaneWords = (event) => {
        this.setState({showProfaneWords:event.target.checked})
    }
    handleInputemailNotification = (event) => {
        this.setState({emailNotification:event.target.checked})
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
                        showProfaneWords: nextProps.currentUser.user.showProfaneWords,
                        emailNotification: nextProps.currentUser.user.emailNotification,
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
                            
                            <Form id="myform" className="mt-3" onSubmit={this.submitForm}>
                            <h5 className="m-3 ml-4" >General Settings</h5>
                                <Form.Group className="mb-2 ml-4" controlId="showProfaneWords">
                                    <Form.Check type="switch" label="Show reviews containing profane words" checked={this.state.showProfaneWords} onChange={this.handleInputshowProfaneWords}/>
                                </Form.Group>
                                {/* <Form.Group className="input-style col-12 inline-block" controlId="showProfaneWords"> 
                                    <input type="checkbox" id="showProfaneWords" name="showProfaneWords" checked={this.state.showProfaneWords} onChange={this.handleInputshowProfaneWords} />
                                    <Form.Label className="ml-3 textsize">Show reviews containing profane words</Form.Label>
                                </Form.Group> */}
                                <h5 className="m-3 ml-4 mb-2" >Notification Settings</h5>
                                <Form.Group className="mb-3 ml-4" controlId="emailNotification">
                                    <Form.Check type="switch" label="Email me about upcoming movies" checked={this.state.emailNotification} onChange={this.handleInputemailNotification}/>
                                </Form.Group>
                                {/* <Form.Group className="input-style col-12 inline-block" controlId="emailNotification"> 
                                    <input type="checkbox" id="emailNotification" name="emailNotification" checked={this.state.emailNotification} onChange={this.handleInputemailNotification} />
                                    <Form.Label className="ml-3 textsize">Email me about upcoming movies</Form.Label>
                                </Form.Group> */}
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