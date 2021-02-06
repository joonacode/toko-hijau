import {
  UPDATE_TOTAL_CART,
  UPDATE_QTY,
  DELETE_CART,
  ADD_ITEM_TO_TOKO,
  CHECK_ALL_CART,
  UPDATE_ALL_CHECK,
  CLEAR_CART,
} from './../actionTypes'
import { ADD_ITEM_TO_CART } from '../actionTypes'

export const updatePriceAndTotal = () => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const getTotalPrice = carts.map((item: any) => {
      return item.itemsByToko.map(
        (cart: any) => cart.isChecked === true && cart.totalPrice,
      )
    })
    const reducePrice = getTotalPrice
      .map((price: any) => {
        return price.reduce((prev: any, next: any) => prev + next)
      })
      .reduce((prev: any, next: any) => prev + next)
    const totalItem = carts
      .map((item: any) => {
        return item.itemsByToko.length
      })
      .reduce((prev: any, next: any) => prev + next)
    const selectedItem = getTotalPrice
      .map((item: any) => {
        return item.filter((price: any) => price !== false)
      })
      .map((res: any) => res.length)
      .reduce((prev: any, next: any) => prev + next)
    dispatch({
      type: UPDATE_TOTAL_CART,
      payload: {
        totalItem: totalItem,
        totalPrice: reducePrice,
        selectedItem: selectedItem,
      },
    })
  }
}

export const addToCart = (payload: any) => {
  return function dispatch(dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const checkTokoAvail = carts.findIndex(
      (item: any) => item.tokoId === payload.tokoId,
    )
    if (checkTokoAvail === 0) {
      const currentToko = carts.filter(
        (item: any) => item.tokoId === payload.tokoId,
      )[0]
      const getIndexCurrentToko = carts.findIndex(
        (item: any) => item.tokoId === payload.tokoId,
      )
      carts[getIndexCurrentToko].itemsByToko = [
        payload,
        ...currentToko.itemsByToko,
      ]
      dispatch({
        type: ADD_ITEM_TO_TOKO,
        payload: carts,
      })
    } else {
      const newPayload = {
        tokoId: payload.tokoId,
        allChecked: true,
        tokoName: payload.tokoName,
        tokoAddress: payload.tokoAddress,
        itemsByToko: [payload],
      }
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: newPayload,
      })
    }

    dispatch(updatePriceAndTotal())
  }
}

export const updateQty = (payload: any) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const getCurrentToko = carts.filter(
      (item: any) => item.tokoId === payload.tokoId,
    )[0]
    const getIndexCurrentProduct = getCurrentToko.itemsByToko.findIndex(
      (item: any) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )
    const getCurrentProduct = getCurrentToko.itemsByToko.filter(
      (item: any) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )[0]
    getCurrentProduct.qty = payload.qty
    getCurrentProduct.totalPrice = payload.qty * getCurrentProduct.price
    getCurrentToko.itemsByToko.splice(
      getIndexCurrentProduct,
      1,
      getCurrentProduct,
    )
    dispatch({ type: ADD_ITEM_TO_TOKO, payload: carts })
    dispatch(updatePriceAndTotal())
  }
}

type TDeleteCart = {
  id: number
  size: string
  color: string
  tokoId: number
}

export const deleteCart = (payload: TDeleteCart) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const getCurrentToko = carts.filter(
      (item: any) => item.tokoId === payload.tokoId,
    )[0]
    const getIndexProduct = getCurrentToko.itemsByToko.findIndex(
      (item: any) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )
    getCurrentToko.itemsByToko.splice(getIndexProduct, 1)
    dispatch({ type: DELETE_CART, payload: carts })
    const ifAllCartEmpty = carts
      .map((item: any) => {
        return item.itemsByToko.length
      })
      .every((v: number) => v === 0)
    if (ifAllCartEmpty) {
      dispatch({
        type: UPDATE_QTY,
        payload: {
          totalItem: 0,
          totalPrice: 0,
          items: [],
        },
      })
    } else {
      const newCarts = getState().cart.carts.items
      const p = newCarts.filter((item: any) => {
        return item.itemsByToko.length > 0
      })
      dispatch({ type: DELETE_CART, payload: p })
      dispatch(updatePriceAndTotal())
    }
  }
}

