import React, { Component } from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'

class Header extends Component {

    render() {
        return (
            <Navbar style={{ background: "black" }} variant="dark">
                <Navbar.Brand href="#home" className="nav-brand">
                    MOVIE HUT
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default Header;