import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_EMPTY,
    CART_SAVE_SHIPPING_ADDRESS    
} 
from '../constants/cartConstants'


export const cartReducer = (state = { cartItems:[], shippingAdress: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const itemExist = state.cartItems.find(x => x.product === item.product)
            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => 
                            i.product === itemExist.product 
                            ? item
                            : i)
                }
            } else {
                //return an object
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        case CART_EMPTY:
            return{
                ...state,
                cartItems: []
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return { 
                ...state, 
                shippingAddress: action.payload
             }
             
        default:
            return state
    }
}
