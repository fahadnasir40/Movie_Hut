import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Header from '../../Header/header'
import { Modal, Form, Button } from 'react-bootstrap'
import { getCinemaMovieShowtimes, addShowtime, clearMovieShowtimes } from '../../../actions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class Showtime extends Component {


    state = {
        events: [
            // {
            //     start: moment().toDate(),
            //     end: moment().add(0.4, "hours").toDate(),
            //     title: "Movie 1",
            // },
            // {
            //     'title': 'Movie 2',
            //     'allDay': true,
            //     'start': moment().toDate(),
            //     'end': moment().add(1, "hours").toDate(),
            // }, {
            //     'title': 'Movie 3',

            //     'start': moment().toDate(),
            //     'end': moment().add(3, "hours").toDate(),
            // }, {
            //     'title': 'Movie 4',

            //     'start': moment().toDate(),
            //     'end': moment().add(0.5, "hours").toDate(),
            // }, {
            //     'title': 'Movie 5',

            //     'start': moment().toDate(),
            //     'end': moment().add(0.2, "hours").toDate(),
            // }, {
            //     'title': 'Movie 7',

            //     'start': moment().toDate(),
            //     'end': moment().add(4, "hours").toDate(),
            // },
        ],
        title: '',
        language: 'English',
        date: '',
        time: '',
        screenType: '',
        show: false,
        redirect: false
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.showtimes) {
            if (nextProps.showtimes.showtime) {
                if (prevState.movie) {
                    const events = [];
                    nextProps.showtimes.showtime.forEach((item => {
                        let language = item.language == 'Urdu' ? ' (Urdu)' : '';
                        const event = {
                            title: "Screen: " + item.screenType + language,
                            start: moment(item.date).toDate(),
                            end: moment(item.date).add("minute", item.runtime).toDate()
                        }
                        console.log("Event", event)
                        events.push(event)
                    }))


                    return {
                        events: events
                    }
                }

            }

        }

        return null;
    }

    onEventResize = (data) => {
        const { start, end } = data;

        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    onEventDrop = (data) => {
        // console.log(data);
    };


    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);


    setDate = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        // console.log(today)
        return today;
    }
    setDateMax = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 3; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        // console.log(today)
        return today;
    }
    handleInputName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleInputLanguage = (event) => {
        this.setState({ language: event.target.value })
    }
    handleInputDate = (event) => {
        this.setState({ date: event.target.value })
    }
    handleInputTime = (event) => {
        this.setState({ time: event.target.value })
    }
    handleInputScreen = (event) => {
        this.setState({ screenType: event.target.value })
    }

    handleSubmit = (event) => {
        // console.log("Inside handle submit")
        event.preventDefault();
        this.props.dispatch(addShowtime({
            language: this.state.language,
            date: this.state.date,
            runtime: this.state.movie.runtime,
            screenType: this.state.screenType,
            cinemaId: this.state.cinemaId,
            movieId: this.state.movie._id
        }))
    }

    addShowtime = () => {
        let movie = this.state.movie;
        return (
            <Modal
                show={this.state.show} onHide={this.handleClose}
                size="lg"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className=" text-center" style={{ opacity: '0.8', fontSize: '18px' }}>
                        Add a new showtime
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="container">
                        <Form className="mt-3" onSubmit={this.handleSubmit}>
                            <div>
                                <div className="input-style my-2" >
                                    <div className="d-flex float-right">
                                        <strong>  Showtime: {movie.runtime} Minutes</strong>
                                    </div>
                                    <Form.Label><strong>{movie.title}</strong></Form.Label>

                                </div>
                            </div>
                            <Form.Group className="input-style" controlId="language">
                                <Form.Label>Language</Form.Label>
                                <select id="language" name="language" className="form-control" onChange={this.handleInputLanguage}>
                                    <option value="English">English</option>
                                    <option value="Urdu">Urdu</option>
                                </select>
                            </Form.Group>
                            <Form.Group className="input-style" controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    min={this.setDate()}
                                    max={this.setDateMax()}
                                    value={this.state.date}
                                    onChange={this.handleInputDate}
                                />
                            </Form.Group>
                            {/* <Form.Group className="input-style" controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="Time"
                                    value={this.state.time}
                                    onChange={this.handleInputTime}
                                />
                            </Form.Group> */}
                            <Form.Group className="input-style" controlId="screen">
                                <Form.Label>Screen type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Screen Type"
                                    value={this.state.screenType}
                                    onChange={this.handleInputScreen}
                                />
                                {/* <select id="type" name="type">
                                    <option value="gold1">Gold-1</option>
                                    <option value="gold2">Gold-2</option>
                                    <option value="plat1">Platinum-1</option>
                                    <option value="plat2">Platinum-2</option>
                                </select> */}
                            </Form.Group>
                            <Button block id="btn-size" className="btn-dark mt-4 mb-3" style={{ borderRadius: '100px' }} size="lg" type="submit">
                                SAVE
                                </Button>
                        </Form>

                    </div>
                </Modal.Body>

            </Modal>
        )
    }


    componentDidMount() {

        if (this.props.location.showtimeProps) {
            let id = this.props.location.showtimeProps.cinemaId;
            let movieId = this.props.location.showtimeProps.movie._id;

            this.props.dispatch(getCinemaMovieShowtimes(id, movieId));
            this.setState({
                cinemaId: id,
                movie: this.props.location.showtimeProps.movie
            })

        }
        else {
            this.setState({
                redirect: true
            })
        }

    }
    componentWillUnmount() {
        this.props.dispatch(clearMovieShowtimes())
    }

    render() {
        if (this.state.redirect == true) {
            return <Redirect to="/admin-cinemas" />
        }

        const localizer = momentLocalizer(moment)
        let movie = this.state.movie;


        return (
            <div>
                <Header />
                {movie ?
                    <div className="container">
                        {this.addShowtime()}
                        <div className="row my-4">
                            <div className="col">
                                <h4>{movie.title}</h4>
                            </div>
                            <div className="col ">
                                <button type="button" onClick={this.handleShow} className="btn btn-dark d-flex float-right"> New Showtime</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-4">
                                <Calendar
                                    defaultDate={moment().toDate()}
                                    defaultView="month"
                                    events={this.state.events}
                                    localizer={localizer}
                                    onEventDrop={this.onEventDrop}
                                    onEventResize={this.onEventResize}
                                    resizable
                                    style={{ height: "100vh" }} />
                            </div>
                        </div>

                    </div>
                    : null}

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("State", state)
    return {
        showtimes: state.showtime.movieShowtimes
    }
}

export default connect(mapStateToProps)(Showtime);