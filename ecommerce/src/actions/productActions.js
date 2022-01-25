import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
 } from '../constants/productConstants'


 //redux thunk lets us make a function within a function

export const listProducts = async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST, payload: []})
        const { data } = await axios.get('/api/products/')
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}


//grab id of item - pk comes from path we passed in
export const listProductDetails = (pk) => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
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

