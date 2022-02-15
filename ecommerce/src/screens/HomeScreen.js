import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import Products from '../components/Products'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
    listProducts
}  from '../actions/productActions'

const HomeScreen = ({history}) => {
    const dispatch = useDispatch()
    //state.productList is pulling from store
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    let keyword = history.location.search
    console.log(keyword)
    useEffect(() => {
        dispatch(listProducts(keyword))
               
    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest Products</h1>
            {
            loading 
            ? <Loader />
                : error 
                ? <Message variant='danger' children={error}/>
                    :<Row>
                    {products.map(item => (
                        <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                            <Products product={item} />
                        </Col>
                ))}
                </Row>
            }


        </div>
    )
}

export default HomeScreen
