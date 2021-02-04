import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Input,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ModalSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box position='relative' w='100%'>
            <Input
              type='text'
              rounded='lg'
              placeholder='Masukan nama barang....'
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalSearch
