import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'


export const addToCartAction = (pk, qty ) => async (dispatch, getState) => {
    try {
        const { data} = await axios.get(`/api/products/${pk}`)
        dispatch({
            type: CART_ADD_ITEM, 
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty

            }
        })
        //pass in k/v pair - 
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } 
    catch (e){
        return e
    }
}

export const removeFromCartAction = (pk) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: pk,
    })
        //pass in k/v pair - 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))    
}