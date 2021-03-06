import { ORDER_PRODUCT } from './../actionTypes'
import { IProduct } from '../../Interface'
import { GET_PRODUCT_BY_SLUG } from '../actionTypes'

export const getProductBySlug = (payload: string) => {
  return function dispatch(dispatch: any, getState: any) {
    const products = getState().product.products
    const response = products.filter(
      (product: IProduct) => product.slug === payload,
    )
    if (response.length > 0) {
      dispatch({
        type: GET_PRODUCT_BY_SLUG,
        payload: response[0],
      })
    } else {
      dispatch({
        type: GET_PRODUCT_BY_SLUG,
        payload: { image: '' },
      })
    }
  }
}

const actionOrder = (payload: IProduct[]) => {
  return {
    type: ORDER_PRODUCT,
    payload,
  }
}

export const orderProduct = (payload: string) => {
  return function dispatch(dispatch: any, getState: any) {
    const productsBc = getState().product.productsBc
    if (payload === 'name-asc') {
      productsBc.sort((a: IProduct, b: IProduct) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
      )
      dispatch(actionOrder(productsBc))
    } else if (payload === 'name-desc') {
      productsBc.sort((a: IProduct, b: IProduct) =>
        a.name < b.name ? 1 : b.name < a.name ? -1 : 0,
      )
      dispatch(actionOrder(productsBc))
    } else if (payload === 'price-asc') {
      productsBc.sort((a: IProduct, b: IProduct) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0,
      )
      dispatch(actionOrder(productsBc))
    } else if (payload === 'price-desc') {
      productsBc.sort((a: IProduct, b: IProduct) =>
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0,
      )
      dispatch(actionOrder(productsBc))
    } else if (payload === 'date-asc') {
      productsBc.sort((a: IProduct, b: IProduct) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0,
      )
      dispatch(actionOrder(productsBc))
    } else if (payload === 'date-desc') {
      productsBc.sort((a: IProduct, b: IProduct) =>
        a.id < b.id ? 1 : b.id < a.id ? -1 : 0,
      )
      dispatch(actionOrder(productsBc))
    } else {
      dispatch(actionOrder(productsBc))
    }
  }
}
