import { UPDATE_QTY, DELETE_CART, ADD_ITEM_TO_TOKO } from './../actionTypes'
import { ADD_ITEM_TO_CART, UPDATE_TOTAL_CART, CLEAR_CART } from '../actionTypes'

type stateFace = {
  carts: {
    totalItem: number
    totalPrice: number
    items: any[]
  }
}

const initialState: stateFace = {
  carts: {
    totalItem: 0,
    totalPrice: 0,
    items: [],
  },
}

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          items: [action.payload, ...state.carts.items],
        },
      }
    case ADD_ITEM_TO_TOKO:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          items: action.payload,
        },
      }
    case UPDATE_TOTAL_CART:
      return {
        ...state,
        carts: {
          totalItem: action.payload.totalItem,
          totalPrice: action.payload.totalPrice,
          items: state.carts.items,
        },
      }
    case UPDATE_QTY:
      return {
        ...state,
        carts: {
          totalItem: action.payload.totalItem,
          totalPrice: action.payload.totalPrice,
          items: action.payload.items,
        },
      }
    case DELETE_CART:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          items: action.payload,
        },
      }
    case CLEAR_CART:
      return {
        ...state,
        carts: {
          totalItem: 0,
          totalPrice: 0,
          items: [],
        },
      }
    default:
      return state
  }
}

export default cartReducer
