import React, { useEffect } from 'react';
import {
    Row, 
    Button, 
    Col, 
    ListGroup, 
    Image, 
    Card
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { emptyCart } from '../actions/cartActions';

const CheckoutScreen = ({history}) => {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    // Grab the items in the cart
    const cart = useSelector((state) => {
        return state.cart;
    });
    // destructure the cart
    const { cartItems } = cart;
    const dispatch = useDispatch();

    cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.055) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    //if a payment method isnt provided then send user to payment page
    if (!cart.paymentMethod) {
        history.push('/payment')
        
    }

    //upon hitting place order send user to the order page
    useEffect(() => {
        if(success) {
           history.push(`/order/${order._id}`) 
           dispatch({type: ORDER_CREATE_RESET})
           
        }
        
    }, [dispatch, success, history, order])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    const cancelOrder = () => {
        history.push('')
        dispatch({type: ORDER_CREATE_RESET })
        dispatch(emptyCart())
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <h2>Shipping</h2>
                    {cart.shippingAddress.address ?
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address} {cart.shippingAddress.city},
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country} 
                        </p>
                    : <p>
                        <strong>Shipping: Address not provided</strong>
                    </p>
                    }
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h2>Payment</h2>
                    {cart.paymentMethod ?
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    :   <p>
                            <strong>Method: Payment not provided</strong>
                        </p>
                    }
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {!error ? '' : 
                            <ListGroup.Item>
                                {<Message variant='danger' children={error}/>}
                            </ListGroup.Item>}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    onClick={cancelOrder}
                                >
                                    Cancel Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CheckoutScreen
