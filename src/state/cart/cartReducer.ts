import {
  UPDATE_QTY,
  DELETE_CART,
  ADD_ITEM_TO_TOKO,
  CHECK_ALL_CART,
  UPDATE_ALL_CHECK,
} from './../actionTypes'
import { ADD_ITEM_TO_CART, UPDATE_TOTAL_CART, CLEAR_CART } from '../actionTypes'

type stateFace = {
  carts: {
    totalItem: number
    totalPrice: number
    selectedItem: number
    items: any[]
    allChecked: boolean
  }
}

const initialState: stateFace = {
  carts: {
    totalItem: 0,
    totalPrice: 0,
    selectedItem: 0,
    allChecked: false,
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
          selectedItem: state.carts.selectedItem,
          allChecked: true,
          items: [action.payload, ...state.carts.items],
        },
      }
    case ADD_ITEM_TO_TOKO:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          selectedItem: state.carts.selectedItem,
          allChecked: state.carts.allChecked,
          items: action.payload,
        },
      }
    case UPDATE_TOTAL_CART:
      return {
        ...state,
        carts: {
          totalItem: action.payload.totalItem,
          totalPrice: action.payload.totalPrice,
          selectedItem: action.payload.selectedItem,
          allChecked: state.carts.allChecked,
          items: state.carts.items,
        },
      }
    case UPDATE_QTY:
      return {
        ...state,
        carts: {
          totalItem: action.payload.totalItem,
          totalPrice: action.payload.totalPrice,
          selectedItem: state.carts.selectedItem,
          allChecked: state.carts.allChecked,
          items: action.payload.items,
        },
      }
    case DELETE_CART:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          selectedItem: state.carts.selectedItem,
          allChecked: state.carts.allChecked,
          items: action.payload,
        },
      }
    case CHECK_ALL_CART:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          selectedItem: state.carts.selectedItem,
          allChecked: action.payload.allChecked,
          items: action.payload.items,
        },
      }
    case UPDATE_ALL_CHECK:
      return {
        ...state,
        carts: {
          totalItem: state.carts.totalItem,
          totalPrice: state.carts.totalPrice,
          selectedItem: state.carts.selectedItem,
          allChecked: action.payload,
          items: state.carts.items,
        },
      }
    case CLEAR_CART:
      return {
        ...state,
        carts: {
          totalItem: 0,
          totalPrice: 0,
          selectedItem: 0,
          allChecked: false,
          items: [],
        },
      }
    default:
      return state
  }
}

export default cartReducer
