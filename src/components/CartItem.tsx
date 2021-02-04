import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteCart, updateQty } from '../state/cart/cartActions'
import { FormatCurrency } from '.'
import { InterfaceProduct } from '../Interface'
import { GIFLoading } from '../assets'

const CartItem: React.FC<InterfaceProduct> = ({
  id,
  name,
  image,
  tokoName,
  tokoAddress,
  price,
  totalPrice,
  color,
  size,
  qty,
}) => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [qtyState, setQtyState] = useState<number>(0)
  useEffect(() => {
    setQtyState(qty!)
  }, [qty])

  const toggleQty = (id: number, type: string) => {
    if (type === 'plus') {
      setQtyState(qtyState + 1)
      const total = qtyState + 1
      const data = {
        id,
        qty: total,
      }
      dispatch(updateQty({ ...data }))
    } else {
      if (qtyState > 1) {
        setQtyState(qtyState - 1)
        const total = qtyState - 1
        const data = {
          id,
          qty: total,
        }
        dispatch(updateQty({ ...data }))
      }
    }
  }

  const handleChange = (e: any) => {
    setQtyState(parseInt(e.target.value))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (qtyState < 1) {
      toast({
        position: 'bottom-left',
        title: 'Jumlah minimal 1!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } else {
      setQtyState(qtyState)
      const data = {
        id,
        qty: qtyState,
      }
      dispatch(updateQty({ ...data }))
    }
  }

  const handleDeleteItem = (id: number) => {
    dispatch(deleteCart(id))
  }

  return (
    <Box
      borderBottom='4px'
      mt='20px'
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      pb='20px'
    >
      <Flex alignItems='center' mb='20px'>
        <Checkbox mr='15px'></Checkbox>
        <Box>
          <Text fontWeight='bold'>{tokoName}</Text>
          <Text color='gray.500' fontSize='xs'>
            {tokoAddress}
          </Text>
        </Box>
      </Flex>
      <Flex alignItems='center'>
        <Flex>
          <Checkbox mr='15px'></Checkbox>
          <Image
            boxSize='90px'
            rounded='lg'
            fallbackSrc={GIFLoading}
            mr='15px'
            src={image}
            alt={name}
          />
          <VStack justifyContent='left' alignItems='left'>
            <Text fontSize='base' fontWeight='bold' alignItems='start'>
              {name} - {color}, {size}
            </Text>

            <HStack>
              <Text
                fontSize='sm'
                fontWeight='bold'
                color='green.500'
                alignItems='start'
              >
                <FormatCurrency value={price} />
              </Text>
              <Text px='2px'>|</Text>
              <Text
                fontSize='sm'
                fontWeight='bold'
                color='green.500'
                alignItems='start'
              >
                <FormatCurrency value={totalPrice!} />
              </Text>
            </HStack>
          </VStack>
        </Flex>
      </Flex>
      <Flex mt='20px' ml='30px' alignItems='center'>
        <Text
          cursor='pointer'
          fontSize='sm'
          fontWeight='bold'
          color={useColorModeValue('orange.500', 'orange.300')}
        >
          Tulis Catatan untuk Toko
        </Text>
        <Spacer />
        <HStack>
          <Button size='sm' variant='ghost' color='gray.400'>
            <FaHeart />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            color='gray.400'
            onClick={() => handleDeleteItem(id)}
          >
            <FaTrash />
          </Button>
          <HStack maxW='140px'>
            <Button
              size='xs'
              rounded='full'
              bgColor='green.500'
              color='white'
              onClick={() => toggleQty(id, 'min')}
            >
              -
            </Button>
            <form onSubmit={handleSubmit}>
              <Input
                size='sm'
                type='number'
                borderTop='0'
                borderLeft='0'
                borderRight='0'
                focusBorderColor='none'
                textAlign='center'
                min={1}
                value={qtyState}
                onChange={(e) => handleChange(e)}
              />
            </form>
            <Button
              size='xs'
              rounded='full'
              bgColor='green.500'
              color='white'
              onClick={() => toggleQty(id, 'plus')}
            >
              +
            </Button>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  )
}

export default CartItem
