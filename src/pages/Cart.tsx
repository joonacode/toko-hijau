import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GIFLoading, IMGEmpty } from '../assets'
import { CartItem, FormatCurrency } from '../components'

const Cart: React.FC = () => {
  const { items, totalItem, totalPrice } = useSelector(
    (state: RootStateOrAny) => state.cart.carts,
  )
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const bgRingkasan = useColorModeValue('white', 'gray.700')

  return (
    <Box minH='70vh'>
      {items.length === 0 ? (
        <Flex
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          w='100%'
        >
          <Image
            src={IMGEmpty}
            fallbackSrc={GIFLoading}
            alt='empty'
            width='400px'
          />
          <Heading as='h2' fontSize='3xl'>
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
                  <Checkbox></Checkbox>
                  <Text ml='15px' fontSize='sm'>
                    Pilih Semua Produk
                  </Text>
                  <Spacer />
                  <Button size='sm'>Hapus</Button>
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
                        borderColor='gray.200'
                      >
                        <Text color='gray.500'>Total Harga</Text>
                        <Spacer />
                        <Text fontWeight='bold'>
                          <FormatCurrency value={totalPrice} />
                        </Text>
                      </Flex>
                      <Button
                        mt='20px'
                        colorScheme='green'
                        fontSize='sm'
                        size='sm'
                        w='100%'
                      >
                        Beli ({totalItem})
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Cart