type TChangeCheckCart = {
  isChecked: boolean
  id: number
  color: string
  size: string
  tokoId: number
}

export const checkStatus = (tokoId: number) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const resultFilter = carts.filter((item: any) => item.tokoId === tokoId)[0]
    const checkIsAllTrue = resultFilter.itemsByToko.every(
      (item: any) => item.isChecked === true,
    )
    if (checkIsAllTrue) {
      resultFilter.allChecked = true
    } else {
      resultFilter.allChecked = false
    }
    dispatch({ type: ADD_ITEM_TO_TOKO, payload: carts })
  }
}

export const checkAllStatusCart = () => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const status = carts.every((item: any) => item.allChecked === true)
    if (status) {
      dispatch({ type: UPDATE_ALL_CHECK, payload: true })
    } else {
      dispatch({ type: UPDATE_ALL_CHECK, payload: false })
    }
  }
}

export const changeCheckCart = (payload: TChangeCheckCart) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const getCurrentToko = carts.filter(
      (item: any) => item.tokoId === payload.tokoId,
    )[0]
    const getIndexCurrentProduct = getCurrentToko.itemsByToko.findIndex(
      (item: any) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )
    const getCurrentProduct = getCurrentToko.itemsByToko.filter(
      (item: any) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )[0]
    getCurrentProduct.isChecked = payload.isChecked
    getCurrentToko.itemsByToko.splice(
      getIndexCurrentProduct,
      1,
      getCurrentProduct,
    )
    dispatch({ type: ADD_ITEM_TO_TOKO, payload: carts })
    dispatch(checkStatus(payload.tokoId))
    dispatch(checkAllStatusCart())
    dispatch(updatePriceAndTotal())
  }
}

export const changeCheckToko = (payload: any) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const getToko = carts.filter(
      (item: any) => item.tokoId === payload.tokoId,
    )[0]
    const newToko = getToko.itemsByToko.map((item: any) => {
      return {
        ...item,
        isChecked: payload.status,
      }
    })

    const getIndexToko = carts.findIndex(
      (item: any) => item.tokoId === payload.tokoId,
    )

    const result = {
      tokoId: getToko.tokoId,
      allChecked: payload.status,
      tokoName: getToko.tokoName,
      tokoAddress: getToko.tokoAddress,
      itemsByToko: newToko,
    }

    carts.splice(getIndexToko, 1, result)

    dispatch({ type: ADD_ITEM_TO_TOKO, payload: carts })
    dispatch(checkAllStatusCart())
    dispatch(updatePriceAndTotal())
  }
}

export const checkAllCart = (payload: boolean) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const items = carts.map((item: any) => {
      return {
        ...item,
        itemsByToko: item.itemsByToko.map((item: any) => {
          return {
            ...item,
            isChecked: payload,
          }
        }),
        allChecked: payload,
      }
    })
    const data = {
      items: items,
      allChecked: payload,
    }
    dispatch({ type: CHECK_ALL_CART, payload: data })
    dispatch(updatePriceAndTotal())
  }
}

export const paymentAction = (payload: boolean) => {
  return function (dispatch: any, getState: any) {
    if (payload) {
      dispatch({ type: CLEAR_CART })
    } else {
      const carts = getState().cart.carts.items
      const result = carts
        .map((item: any) => {
          return {
            ...item,
            itemsByToko: item.itemsByToko.filter(
              (cart: any) => cart.isChecked === false,
            ),
          }
        })
        .filter((item: any) => item.itemsByToko.length > 0)
      dispatch({ type: ADD_ITEM_TO_TOKO, payload: result })
      dispatch(updatePriceAndTotal())
    }
  }
}
