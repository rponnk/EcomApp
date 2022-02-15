import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout  } from '../actions/userActions';
import { emptyCart } from '../actions/cartActions';
import  SearchBox from './SearchBox';


const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(emptyCart())
    }

    const emptyCartHandler = () => {
        dispatch(emptyCart())
    }

    return (
       
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
            <Container>

                {/*The concept of using Link, LinkContainer works here as well, load a component instead of a new page */}

                <LinkContainer to="/">
                    <Navbar.Brand>ЯS</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title='Shopping Cart'>
                    <LinkContainer to="/cart">
                        <NavDropdown.Item >Cart <i className="fa-solid fa-cart-shopping"></i>{cartItems.reduce((acc, itemInCart) => acc + itemInCart.qty, '', 0)}</NavDropdown.Item>
                    </LinkContainer>
                    {
                        cartItems.length > 0 
                        ? <NavDropdown.Item onClick={emptyCartHandler}>Empty Cart</NavDropdown.Item> 
                        : ''
                    }
                    </NavDropdown>

                    {userInfo && userInfo.isAdmin ? (
                        <NavDropdown title='Admin Menu' id='adminmenu'>
                            <LinkContainer to='/admin/users'>
                                <NavDropdown.Item>User List</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Order List</NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Product List</NavDropdown.Item>
                            </LinkContainer>

                        </NavDropdown>
                            ): ''}

                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile/'>
                                <NavDropdown.Item>Account</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ): (
                        <LinkContainer to="/login">
                        <Nav.Link >Login <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
                    </LinkContainer>
                    )}
                    
                    <SearchBox />
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>

    )
}

export default Header
