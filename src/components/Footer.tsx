import {
  Box,
  Text,
  Container,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <Box
      mt='50px'
      borderTop='1px'
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      py='20px'
      color='gray.400'
    >
      <Container maxW='95%'>
        <Flex alignItems='center' flexDirection={{ base: 'column', md: 'row' }}>
          <Text fontSize='sm'>Copyright &copy; 2021 Toko Hijau</Text>
          <Spacer />
          <Text fontSize='sm'>Developed By JoonaCode</Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
