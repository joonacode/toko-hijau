import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IMGPaymentSuccess, GIFLoading } from '../assets'

const Payment = () => {
  return (
    <Box h='80vh'>
      <Flex
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        w='100%'
        mt='50px'
      >
        <Image
          src={IMGPaymentSuccess}
          fallbackSrc={GIFLoading}
          alt='empty'
          width='400px'
        />
        <Link to='/'>
          <Button mt='30px' colorScheme='green'>
            Kembali
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}

export default Payment
