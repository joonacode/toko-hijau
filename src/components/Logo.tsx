import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Logo: React.FC = () => {
  return (
    <Link to='/'>
      <Box
        _hover={{ backgroundColor: 'green.600' }}
        cursor='pointer'
        bgColor='green.500'
        color='white'
        rounded='lg'
        mr='20px'
        w='130px'
        py='6px'
        px='20px'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Heading as='h1' size='base' textAlign='center'>
          Toko Hijau
        </Heading>
      </Box>
    </Link>
  )
}

export default Logo
