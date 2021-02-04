import { RootStateOrAny, useSelector } from 'react-redux'

const useProduct = () => {
  const product = useSelector((state: RootStateOrAny) => state.product)
  return product
}

export default useProduct
