import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Form } from 'react-bootstrap'
import { clearReviewReport, reportReview } from './../../actions'

class ReportReview extends Component {

    state = {
        show: false,
        reported: false,
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        reasonDescription: '',
        message: '',
        disabled: true,
        cachedProps: '',
        review: ''
    }

    componentDidMount() {
        this.setState({
            review: this.props.review
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.cachedProps != nextProps) {

            if (nextProps.reportReview) {
                if (nextProps.reportReview.reviewId == prevState.review._id) {
                    if (nextProps.reportReview.post == true) {
                        return {
                            reported: true,
                            show: false,
                            cachedProps: nextProps
                        }
                    }
                    else if (nextProps.reportReview.post == false) {
                        return {
                            message: nextProps.reportReview.message,
                            cachedProps: nextProps
                        }
                    }
                }
            }

        }
    }

    setShow = (value) => {
        this.setState({
            show: value
        })
    }

    handleClose = () => {
        this.setState({
            option1: false,
            option2: false,
            option3: false,
            option4: false,
            reasonDescription: '',
            message: ''
        })

        this.setShow(false)
        this.props.dispatch(clearReviewReport());
    };

    handleShow = () => {
        if (this.state.reported == false) {
            if (this.props.user.login.isAuth) {
                this.setShow(true);
            }
            else {
                this.props.history.push('/login');
            }
        }
    }


    handleInputOption1 = (e) => {
        this.setState({
            option1: e.target.checked
        })
    }


    handleInputOption2 = (e) => {
        this.setState({
            option2: e.target.checked
        })
    }


    handleInputOption3 = (e) => {
        this.setState({
            option3: e.target.checked
        })
    }

    handleInputDescription = (e) => {
        this.setState({
            reasonDescription: e.target.value
        })
    }

    submitForm = () => {
        if (this.checkDisabled() === false) {
            let reasons = new Array();
            if (this.state.reasonDescription.length > 0)
                reasons.push('other')
            if (this.state.option1 === true)
                reasons.push('spoiler')
            if (this.state.option2 === true)
                reasons.push('irrelevant')
            if (this.state.option3 === true)
                reasons.push('hate and abbusive')


            const report = {
                reasons: reasons,
                reasonDescription: this.state.reasonDescription.trim(),
                reviewId: this.props.review._id
            }

            this.props.dispatch(reportReview(report));
            this.handleClose();
        }
    }

    checkDisabled = () => {
        if (this.state.reasonDescription.length > 1) {
            return false;
        }
        else if (this.state.option1 === true || this.state.option2 === true || this.state.option3 === true) {
            return false;
        }
        else {
            return true;
        }
    }


    componentWillUnmount() {
        this.props.dispatch(clearReviewReport())
    }

    render() {

        const btnDisabled = this.checkDisabled();

        return (
            <div className="col-md-3 col-12 text-right m-0">
                <small style={{ cursor: "pointer" }} onClick={this.handleShow}>{this.state.reported ? 'Review reported' : 'Report review'}</small>
                <Modal
                    show={this.state.show} onHide={this.handleClose}
                    size="lg"
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header className="primary" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="heading text-center" style={{ opacity: '0.8', fontSize: '18px' }}>
                            Report Review
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Please select a reason for report</h6>

                        <div class="row">
                            <Form.Group className="input-style col-6 mt-2" controlId="report-spoiler">
                                <Form.Label className="mr-3"> Spoiler not marked</Form.Label>
                                <input type="checkbox" id="report-spoiler" name="report-spoiler" value={this.state.option1} onChange={this.handleInputOption1} />
                            </Form.Group>

                            <Form.Group className="input-style col-6" controlId="report-irrelevant">
                                <Form.Label className="mr-3">Irrelevant to movie  </Form.Label>
                                <input type="checkbox" id="report-irrelevant" name="report-irrelevant" value={this.state.option2} onChange={this.handleInputOption2} />
                            </Form.Group>
                        </div>
                        <div class="row">
                            <Form.Group className="input-style col-8 " controlId="report-hate">
                                <Form.Label className="mr-3"> Hate speech or abbusive comment</Form.Label>
                                <input type="checkbox" id="report-hate" name="report-hate" value={this.state.option3} onChange={this.handleInputOption3} />
                            </Form.Group>
                        </div>
                        <div class="row">
                            <Form.Group className="col-12 col-md-11" controlId="review">
                                <Form.Label>Please provide a reason here if not listed above.</Form.Label>
                                <Form.Control required as="textarea" id="review-textarea" rows={3} maxLength={250} value={this.state.reasonDescription} placeholer={"Enter reason here."} onChange={this.handleInputDescription} />
                            </Form.Group>
                        </div>
                        <div className="row">
                            <span className="col-12 text-danger">{this.state.message}</span>
                            <span className="col-12 text-right">
                                <div className="btn btn-light mr-4" onClick={this.handleClose}>Back</div>
                                <button className="btn btn-dark" disabled={btnDisabled} onClick={this.submitForm}>Submit Report</button>
                            </span>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>


        )
    }
}


function mapStateToProps(state) {
    return {
        reportReview: state.movie.reportReview
    }
}

export default connect(mapStateToProps)(ReportReview)