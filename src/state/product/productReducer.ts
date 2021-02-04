import {
  GET_PRODUCT_BY_SLUG,
  ORDER_PRODUCT,
  CHANGE_PAGE,
} from './../actionTypes'
import { dumyProducts } from './dumyProducts'

const initialState = {
  products: dumyProducts,
  productsBc: dumyProducts,
  detailProduct: { image: '' },
  currentPage: 1,
  totalPage: 2,
}

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PRODUCT_BY_SLUG:
      return {
        ...state,
        detailProduct: action.payload,
      }
    case ORDER_PRODUCT:
      return {
        ...state,
        products: action.payload,
      }
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    default:
      return state
  }
}

export default productReducer
