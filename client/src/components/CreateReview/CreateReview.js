import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../Header/header'
import { Link } from 'react-router-dom'
import $ from 'jquery';


class CreateReview extends Component {
    // state = {
    //     email: '',
    //     password: '',
    //     error: '',
    //     success: false,
    //     validated: false,
    // }
    componentDidMount() {
       
        $(function() {
	
            $(document).on({
                mouseover: function(event) {
                    $(this).find('.far').addClass('star-over');
                    $(this).prevAll().find('.far').addClass('star-over');
                },
                mouseleave: function(event) {
                    $(this).find('.far').removeClass('star-over');
                    $(this).prevAll().find('.far').removeClass('star-over');
                }
            }, '.rate');
        
        
            $(document).on('click', '.rate', function() {
                if ( !$(this).find('.star').hasClass('rate-active') ) {
                    $(this).siblings().find('.star').addClass('far').removeClass('fas rate-active');
                    $(this).find('.star').addClass('rate-active fas').removeClass('far star-over');
                    $(this).prevAll().find('.star').addClass('fas').removeClass('far star-over');
                } else {
                    console.log('has');
                }
            });
            
        });
        
        
            

    }
    render() {
        
        
        
  function handleSubmit(event) {
    event.preventDefault();
  }
        return (
           
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Add Review</h4>
                            <div class="wrap">
                <div class="stars">
                    <label class="rate">
                        <input type="radio" name="radio1" id="star1" value="star1"/>
                        <div class="face"></div>
                        <i class="fa fa-star star one-star"></i>
                    </label>
                    <label class="rate">
                    <input type="radio" name="radio1" id="star2" value="star2"/>
                    <div class="face"></div>
                    <i class="fa fa-star star two-star"></i>
                    </label>
                    <label class="rate">
                        <input type="radio" name="radio1" id="star3" value="star3"/>
                        <div class="face"></div>
                        <i class="fa fa-star star three-star"></i>
                    </label>
                    <label class="rate">
                        <input type="radio" name="radio1" id="star4" value="star4"/>
                        <div class="face"></div>
                        <i class="fa fa-star star four-star"></i>
                    </label>
                    <label class="rate">
                        <input type="radio" name="radio1" id="star5" value="star5"/>
                        <div class="face"></div>
                        <i class="fa fa-star star five-star"></i>
                    </label>
                </div>
            </div>
                            <Form className="mt-3" action="/login">
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="dob">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        min="1920-01-01"
                                        max="2010-12-31"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="cPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    Sign Up
                                </Button>
                                <p style={{ fontFamily: 'Roboto', textAlign: 'center' }}>Already have an account? Sign In</p>
                                <hr class="register-line" size="1"/>
                                <p className="input-style" style={{ fontFamily: 'Roboto', textAlign: 'center' }}>By clicking Sign Up, you agree to you agree to the <Link to="#">Terms</Link> and <Link to="#">Private policy</Link></p>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="bottom-margin-header"></div>
            </div>
        )
    }
}




export default CreateReview;