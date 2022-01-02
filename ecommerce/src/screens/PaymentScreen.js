import React, { useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({history}) => {

    // grab all from cart
    const cart = useSelector((state) => {
        return state.cart;
    });
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    if(!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/checkout');
    }

    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment</h1>
        <Form onSubmit={submitHandler}>
        <Form.Label>Select Method</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => {
                        return setPaymentMethod(e.target.value)
                    }}
                ></Form.Check>
            </Col>
            <Button type='submit' variant='primary'>Continue to Checkout</Button>
        </Form>
    </FormContainer> 
    )
}

export default PaymentScreen
