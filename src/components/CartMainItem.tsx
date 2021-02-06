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
import { FaHeart, FaTrash, FaPen } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {
  changeCheckCart,
  deleteCart,
  updateQty,
} from '../state/cart/cartActions'
import { FormatCurrency } from '.'
import { InterfaceCartItem } from '../Interface'
import { GIFLoading } from '../assets'

const CartMainItem: React.FC<InterfaceCartItem> = ({
  id,
  name,
  image,
  tokoId,
  price,
  totalPrice,
  color,
  size,
  qty,
  isChecked,
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
        tokoId: tokoId,
        color,
        size,
        qty: total,
      }
      dispatch(updateQty({ ...data }))
    } else {
      if (qtyState > 1) {
        setQtyState(qtyState - 1)
        const total = qtyState - 1
        const data = {
          id,
          tokoId: tokoId,
          color,
          size,
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
        tokoId: tokoId,
        color,
        size,
        qty: qtyState,
      }
      dispatch(updateQty({ ...data }))
    }
  }

  const handleDeleteItem = (
    id: number,
    size: string,
    color: string,
    tokoId: number,
  ) => {
    dispatch(deleteCart({ id, size, color, tokoId }))
  }

  const handleCheck = (
    isChecked: boolean,
    id: number,
    color: string,
    size: string,
    tokoId: number,
  ) => {
    const data = {
      isChecked: !isChecked,
      id,
      color,
      size,
      tokoId,
    }
    dispatch(changeCheckCart({ ...data }))
  }

  const [isLike, setIsLike] = useState(false)

  const toggleIsLike = () => {
    setIsLike(!isLike)
    toast({
      position: 'bottom-left',
      title: isLike
        ? 'Dihapus dari produk yang disukai.'
        : 'Ditambahkan ke produk yang disukai.',
      status: isLike ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Box mb='30px'>
      <Flex alignItems='center'>
        <Flex>
          <Checkbox
            colorScheme='green'
            isChecked={isChecked}
            onChange={() => handleCheck(isChecked!, id, color, size, tokoId)}
            mr='15px'
          ></Checkbox>
          <Image
            boxSize='90px'
            objectFit='cover'
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
          fontSize='xs'
          fontWeight='bold'
          color={useColorModeValue('orange.500', 'orange.300')}
          display={{ base: 'none', md: 'block' }}
        >
          Tulis Catatan untuk Toko
        </Text>
        <Button
          size='sm'
          variant='ghost'
          color='gray.400'
          display={{ base: 'block', md: 'none' }}
        >
          <HStack>
            <FaPen /> <Text>Catatan</Text>
          </HStack>
        </Button>
        <Spacer />
        <HStack>
          <Button
            size='sm'
            variant='ghost'
            onClick={toggleIsLike}
            color={isLike ? 'red.500' : 'gray.400'}
          >
            <FaHeart />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            color='gray.400'
            onClick={() => handleDeleteItem(id, size, color, tokoId)}
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

export default CartMainItem
