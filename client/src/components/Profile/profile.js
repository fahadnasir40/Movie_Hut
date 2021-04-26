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
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <h4 className="m-3 text-center">Personal Information</h4>
                    <p>Full Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Date of Birth: {user.dob}</p>
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