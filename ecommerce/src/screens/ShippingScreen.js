import React, { useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [address2, setAddress2] = useState(shippingAddress.address2)
    const [state, setState] = useState(shippingAddress.state)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({name, address, address2, state, city, postalCode, country}))
        history.push('/payment')
    }

    return (
    <FormContainer>
        <CheckoutSteps step1 address />
        <h1>Shipping Information</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name ? name : ''}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='address2'>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Apartment Number....'
                        value={address2 ? address2 : ''}
                        onChange={(e) => setAddress2(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter state'
                        value={state ? state.toUpperCase() : ''}
                        onChange={(e) => setState(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='Country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country.toUpperCase() : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>
         
            <Button type='submit' variant='primary'>Proceed to Payment</Button>
            
            
        </Form>
    </FormContainer>
    )
}

export default ShippingScreen
