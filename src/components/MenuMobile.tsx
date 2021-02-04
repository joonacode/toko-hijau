import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import React from 'react'
import { FaEnvelope, FaBell, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IconNavbar } from '.'
import useCart from '../hooks/useCart'

const MenuMobile: React.FC = () => {
  return (
    <Box
      shadow='sm'
      borderBottom='1px'
      borderColor={useColorModeValue('white', 'gray.900')}
      py='15px'
      zIndex='100'
      display={{ base: 'block', md: 'none' }}
      bgColor={useColorModeValue('white', 'gray.800')}
      overflowX='auto'
      overflowY='visible'
    >
      <Container maxW='95%'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Box>
            <Menu isLazy>
              <MenuButton fontSize='sm' color='gray.500' size='sm'>
                Kategori
              </MenuButton>
              <MenuList>
                <MenuItem fontSize='sm'>Baju</MenuItem>
                <MenuItem fontSize='sm'>Celana</MenuItem>
                <MenuItem fontSize='sm'>Jaket</MenuItem>
                <MenuItem fontSize='sm'>Makanan</MenuItem>
                <MenuItem fontSize='sm'>Minuman</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Flex>
            <HStack spacing='40px' pl='30px'>
              <Link to='/cart'>
                <IconNavbar
                  Icon={FaShoppingCart}
                  total={useCart().carts.items.length}
                />
              </Link>
              <IconNavbar Icon={FaBell} total={5} />
              <IconNavbar Icon={FaEnvelope} total={0} />
            </HStack>
            <Flex
              ml='20px'
              pl='20px'
              borderLeft='1px'
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Menu isLazy>
                <MenuButton fontSize='sm' color='gray.500' size='sm'>
                  <HStack>
                    <Avatar
                      size='xs'
                      name='Dan Abrahmov'
                      src='https://bit.ly/dan-abramov'
                    />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize='sm'>Profile Toko</MenuItem>
                  <MenuItem fontSize='sm'>Orderan</MenuItem>
                  <MenuItem fontSize='sm'>Pendapatan</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex ml='30px'>
              <Menu isLazy>
                <MenuButton fontSize='sm' color='gray.500' size='sm'>
                  <HStack>
                    <Avatar
                      size='xs'
                      name='Dan Abrahmov'
                      src='https://bit.ly/dan-abramov'
                    />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize='sm'>Profile</MenuItem>
                  <MenuItem fontSize='sm'>Pesanan</MenuItem>
                  <MenuItem fontSize='sm'>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default MenuMobile
