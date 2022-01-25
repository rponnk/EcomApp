import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
 } from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
import { 
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer
} from './reducers/orderReducers'
import { 
    userLoginReducer, 
    userRegisterReducer,
    userProfileReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'


//reducer will be an empty object which will take key value pairs later, this will change the initialState - register here
const reducer = combineReducers({
    
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    
})

/* 
revert json string back into json 
getItem(???) = the param comes from whatever we named it when we setItem in localStorage in actions

check if its true, if not parse the data otherwise well return null
*/

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) : {}

//initial state will be an empty object
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage}
}

const middleWare = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleWare)))



export default store