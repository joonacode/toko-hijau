import {
  CHECK_ALL_CART,
  UPDATE_ALL_CHECK,
  UPDATE_ITEMS_CART,
  ADD_ITEM_TO_CART,
  UPDATE_TOTAL_CART,
  CLEAR_CART,
} from './../actionTypes'

type TCartReducer = {
  carts: {
    totalItem: number
    totalPrice: number
    selectedItem: number
    allChecked: boolean
    items: any[]
  }
}

const initialState: TCartReducer = {
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
          ...state.carts,
          allChecked: true,
          items: [action.payload, ...state.carts.items],
        },
      }
    case UPDATE_ITEMS_CART:
      return {
        ...state,
        carts: {
          ...state.carts,
          items: action.payload,
        },
      }
    case UPDATE_TOTAL_CART:
      return {
        ...state,
        carts: {
          ...state.carts,
          totalItem: action.payload.totalItem,
          totalPrice: action.payload.totalPrice,
          selectedItem: action.payload.selectedItem,
        },
      }
    case CHECK_ALL_CART:
      return {
        ...state,
        carts: {
          ...state.carts,
          allChecked: action.payload.allChecked,
          items: action.payload.items,
        },
      }
    case UPDATE_ALL_CHECK:
      return {
        ...state,
        carts: {
          ...state.carts,
          allChecked: action.payload,
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
