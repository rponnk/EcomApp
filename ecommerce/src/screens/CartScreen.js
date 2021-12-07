import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Form, Card, Button, Image } from 'react-bootstrap'
import { addToCartAction, removeFromCartAction } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({match, location, history}) => {
    const productId = match.params.pk
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart


    useEffect(() => {
        if(productId) {
            dispatch(addToCartAction(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (pk) => {
        dispatch(removeFromCartAction(pk))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>Your cart is empty  
                        <Link to='/'> Go Back</Link>
                    </Message>
                    ) :
                    <ListGroup variant='flush'>
                        {cartItems.map((itemInCart) => (
                            <ListGroup.Item key={itemInCart.product}>
                                <Row>
                                    <Col md={2}>
                                        <Card>
                                            <Image src={itemInCart.image} />
                                        </Card>
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${itemInCart.product}`}>{itemInCart.name}</Link>
                                        <p>
                                            {
                                                Number(itemInCart.price[0]) > 0 
                                                ? `$${itemInCart.price * itemInCart.qty}` 
                                                : 'Free'
                                            }
                                        </p>
                                    </Col>


                                    {/* this comes from actions */}
                                    <Col md={2}>
                                    <Form.Control 
                                            as="select" 
                                            value={itemInCart.qty} 
                                            onChange={e => dispatch(addToCartAction(itemInCart.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(itemInCart.countInStock).keys()].map((x) => (
                                                            <option value={x+1} key={x+1}>
                                                                {x+1}
                                                            </option> 
                                                        ))
                                                    
                                                }
                                            </Form.Control>
                                    </Col>
                                    
                                    {/* delete button */}
                                    <Col md={1}>
                                         <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(itemInCart.product)}
                                        >
                                                <i className='fas fa-trash'></i>
                                             </Button>       
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                } 
            </Col>

            {/* Subtotal of all items, price etc.. */}
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>Subtotal ({cartItems.reduce((acc, itemInCart) => acc + itemInCart.qty, 0)} items):
                            ${cartItems.reduce((acc, itemInCart) => acc + itemInCart.qty * Number(itemInCart.price), 0).toFixed(2)}
                            </h5>

  
                        </ListGroup.Item>
                        <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                >
                                    Proceed to checkout
                                </Button>
                    </ListGroup>

                {/* Recap; add a button for proceed checkout that uses and onlclick handler that redirects to login if user isnt logged in otherwise redirects to shipping page
                created an expression to add sum of items in cart
                created an expression to add sum of total price of all items in the cart
                created a form that will allow us to change the items in the cart were working in */}
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
