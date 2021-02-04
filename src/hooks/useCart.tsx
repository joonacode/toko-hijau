import { RootStateOrAny, useSelector } from 'react-redux'

const useCart = () => {
  const cart = useSelector((state: RootStateOrAny) => state.cart)
  return cart
}

export default useCart
