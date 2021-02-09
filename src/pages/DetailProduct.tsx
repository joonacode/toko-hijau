import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { GIFLoading, IMGProductNotFound } from '../assets'
import {
  ModalCart,
  Breadcrumb,
  ListImageProduct,
  RadioCheck,
  ProductItem,
  FormatCurrency,
} from '../components'
import { useCart, useProduct } from '../hooks'
import { addToCart } from '../state/cart/cartActions'
import { IProduct } from '../Interface'
import { getProductBySlug } from '../state/product/productAction'
import { FaHeart } from 'react-icons/fa'

const DetailProduct: React.FC = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { slug }: { slug: string } = useParams()

  useEffect(() => {
    dispatch(getProductBySlug(slug))
  }, [slug, dispatch])

  const { detailProduct, products } = useProduct()
  const carts = useCart().carts
  const dataBreadcrumb = [detailProduct.tokoName, detailProduct.name]

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [size, setSize] = useState<string>('')
  const [sucessItem, setSuccessItem] = useState<IProduct | {}>({})
  const [color, setColor] = useState<string>('')
  const colorOptions = detailProduct.color || ['Hijau', 'Coklat', 'Abu-abu']
  const sizeOptions = detailProduct.size || ['m', 'l', 'xl']

  const closeModalCart = () => setOpenModal(false)

  const showModal = () => {
    if (!color) {
      toast({
        position: 'bottom-left',
        title: 'Pilih warna terlebih dahulu!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } else if (!size) {
      toast({
        position: 'bottom-left',
        title: 'Pilih ukuran terlebih dahulu!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } else {
      const getToko = carts.items.filter(
        (item: any) => item.tokoId === detailProduct.tokoId,
      )
      let checkAvailable
      if (getToko.length === 0) {
        checkAvailable = []
      } else {
        checkAvailable = getToko[0].itemsByToko.filter(
          (cart: IProduct) =>
            cart.slug === slug && cart.color === color && cart.size === size,
        )
      }
      if (checkAvailable.length === 0) {
        const dataProduct = {
          ...detailProduct,
          color,
          totalPrice: 1 * detailProduct.price,
          size,
          qty: 1,
          isChecked: true,
        }
        dispatch(addToCart(dataProduct))
        setSuccessItem(dataProduct)
        setOpenModal(true)
        setSize('')
        setColor('')
      } else {
        toast({
          position: 'bottom-left',
          title: 'Produk sudah ada!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    }
  }

  const similar = products.slice(0, 11)
  const [previewImage, setPreviewImage] = useState<string>('')
  const handleClickImage = (image: string) => {
    setPreviewImage(image)
  }

  const [isLike, setIsLike] = useState<boolean>(false)

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

  useEffect(() => {
    setIsLike(false)
    setPreviewImage('')
    setColor('')
    setSize('')
  }, [slug])

  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const colorTwo = useColorModeValue('orange.600', 'orange.400')

  return (
    <>
      {detailProduct.image ? (
        <>
          <Breadcrumb dataBreadcrumb={dataBreadcrumb} />
          <Grid
            templateColumns='repeat(12, 1fr)'
            gap={{ base: '0', md: '50px' }}
          >
            <GridItem colSpan={{ base: 12, md: 5 }}>
              <Box rounded='lg' overflow='hidden'>
                <Image
                  fallbackSrc={GIFLoading}
                  src={previewImage || detailProduct.image}
                  alt='baju'
                  boxSize='100%'
                  objectFit='cover'
                />
              </Box>
              <Box mt='10px'>
                <ListImageProduct
                  previewImage={previewImage}
                  handleClickImage={handleClickImage}
                />
              </Box>
            </GridItem>
            <GridItem
              mt={{ base: '40px', md: '0' }}
              colSpan={{ base: 12, md: 7 }}
            >
              <Heading as='h2' size='md' textTransform='uppercase'>
                {detailProduct.name}
              </Heading>
              <HStack mt='10px' spacing='12px'>
                <Text fontSize='sm' color='gray.500'>
                  Terjual 2.228
                </Text>
                <Text fontSize='sm' color='gray.500'>
                  (800 ulasan)
                </Text>
                <Text fontSize='sm' color='gray.500'>
                  Diskusi (120)
                </Text>
              </HStack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={{ base: '10px', md: '30px' }}
                mt='40px'
                pb='20px'
                borderBottom='1px'
                borderColor={borderColor}
              >
                <Text
                  fontSize='sm'
                  color='gray.500'
                  textTransform='uppercase'
                  fontWeight='500'
                >
                  Harga
                </Text>
                <Text fontSize='xl' color={colorTwo} fontWeight='bold'>
                  <FormatCurrency value={detailProduct.price} />
                </Text>
              </Stack>
              <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                mt='20px'
                pb='20px'
                borderBottom='1px'
                borderColor={borderColor}
              >
                <Text
                  fontSize='sm'
                  mr='30px'
                  color='gray.500'
                  textTransform='uppercase'
                  fontWeight='500'
                >
                  Warna
                </Text>
                <Box mt={{ base: '10px', md: '0' }}>
                  <Text
                    fontSize='sm'
                    mb='10px'
                    color='gray.600'
                    fontWeight='bold'
                  >
                    Variant
                  </Text>
                  <Flex alignItems='center' wrap='wrap'>
                    {colorOptions.map((v: string) => (
                      <RadioCheck
                        name='color'
                        value={v}
                        valueUser={color}
                        key={v}
                        pr='10px'
                        onChange={() => setColor(v)}
                      >
                        <HStack spacing='10px'>
                          <Image
                            fallbackSrc={GIFLoading}
                            boxSize='35px'
                            rounded='lg'
                            objectFit='cover'
                            src='https://htmlcolorcodes.com/assets/images/html-color-codes-color-palette-generators.jpg'
                            alt='Segun Adebayo'
                          />
                          <Text fontSize='sm'>{v}</Text>
                        </HStack>
                      </RadioCheck>
                    ))}
                  </Flex>
                </Box>
              </Flex>
              <Flex
                mt='20px'
                pb='20px'
                borderBottom='1px'
                flexDirection={{ base: 'column', md: 'row' }}
                borderColor={borderColor}
              >
                <Text
                  fontSize='sm'
                  mr='30px'
                  color='gray.500'
                  textTransform='uppercase'
                  fontWeight='500'
                >
                  Ukuran
                </Text>
                <Box mt={{ base: '10px', md: '0' }}>
                  <Text
                    fontSize='sm'
                    mb='10px'
                    color='gray.600'
                    fontWeight='bold'
                  >
                    Pilih variant
                  </Text>
                  <HStack>
                    {sizeOptions.map((v: string) => (
                      <RadioCheck
                        name='size'
                        value={v}
                        valueUser={size}
                        key={v}
                        rounded='lg'
                        pr='10px'
                        pl='10px'
                        onChange={() => setSize(v)}
                      >
                        <Text fontSize='sm' textTransform='uppercase'>
                          {v}
                        </Text>
                      </RadioCheck>
                    ))}
                  </HStack>
                </Box>
              </Flex>
              <HStack mt='20px'>
                <Button
                  colorScheme='green'
                  onClick={showModal}
                  borderRadius='md'
                >
                  Tambah Ke Keranjang
                </Button>
                <Button
                  bgColor={isLike ? 'gray.100' : 'gray.500'}
                  color={isLike ? 'red.500' : 'white'}
                  borderRadius='md'
                  onClick={toggleIsLike}
                >
                  <FaHeart />
                </Button>
              </HStack>
            </GridItem>
          </Grid>
        </>
      ) : (
        <Flex
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          w='100%'
          my='50px'
        >
          <Image
            src={IMGProductNotFound}
            fallbackSrc={GIFLoading}
            alt='empty'
            width='400px'
          />
          <Heading as='h2' mt='20px' fontSize='xl'>
            Produk Tidak Ditemukan
          </Heading>
          <Link to='/'>
            <Button mt='18px' colorScheme='green'>
              Kembali
            </Button>
          </Link>
        </Flex>
      )}

      <Box
        mt='40px'
        borderTop='1px'
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        pt='40px'
      >
        <Heading as='h5' size='md' mb='30px'>
          {detailProduct.image ? 'Produk Serupa' : 'Jelajahi Produk'}
        </Heading>
        <Grid
          templateColumns='repeat(20, 1fr)'
          gap={{ base: '5px', sm: '15px' }}
        >
          {similar.map(
            (product: IProduct, i: number) =>
              slug !== product.slug && <ProductItem {...product} key={i} />,
          )}
        </Grid>
      </Box>
      <ModalCart
        isOpen={openModal}
        onClose={closeModalCart}
        item={sucessItem}
      />
    </>
  )
}

export default DetailProduct
