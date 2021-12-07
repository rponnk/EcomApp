import React from 'react'
import { Card} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Products({ product }) {
    return (
        <div>
            <Card className="my-3 p-3 rounded">

                {/*using Link instead of a tag, this will load a component instead of a new page*/}

                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} />
                </Link>

                <Card.Body>
                    <Link to={`/product/${product._id}`}><Card.Title as="div">{product.name}</Card.Title></Link>
                    <Card.Text as="div">
                        <Rating value={product.rating} color={"#FDCC0D"} text={` of ${product.numReviews} reviews`}/> 
                        </Card.Text>
                </Card.Body>

                <Card.Text as="h3">${product.price}</Card.Text>
            </Card>
        </div>
    )
}

export default Products
