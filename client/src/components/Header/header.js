import React, { Component } from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import NavItems from './navItems'

class Header extends Component {
    render() {
        console.log("HEADER PROPS", this.props)
        return (
            <Navbar style={{ background: "black" }} variant="dark">
                <Navbar.Brand href="/" className="nav-brand">
                    MOVIE HUT
                </Navbar.Brand>
                {   
                    this.props.user ? 
                        this.props.user.login.error === true ?
                        <Nav className="ml-auto">
                            
                            <Nav.Link href="login">Sign In</Nav.Link>
                            <Nav.Link eventKey={2} href="register">
                                Sign Up
                            </Nav.Link>                    
                        </Nav>
                        
                        :  <Nav className="ml-auto mr-2"><NavItems user = {this.props.user.login}/></Nav>
                    : null
                }
                
            </Navbar>
        )
    }
}

export default Header;