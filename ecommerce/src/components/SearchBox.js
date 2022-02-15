import React, {useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom' 

const SearchBox = () => {

    let history = useHistory()

    const [keyword, setKeyword] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        if(keyword) {
            history.push(`/?keyword=${keyword}`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <Form onSubmit={submitHandler} inline="true">
            <Form.Control
                type='text'
                name='query'
                onChange={e => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' className='p-2'>Submit</Button>
        </Form>
        
    )
}

export default SearchBox