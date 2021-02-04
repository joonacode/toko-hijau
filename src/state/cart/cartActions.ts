import { UPDATE_TOTAL_CART, UPDATE_QTY, DELETE_CART } from './../actionTypes'
import { ADD_ITEM_TO_CART } from '../actionTypes'

export const addToCart = (payload: any) => {
  return function dispatch(dispatch: any, getState: any) {
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: payload,
    })
    const carts = getState().cart.carts.items
    const getTotalPrice = carts.map((cart: any) => cart.totalPrice)
    const reducePrice = getTotalPrice.reduce(
      (prev: any, next: any) => prev + next,
    )
    dispatch({
      type: UPDATE_TOTAL_CART,
      payload: {
        totalItem: carts.length,
        totalPrice: reducePrice,
      },
    })
  }
}

export const updateQty = (payload: any) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const indexCurrentItem = carts.findIndex(
      (item: any) => item.id === payload.id,
    )
    const currentProduct = carts.filter(
      (product: any) => product.id === payload.id,
    )[0]
    currentProduct.qty = payload.qty
    currentProduct.totalPrice = payload.qty * currentProduct.price
    carts.splice(indexCurrentItem, 1, currentProduct)
    const getTotalPrice = carts.map((cart: any) => cart.totalPrice)
    const reducePrice = getTotalPrice.reduce(
      (prev: any, next: any) => prev + next,
    )
    dispatch({
      type: UPDATE_QTY,
      payload: {
        totalItem: carts.length,
        totalPrice: reducePrice,
        items: carts,
      },
    })
  }
}

export const deleteCart = (payload: number) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const indexTarget = carts.findIndex((item: any) => item.id === payload)
    carts.splice(indexTarget, 1)
    dispatch({ type: DELETE_CART, payload: carts })
    if (carts.length === 0) {
      dispatch({
        type: UPDATE_QTY,
        payload: {
          totalItem: 0,
          totalPrice: 0,
          items: [],
        },
      })
    } else {
      const getTotalPrice = carts.map((cart: any) => cart.totalPrice)
      const reducePrice = getTotalPrice.reduce(
        (prev: any, next: any) => prev + next,
      )
      dispatch({
        type: UPDATE_QTY,
        payload: {
          totalItem: carts.length,
          totalPrice: reducePrice,
          items: carts,
        },
      })
    }
  }
}
