import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import Header from '../Header/header'
import { Link } from 'react-router-dom'

class CreateShowtime extends Component {

    render() {
        function setDate(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                    dd='0'+dd
                } 
                if(mm<10){
                    mm='0'+mm
                }
            today = yyyy+'-'+mm+'-'+dd;
            console.log(today)
            return today;
        }
        function setDateMax(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+3; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                    dd='0'+dd
                } 
                if(mm<10){
                    mm='0'+mm
                }
            today = yyyy+'-'+mm+'-'+dd;
            console.log(today)
            return today;
        }
       
        return (
            <div>
                <Header />
                <div className="top-margin-header"></div>
                <div className="container">
                    <div className="Login">
                        <div className="card font-text">
                            <h4 className="m-3 text-center" >Add Showtime to Cinema</h4>
                            <Form className="mt-3" action="/create-cinema" method="">
                                <Form.Group className="input-style" controlId="moviename">
                                    <Form.Label>Movie Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        placeholder="Movie Name"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="date">
                                <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        min={setDate()}
                                        max={setDateMax()}
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="time">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        placeholder="Time"
                                    />
                                </Form.Group>
                                <Form.Group className="input-style" controlId="screen">
                                    <Form.Label>Screen type</Form.Label>
                                    <select id="type" name="type">
                                        <option value="gold1">Gold-1</option>
                                        <option value="gold2">Gold-2</option>
                                        <option value="plat1">Platinum-1</option>
                                        <option value="plat2">Platinum-2</option>
                                    </select>
                                </Form.Group>
                                <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                    SAVE
                                </Button>
                            </Form>



                        </div>
                    </div>
                </div>
                <div className="bottom-margin-header"></div>
            </div>
        )
    }
}




export default CreateShowtime;