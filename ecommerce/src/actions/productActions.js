import axios from 'axios'
import { 
    PRODUCT_FAIL,
    PRODUCT_REQ,
    PRODUCT_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQ,
    PRODUCT_DETAILS_FAIL
 } from '../constants/productConstants'


 //redux thunk lets us make a function within a function

export const listProductAction = async (dispatch) => {
    try {
        dispatch({type: PRODUCT_REQ, payload: []})
        const { data } = await axios.get('/api/products/')
        dispatch({type: PRODUCT_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({
            type: PRODUCT_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


//grab id of item - pk comes from path we passed in
export const listProductDetailsAction = (pk) => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_DETAILS_REQ})
        const { data } = await axios.get(`/api/products/${pk}`)
        dispatch(
            {
                type: PRODUCT_DETAILS_SUCCESS, 
                payload: data
            })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })        
    }
}

