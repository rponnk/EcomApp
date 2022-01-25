import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Row, 
    Col, 
    Image, 
    ListGroup, 
    Button, 
    Card,
    Form 
} from 'react-bootstrap';
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import {
    listProductDetails
}  from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen({ match, history }) {

    const [qty,setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.pk))  

    //pass params from the function above, below    
    },[dispatch, match]) 

    const addTocartHandler = () => {
        history.push(`/cart/${match.params.pk}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/'> <i className="fas fa-arrow-left"></i> Go Back</Link>
            {loading ? <Loader />
            : error ? <Message variant='danger' children={error}/>    
                :  <div>
                
                <Row>
                    <Col className='my-3' md={3}>                
                        <Image className='rounded' src={product.image} alt={product.name} fluid />   
                    </Col>
    
                    <Col className='my-3' md={6}>
                       
                            <ListGroup variant="flush">
    
                                <ListGroup.Item>
                                    <Card.Title as='h4'>{product.name}</Card.Title>
                                </ListGroup.Item>
    
                                <ListGroup.Item>
                                <Rating value={product.rating} color={"#FDCC0D"} text={` of ${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                
                                <div className='p-3'>
                                    <Card.Text className='my-3'>{product.description}</Card.Text>
    
                                </div>
                                
                            </ListGroup>
                    </Col>
    
                    <Col className='my-3'>
                        <Card className='rounded'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                    ${product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
    
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty:</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control 
                                            as="select" 
                                            value={qty} 
                                            onChange={(e) => {
                                                return setQty(e.target.value)
                                            }} >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                            <option value={x+1} key={x+1}>
                                                                {x+1}
                                                            </option> 
                                                        ))
                                                    
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                                  
                                <Button 
                                onClick={addTocartHandler}
                                className='addTo btn-block primary' 
                                type='button' 
                                disabled={
                                    product.countInStock === 0 
                                    ? true 
                                    : false}>{
                                        product.countInStock === 0 
                                        ? 'Sold Out' 
                                        : 'Add to cart'}</Button>
                                                             
                            </ListGroup.Item>
                        </Card>
                    </Col>
                </Row>
            </div>
           
        }
        
        </div>
    )
}

export default ProductScreen
