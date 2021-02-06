import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Image,
  Flex,
  Text,
  HStack,
  Spacer,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { GIFLoading } from '../assets'

type Props = {
  isOpen: boolean
  onClose: () => void
  item: any
}

const ModalCart: React.FC<Props> = ({ isOpen, onClose, item }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Berhasil Ditambahkan</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='30px'>
          <Box
            border='1px'
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            rounded='lg'
            p='10px'
          >
            <Flex
              alignItems={{ base: 'left', md: 'center' }}
              flexDir={{ base: 'column', md: 'row' }}
            >
              <HStack spacing='10px'>
                <Image
                  fallbackSrc={GIFLoading}
                  src={item.image}
                  boxSize='60px'
                  rounded='lg'
                  objectFit='cover'
                  alt={item.name}
                />
                <Text
                  color={useColorModeValue('gray.500', 'gray.200')}
                  fontSize='sm'
                >
                  {item.name} - {item.color}, {item.size}
                </Text>
              </HStack>
              <Spacer />
              <Link to='/cart'>
                <Button
                  colorScheme='green'
                  mt={{ base: '10px', md: '0' }}
                  size='sm'
                >
                  Lihat Keranjang
                </Button>
              </Link>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalCart
