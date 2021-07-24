import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import Header from '../Header/header';
import { Link } from 'react-router-dom';
import {} from './../../actions/index';


class profile extends Component {
    
    render() {
        let user = this.props.user.login;
        return (
            <div>
                <Header user={this.props.user} />
                <div className="top-margin-header"></div>
                <div className="container">
                    <h4 className="m-3 text-center">Personal Information</h4>
                    <Link to="/edit-profile">
                        <Button  className="btn-dark mt-2 mb-3 edit-profile" style={{ borderRadius: '100px' }}  type="submit">
                            Edit Profile
                        </Button>
                    </Link>
                    <div className="edit-profile-hieght">
                        <p>Full Name:<div  style={{ marginRight: "2.5em", display: "inline" }}></div> {user.name}</p>
                        <hr />
                        <p>Email:<div  style={{ marginRight: "4.5em", display: "inline" }}></div> {user.email}</p>
                        <hr />
                        <p>Date of Birth:<div  style={{ marginRight: "1.3em", display: "inline" }}></div> {user.dob}</p>
                        <hr />
                    </div>
                    <Link to="/settings">
                        <Button className="btn-dark mt-2 mb-3 edit-profile" style={{ borderRadius: '100px' }}  type="submit">
                            Settings
                        </Button>
                    </Link>
                    <Link to="/updatePassword">
                        <Button className="btn-dark mt-2 mb-3 mr-2 edit-profile" style={{ borderRadius: '100px' }}  type="submit">
                            Change Password
                        </Button>
                    </Link>
                    
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

export default connect(mapStateToProps)(profile);