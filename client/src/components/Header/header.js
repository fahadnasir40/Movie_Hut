import React, { Component } from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'

class Header extends Component {

    render() {
        return (
            <Navbar style={{ background: "black" }} variant="dark">
                <Navbar.Brand href="/" className="nav-brand">
                    MOVIE HUT
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="login">Sign In</Nav.Link>
                    <Nav.Link eventKey={2} href="register">
                        Sign Up
                    </Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;