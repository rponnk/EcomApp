import { 
    PRODUCT_FAIL,
    PRODUCT_REQ,
    PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQ,
    PRODUCT_DETAILS_SUCCESS
 } from '../constants/productConstants'
 


export const productListReducer = (state = {products: []}, action) => {
    //switch statement that checks for the action type
    switch (action.type) {
        case PRODUCT_REQ:
            return { loading: true, products:[]}
        case PRODUCT_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: {reviews:[]}}, action) => {
    //switch statement that checks for the action type
    switch (action.type) {
        case PRODUCT_DETAILS_REQ:
            return { loading: true, ...state}
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}