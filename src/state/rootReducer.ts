import { combineReducers } from 'redux'
import productReducer from './product/productReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
})

export default rootReducer
