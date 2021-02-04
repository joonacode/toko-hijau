import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { FaBox, FaStore, FaUser, FaBook, FaFilter } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { ProductItem } from '../components'
import useProduct from '../hooks/useProduct'
import { InterfaceProduct } from '../Interface'
import { CHANGE_PAGE } from '../state/actionTypes'
import { orderProduct } from '../state/product/productAction'

const Home: React.FC = () => {
  const products = useProduct().products
  const totalPage = useProduct().totalPage
  const currentPage = useProduct().currentPage
  const pageOne = products.slice(0, 10)
  const pageTwo = products.slice(10, 12)
  console.log(currentPage)
  const dispatch = useDispatch()

  const handleOrder = (type: string) => {
    dispatch(orderProduct(type))
  }

  const handleChangePage = (page: number) => {
    dispatch({ type: CHANGE_PAGE, payload: page })
  }

  return (
    <>
      <Tabs>
        <TabList overflowX='auto' overflowY='hidden'>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{ color: 'green.500', borderColor: 'green.500' }}
            color='gray.500'
          >
            <FaBox />
            <Text ml='10px'>Product</Text>
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{ color: 'green.500', borderColor: 'green.500' }}
            color='gray.500'
          >
            <FaStore />
            <Text ml='10px'>Toko</Text>
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{ color: 'green.500', borderColor: 'green.500' }}
            color='gray.500'
          >
            <FaUser />
            <Text ml='10px'>Profile</Text>
          </Tab>
          <Tab
            _focus={{ outline: 'none' }}
            _selected={{ color: 'green.500', borderColor: 'green.500' }}
            color='gray.500'
          >
            <FaBook />
            <Text ml='10px'>Katalog</Text>
          </Tab>
        </TabList>

        <TabPanels minH='80vh'>
          <TabPanel>
            <Flex mt='10px' mb='20px' align='center'>
              <Text fontSize='lg' fontWeight='bold'>
                Produk Baru
              </Text>
              <Spacer />
              <Flex align='center'>
                <Text
                  fontSize='sm'
                  mr='5px'
                  display={{ base: 'none', md: 'block' }}
                >
                  Urutkan:
                </Text>
                <Select
                  w={{ base: 'auto', md: '200px' }}
                  size='sm'
                  rounded='lg'
                  icon={<FaFilter />}
                  iconSize='sm'
                  iconColor='gray.500'
                  onChange={(e) => handleOrder(e.target.value)}
                >
                  <option value='option1'>Paling Sesuai</option>
                  <option value='date-asc'>Terbaru</option>
                  <option value='date-desc'>Terlama</option>
                  <option value='price-asc'>Termurah</option>
                  <option value='price-desc'>Termahal</option>
                  <option value='name-asc'>Nama A-Z</option>
                  <option value='name-desc'>Nama Z-A</option>
                </Select>
              </Flex>
            </Flex>
            {currentPage === 1 && (
              <Grid templateColumns='repeat(20, 1fr)' gap='15px'>
                {pageOne.map((product: InterfaceProduct, i: number) => (
                  <ProductItem {...product} key={i} />
                ))}
              </Grid>
            )}
            {currentPage === 2 && (
              <Grid templateColumns='repeat(20, 1fr)' gap='15px'>
                {pageTwo.map((product: InterfaceProduct, i: number) => (
                  <ProductItem {...product} key={i} />
                ))}
              </Grid>
            )}

            <Box mt='30px'>
              <HStack>
                {Array(totalPage)
                  .fill('')
                  .map((_, i) => (
                    <Button
                      key={i}
                      colorScheme={currentPage === i + 1 ? 'green' : 'gray'}
                      onClick={() => handleChangePage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
              </HStack>
            </Box>
          </TabPanel>
          <TabPanel>
            <p>Toko</p>
          </TabPanel>
          <TabPanel>
            <p>Profile</p>
          </TabPanel>
          <TabPanel>
            <p>Katalog!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Home
