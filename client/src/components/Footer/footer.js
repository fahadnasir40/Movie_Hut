import React, { Component } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <footer class="site-footer mt-2 ">
                <div class="container">
                    <div class="row ">
                        <div class="col-sm-12 col-md-3">
                            <h6 className="heading" style={{ color: '#d0d0d0' }}>Cinemas</h6>
                            <ul class="footer-links font-text">
                                <li><Link to="/cinemas/Lahore">Cinemas in Lahore</Link></li>
                                <li><Link to={`/cinemas/${"Karachi"}`}>Cinemas in Karachi</Link></li>
                                <li><Link to="/cinemas/Islamabad">Cinemas in Islamabad</Link></li>
                                <li><Link to="/cinemas/Multan">Cinemas in Multan</Link></li>
                            </ul>
                        </div>

                        <div class="col-xs-6 col-md-3">
                            <h6 className="heading" style={{ color: '#d0d0d0' }}>Movies</h6>
                            <ul class="footer-links font-text">
                                <li><a href="/">Top Movies</a></li>
                                <li><a href="/">Coming Soon</a></li>
                            </ul>
                        </div>
                        <div class="col-xs-6 col-md-3">
                            <h6 className="heading" style={{ color: '#d0d0d0' }}>Subscribe</h6>
                            <ul class="footer-links font-text">
                                <li><a href="#">Alerts for latest movies</a></li>
                            </ul>
                        </div>
                        <div class="col-xs-6 col-md-3">
                            <h6 className="heading" style={{ color: '#d0d0d0' }}>Contact</h6>
                            <ul class="footer-links font-text">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-12 ">
                            <span className="copyright-text offset-lg-2 col-xs-12 my-2 ">Copyright &copy; <Moment format='YYYY'></Moment> Movie Hut. All Rights Reserved.
                            </span>
                            <span className="footer-title  col-sm-12 col my-2"> MOVIE HUT</span>
                            <span className=" font-rc font-weight-bold  col-xs-12 my-2" style={{ opacity: '0.5', color: '#fff' }}> <a href="#"> Privacy Policy</a></span>
                            <span className=" font-rc font-weight-bold  col-xs-12 col my-2" style={{ opacity: '0.5', color: '#fff' }}> <a href="#"> Terms {'&'} Conditions</a></span>
                        </div>
                        {/* 
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <ul class="social-icons">
                                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                                <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;