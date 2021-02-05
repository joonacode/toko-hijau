export interface InterfaceCartItem {
  id: number
  name: string
  color: string
  size: string
  slug: string
  price: number
  image: string
  tokoId: number
  tokoName: string
  tokoAddress: string
  totalPrice: number
  qty: number
  itemsByToko?: any
  isChecked?: boolean
}

export interface InterfaceProduct {
  id: number
  name: string
  color: string[]
  size: string[]
  slug: string
  price: number
  image: string
  tokoId: number
  tokoName: string
  tokoAddress: string
  qty?: number
  totalPrice?: number
  itemsByToko?: any
  isChecked?: boolean
}
