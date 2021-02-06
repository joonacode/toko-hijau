export interface IProduct {
  id: number
  name: string
  color: string | string[]
  size: string | string[]
  slug: string
  price: number
  image: string
  tokoId: number
  tokoName: string
  tokoAddress: string
  totalPrice?: number
  qty?: number
  itemsByToko?: any
  isChecked?: boolean
}

export interface IItemCart {
  tokoId: number
  allChecked: boolean
  tokoName: string
  tokoAddress: string
  itemsByToko: IProduct[]
}

// IProduct
// IProduct
