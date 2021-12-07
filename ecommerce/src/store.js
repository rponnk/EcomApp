import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer,
    productDetailsReducer
 } from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'


//reducer will be an empty object which will take key value pairs later, this will change the initialState - register here
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

/*revert json string back into json 

*/

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

//initial state will be an empty object
const initialState = {
    cart: {cartItems: cartItemsFromStorage}
}


const middleWare = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleWare)))



export default store