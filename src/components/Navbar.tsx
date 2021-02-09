import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEnvelope, FaSearch, FaBell, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IconNavbar, ModalSearch } from '.'
import { IMGAvatar, IMGShop } from '../assets'
import { useSecondaryColor } from '../hooks'
import useCart from '../hooks/useCart'
import ColorModeSwitcher from './ColorModeSwitcher'
import Logo from './Logo'

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleModal = () => setShowModal(!showModal)

  return (
    <Box
      shadow='base'
      borderBottom='1px'
      borderColor={useColorModeValue('white', 'gray.900')}
      py='15px'
      position='sticky'
      top='0'
      zIndex='300'
      bgColor={useColorModeValue('white', 'gray.800')}
    >
      <Container maxW='95%'>
        <Flex alignItems='center'>
          <Logo />
          <Box display={{ base: 'none', lg: 'block' }}>
            <Menu isLazy>
              <MenuButton fontSize='sm' color={useSecondaryColor()} size='sm'>
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
          <Box
            ml='20px'
            position='relative'
            w='50%'
            display={{ base: 'none', md: 'block' }}
          >
            <Input
              type='text'
              rounded='lg'
              placeholder='Search...'
              size='sm'
              focusBorderColor={useColorModeValue('gray.100', 'gray.700')}
              pr='50px'
            />
            <Button
              zIndex={100}
              size='sm'
              borderLeftRadius='0'
              position='absolute'
              rounded='lg'
              right='0'
              color='gray.500'
              border='1px'
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <FaSearch />
            </Button>
          </Box>
          <HStack
            spacing='40px'
            pl='30px'
            display={{ base: 'none', md: 'flex' }}
          >
            <Link to='/cart'>
              <IconNavbar
                Icon={FaShoppingCart}
                total={useCart().carts.totalItem}
              />
            </Link>
            <IconNavbar Icon={FaBell} total={2} />
            <IconNavbar Icon={FaEnvelope} total={4} />
          </HStack>
          <Flex
            ml='20px'
            pl='20px'
            borderLeft='1px'
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            display={{ base: 'none', md: 'block' }}
          >
            <Menu isLazy>
              <MenuButton fontSize='sm' color='gray.500' size='sm'>
                <HStack>
                  <Avatar size='xs' name='Dan Abrahmov' src={IMGShop} />

                  <Text
                    fontSize='sm'
                    color={useSecondaryColor()}
                    display={{ base: 'none', lg: 'block' }}
                  >
                    Toko
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem fontSize='sm'>Profile Toko</MenuItem>
                <MenuItem fontSize='sm'>Orderan</MenuItem>
                <MenuItem fontSize='sm'>Pendapatan</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex ml='30px' display={{ base: 'none', md: 'block' }}>
            <Menu isLazy>
              <MenuButton fontSize='sm' color='gray.500' size='sm'>
                <HStack>
                  <Avatar size='xs' name='Dan Abrahmov' src={IMGAvatar} />
                  <Text
                    fontSize='sm'
                    color={useSecondaryColor()}
                    display={{ base: 'none', lg: 'block' }}
                  >
                    Juna
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem fontSize='sm'>Profile</MenuItem>
                <MenuItem fontSize='sm'>Pesanan</MenuItem>
                <MenuItem fontSize='sm'>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Button
            colorScheme='teal'
            variant='ghost'
            display={{ base: 'block', md: 'none' }}
            onClick={toggleModal}
            ml='auto'
          >
            <FaSearch />
          </Button>
          <Box display={{ base: 'block', md: 'none' }} ml='10px'>
            <ColorModeSwitcher roundedRight='5px' />
          </Box>
        </Flex>
      </Container>
      <ModalSearch onClose={toggleModal} isOpen={showModal} />
    </Box>
  )
}

export default Navbar
