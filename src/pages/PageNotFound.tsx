import { Box, Button, Flex, Image, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { IMGPageNotFound, GIFLoading } from '../assets'

const PageNotFound = () => {
  return (
    <Box h='70vh'>
      <Flex
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        w='100%'
        my='100px'
      >
        <Image
          src={IMGPageNotFound}
          fallbackSrc={GIFLoading}
          alt='empty'
          width='400px'
        />
        <Heading as='h2' mt='20px' fontSize='xl'>
          Halaman Tidak Ditemukan
        </Heading>
        <Link to='/'>
          <Button mt='30px' colorScheme='green'>
            Kembali
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}

export default PageNotFound
