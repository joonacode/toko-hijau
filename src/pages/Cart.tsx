import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Checkbox,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { GIFLoading, IMGEmpty } from '../assets'
import { CartItem, FormatCurrency } from '../components'
import { CLEAR_CART } from '../state/actionTypes'
import { checkAllCart, paymentAction } from '../state/cart/cartActions'

const Cart: React.FC = () => {
  const { items, totalPrice, allChecked, selectedItem } = useSelector(
    (state: RootStateOrAny) => state.cart.carts,
  )
  const history = useHistory()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => setIsOpen(false)

  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const borderColorT = useColorModeValue('gray.100', 'gray.500')
  const bgRingkasan = useColorModeValue('white', 'gray.700')

  const dispatch = useDispatch()
  const cancelRef = React.useRef(null)

  const handleClearCart = () => {
    dispatch({ type: CLEAR_CART })
    onClose()
  }

  const handleCheckAll = (isChecked: boolean) => {
    dispatch(checkAllCart(!isChecked))
  }

  const handleBuy = (allChecked: boolean) => {
    history.push('/payment/success')
    dispatch(paymentAction(allChecked))
  }

  return (
    <Box minH='70vh'>
      {items.length === 0 ? (
        <Flex
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          w='100%'
          my='50px'
        >
          <Image
            src={IMGEmpty}
            fallbackSrc={GIFLoading}
            alt='empty'
            width='400px'
          />
          <Heading as='h2' mt='20px' fontSize='xl'>
            Keranjang Kosong
          </Heading>
          <Link to='/'>
            <Button mt='18px' colorScheme='green'>
              Kembali
            </Button>
          </Link>
        </Flex>
      ) : (
        <>
          <Grid templateColumns='repeat(12, 1fr)' gap='30px'>
            <GridItem colSpan={{ base: 12, md: 7, lg: 8 }}>
              <Box borderBottom='4px' borderColor={borderColor} pb='10px'>
                <Flex alignItems='center'>
                  <Checkbox
                    isChecked={allChecked}
                    onChange={() => handleCheckAll(allChecked)}
                    colorScheme='green'
                    // mr='15px'
                  ></Checkbox>
                  <Text ml='15px' fontSize='sm'>
                    Pilih Semua Produk
                  </Text>
                  <Spacer />
                  {allChecked ? (
                    <Button variant='ghost' size='sm' onClick={onOpen}>
                      Hapus
                    </Button>
                  ) : (
                    <Button variant='ghost' size='sm'>
                      Hapus
                    </Button>
                  )}
                </Flex>
              </Box>
              {items.map((cart: any, i: number) => (
                <CartItem key={i} {...cart} />
              ))}
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 5, lg: 4 }}>
              <Box
                position={{ base: 'fixed', md: 'sticky' }}
                top={{ base: 'auto', md: '90px' }}
                bottom={{ base: '0', md: 'auto' }}
                left={{ base: '0', md: 'auto' }}
                bgColor={bgRingkasan}
                w='100%'
                border='1px'
                py='10px'
                px='15px'
                borderColor={borderColor}
                shadow='base'
                rounded='md'
              >
                <Accordion allowToggle defaultIndex={[0]}>
                  <AccordionItem border='0'>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Heading as='h5' size='sm'>
                          Ringkasan Belanja
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex
                        alignItems='center'
                        mt='10px'
                        borderTop='1px'
                        pt='10px'
                        borderColor={borderColorT}
                      >
                        <Text color='gray.500'>Total Harga</Text>
                        <Spacer />
                        <Text fontWeight='bold'>
                          <FormatCurrency value={totalPrice} />
                        </Text>
                      </Flex>
                      {selectedItem > 0 ? (
                        <Button
                          mt='20px'
                          colorScheme='green'
                          fontSize='sm'
                          size='sm'
                          w='100%'
                          onClick={() => handleBuy(allChecked)}
                        >
                          Beli ({selectedItem})
                        </Button>
                      ) : (
                        <Button
                          mt='20px'
                          colorScheme='teal'
                          fontSize='sm'
                          size='sm'
                          isDisabled={true}
                          w='100%'
                        >
                          Beli ({selectedItem})
                        </Button>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Hapus Semua Barang
            </AlertDialogHeader>

            <AlertDialogBody>Apakah kamu yakin ?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button colorScheme='red' onClick={handleClearCart} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default Cart
