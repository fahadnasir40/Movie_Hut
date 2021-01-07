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
                    $(this).find('.fa').addClass('star-over');
                    $(this).prevAll().find('.fa').addClass('star-over');
                },
                mouseleave: function(event) {
                    $(this).find('.fa').removeClass('star-over');
                    $(this).prevAll().find('.fa').removeClass('star-over');
                }
            }, '.rate');
        
        
            $(document).on('click', '.rate', function() {
                if ( !$(this).find('.star').hasClass('rate-active') ) {
                    $(this).siblings().find('.star').addClass('fa').removeClass('fa rate-active');
                    $(this).find('.star').addClass('rate-active fas').removeClass('fa star-over');
                    $(this).prevAll().find('.star').addClass('fas').removeClass('fa star-over');
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
                    <div className="">
                        <div className="font-text">
                            <h4 className="m-3 text-center" >Add Review</h4>
                            <div className="row">
                                <h4 className="my-3 col-12" >The SpongeBob Movie: Sponge on the Run</h4>
                                <div className="my-3 col-12"><span>Movie Id: #44</span></div>
                            </div>
                            <Form className="mt-3" action='/movie'>
                                <Form.Group className="input-style" controlId="email">
                                    <Form.Label>Your Rating</Form.Label>
                                    <div>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label>Your Review</Form.Label>
                                    <div>
                                        <textarea  rows="15" cols="80"></textarea>
                                    </div>
                                </Form.Group>
                                <Form.Group className="input-style" controlId="password">
                                    <Form.Label className="mr-3">Mark as Spoiler  </Form.Label>
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                </Form.Group>
                                
                                <div className="col-4">
                                    <Button block className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                        Add Review
                                    </Button>
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




export default CreateReview;