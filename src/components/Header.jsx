import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Submission App</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/submissions" style={{textDecoration:"none", color:"white"}}>Analysis</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
