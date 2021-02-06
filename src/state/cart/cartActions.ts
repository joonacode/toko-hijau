import { IProduct, IItemCart } from './../../Interface'
import {
  UPDATE_TOTAL_CART,
  CHECK_ALL_CART,
  UPDATE_ALL_CHECK,
  CLEAR_CART,
  UPDATE_ITEMS_CART,
} from './../actionTypes'
import { ADD_ITEM_TO_CART } from '../actionTypes'

export const updatePriceAndTotal = () => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const getTotalPrice = carts.map((item: IItemCart) => {
      return item.itemsByToko.map(
        (cart: IProduct) => cart.isChecked === true && cart.totalPrice,
      )
    })

    const totalPrice = getTotalPrice
      .map((price: any[]) => {
        return price.reduce((prev: number, next: number) => prev + next)
      })
      .reduce((prev: number, next: number) => prev + next)

    const totalItem = carts
      .map((item: IItemCart) => {
        return item.itemsByToko.length
      })
      .reduce((prev: number, next: number) => prev + next)

    const selectedItem = getTotalPrice
      .map((item: any[]) => {
        return item.filter((price: any) => price !== false)
      })
      .map((res: []) => res.length)
      .reduce((prev: number, next: number) => prev + next)

    let finalTotalPrice
    if (totalPrice === false) {
      finalTotalPrice = 0
    } else {
      finalTotalPrice = totalPrice
    }

    dispatch({
      type: UPDATE_TOTAL_CART,
      payload: {
        totalItem,
        totalPrice: finalTotalPrice,
        selectedItem,
      },
    })
  }
}

export const addToCart = (payload: any) => {
  return function dispatch(dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const checkTokoAvail = carts.findIndex(
      (item: IItemCart) => item.tokoId === payload.tokoId,
    )
    if (checkTokoAvail === 0) {
      const currentToko = carts.filter(
        (item: IItemCart) => item.tokoId === payload.tokoId,
      )[0]
      const getIndexCurrentToko = carts.findIndex(
        (item: IItemCart) => item.tokoId === payload.tokoId,
      )
      carts[getIndexCurrentToko].itemsByToko = [
        payload,
        ...currentToko.itemsByToko,
      ]
      dispatch({
        type: UPDATE_ITEMS_CART,
        payload: carts,
      })
    } else {
      const newPayload: IItemCart = {
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
      (item: IItemCart) => item.tokoId === payload.tokoId,
    )[0]
    const getIndexCurrentProduct = getCurrentToko.itemsByToko.findIndex(
      (item: IProduct) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )
    const getCurrentProduct = getCurrentToko.itemsByToko[getIndexCurrentProduct]
    getCurrentProduct.qty = payload.qty
    getCurrentProduct.totalPrice = payload.qty * getCurrentProduct.price
    getCurrentToko.itemsByToko.splice(
      getIndexCurrentProduct,
      1,
      getCurrentProduct,
    )
    dispatch({ type: UPDATE_ITEMS_CART, payload: carts })
    dispatch(updatePriceAndTotal())
  }
}

type TDeleteCart = {
  id: number
  size: string | string[]
  color: string | string[]
  tokoId: number
}

export const deleteCart = (payload: TDeleteCart) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const getCurrentToko = carts.filter(
      (item: IItemCart) => item.tokoId === payload.tokoId,
    )[0]
    const getIndexProduct = getCurrentToko.itemsByToko.findIndex(
      (item: IProduct) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )
    getCurrentToko.itemsByToko.splice(getIndexProduct, 1)
    dispatch({ type: UPDATE_ITEMS_CART, payload: carts })
    const ifAllCartEmpty = carts
      .map((item: IItemCart) => {
        return item.itemsByToko.length
      })
      .every((v: number) => v === 0)
    if (ifAllCartEmpty) {
      dispatch({
        type: CLEAR_CART,
      })
    } else {
      const newCarts = getState().cart.carts.items
      const res = newCarts.filter((item: IItemCart) => {
        return item.itemsByToko.length > 0
      })
      dispatch({ type: UPDATE_ITEMS_CART, payload: res })
      dispatch(updatePriceAndTotal())
    }
  }
}

export const checkStatus = (tokoId: number) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const resultFilter = carts.filter(
      (item: IItemCart) => item.tokoId === tokoId,
    )[0]
    const checkIsAllTrue = resultFilter.itemsByToko.every(
      (item: IProduct) => item.isChecked === true,
    )
    if (checkIsAllTrue) {
      resultFilter.allChecked = true
    } else {
      resultFilter.allChecked = false
    }
    dispatch({ type: UPDATE_ITEMS_CART, payload: carts })
  }
}

export const checkAllStatusCart = () => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const status = carts.every((item: IItemCart) => item.allChecked === true)
    if (status) {
      dispatch({ type: UPDATE_ALL_CHECK, payload: true })
    } else {
      dispatch({ type: UPDATE_ALL_CHECK, payload: false })
    }
  }
}

export const changeCheckCart = (payload: any) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const getCurrentToko = carts.filter(
      (item: IItemCart) => item.tokoId === payload.tokoId,
    )[0]
    const getIndexCurrentProduct = getCurrentToko.itemsByToko.findIndex(
      (item: IProduct) =>
        item.id === payload.id &&
        item.color === payload.color &&
        item.size === payload.size,
    )
    const getCurrentProduct = getCurrentToko.itemsByToko[getIndexCurrentProduct]
    getCurrentProduct.isChecked = payload.isChecked
    getCurrentToko.itemsByToko.splice(
      getIndexCurrentProduct,
      1,
      getCurrentProduct,
    )
    dispatch({ type: UPDATE_ITEMS_CART, payload: carts })
    dispatch(checkStatus(payload.tokoId))
    dispatch(checkAllStatusCart())
    dispatch(updatePriceAndTotal())
  }
}

export const changeCheckToko = (payload: any) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items
    const getToko = carts.filter(
      (item: IItemCart) => item.tokoId === payload.tokoId,
    )[0]
    const newToko = getToko.itemsByToko.map((item: IProduct) => {
      return {
        ...item,
        isChecked: payload.status,
      }
    })

    const getIndexToko = carts.findIndex(
      (item: IItemCart) => item.tokoId === payload.tokoId,
    )

    const result = {
      tokoId: getToko.tokoId,
      allChecked: payload.status,
      tokoName: getToko.tokoName,
      tokoAddress: getToko.tokoAddress,
      itemsByToko: newToko,
    }

    carts.splice(getIndexToko, 1, result)

    dispatch({ type: UPDATE_ITEMS_CART, payload: carts })
    dispatch(checkAllStatusCart())
    dispatch(updatePriceAndTotal())
  }
}

export const checkAllCart = (payload: boolean) => {
  return function (dispatch: any, getState: any) {
    const carts = getState().cart.carts.items

    const items = carts.map((item: IItemCart) => {
      return {
        ...item,
        itemsByToko: item.itemsByToko.map((item: IProduct) => {
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
        .map((item: IItemCart) => {
          return {
            ...item,
            itemsByToko: item.itemsByToko.filter(
              (cart: IProduct) => cart.isChecked === false,
            ),
          }
        })
        .filter((item: IItemCart) => item.itemsByToko.length > 0)
      dispatch({ type: UPDATE_ITEMS_CART, payload: result })
      dispatch(updatePriceAndTotal())
    }
  }
}
