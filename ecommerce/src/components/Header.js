import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
       
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
            <Container>

                {/*The concept of using Link, LinkContainer works here as well, load a component instead of a new page */}

                <LinkContainer to="/">
                    <Navbar.Brand>Rocks Shop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/cart">
                        <Nav.Link >Cart <i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Nav.Link >Login <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>

    )
}

export default Header
