import { Box, Checkbox, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { CartMainItem } from '.'
import { IProduct } from '../Interface'
import { changeCheckToko } from '../state/cart/cartActions'

type Props = {
  tokoName: string
  tokoAddress: string
  itemsByToko: IProduct[]
  allChecked: boolean
  tokoId: number
}

const CartItem: React.FC<Props> = ({
  tokoName,
  tokoAddress,
  itemsByToko,
  allChecked,
  tokoId,
}) => {
  const dispatch = useDispatch()
  const handleCheckToko = (status: boolean, tokoId: number) => {
    dispatch(changeCheckToko({ status: !status, tokoId }))
  }

  return (
    <Box
      borderBottom='4px'
      mt='20px'
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      pb='20px'
    >
      <Flex alignItems='center' mb='20px'>
        <Checkbox
          isChecked={allChecked}
          onChange={() => handleCheckToko(allChecked, tokoId)}
          colorScheme='green'
          mr='15px'
        ></Checkbox>
        <Box>
          <Text fontWeight='bold'>{tokoName}</Text>
          <Text color='gray.500' fontSize='xs'>
            {tokoAddress}
          </Text>
        </Box>
      </Flex>
      {itemsByToko.map((item: any, i: number) => (
        <CartMainItem {...item} key={i} />
      ))}
    </Box>
  )
}

export default CartItem
