import React, { useState } from 'react'
import {
  Box,
  GridItem,
  Text,
  Image,
  IconButton,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IProduct } from '../Interface'
import { GIFLoading } from '../assets'
import { FormatCurrency } from '.'

const ProductItem: React.FC<IProduct> = ({
  name,
  price,
  slug,
  image,
  tokoAddress,
}) => {
  const [isLike, setIsLike] = useState(false)
  const toast = useToast()

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
    <GridItem colSpan={{ base: 20, sm: 10, md: 5, lg: 4 }}>
      <Box
        rounded='lg'
        overflow='hidden'
        border='1px'
        shadow='base'
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        position='relative'
      >
        <Link to={`/detail/${slug}`}>
          <Image
            src={image}
            alt={name}
            minHeight={{
              base: '100%',
              sm: '200px',
              md: '170px',
              lg: '150px',
              xl: '200px',
            }}
            maxHeight={{
              base: '100%',
              sm: '200px',
              md: '170px',
              lg: '150px',
              xl: '200px',
            }}
            w='100%'
            objectFit='cover'
            fallbackSrc={GIFLoading}
          />
        </Link>
        <IconButton
          onClick={toggleIsLike}
          position='absolute'
          top='5px'
          right='6px'
          aria-label='Like'
          size='sm'
          isRound={true}
          color={isLike ? 'red.500' : 'gray.500'}
          icon={<FaHeart />}
        />
        <Box px='10px' py='8px'>
          <Link to={`/detail/${slug}`}>
            <Text fontSize='sm' fontWeight='500' isTruncated title={name}>
              {name}
            </Text>
          </Link>
          <Text fontSize='xs' mt='5px' fontWeight='bold' color='yellow.700'>
            <FormatCurrency value={price} />
          </Text>
          <Text fontSize='xs' mt='3px' color='gray.500'>
            {tokoAddress}
          </Text>
        </Box>
      </Box>
    </GridItem>
  )
}

export default ProductItem
