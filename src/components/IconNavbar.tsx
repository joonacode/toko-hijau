import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type Props = {
  Icon: any
  total: number
}

const IconNavbar: React.FC<Props> = ({ Icon, total }) => {
  return (
    <>
      <Box color='gray.600' position='relative'>
        <Icon size='16px' />
        {/* {total > 0 && ( */}
        <Box
          position='absolute'
          borderRadius='full'
          fontSize='10px'
          color='white'
          h='18px'
          w='18px'
          bgColor='red.400'
          top='-10px'
          right='-10px'
          display={total > 0 ? 'flex' : 'none'}
          alignItems='center'
          justifyContent='center'
          border='2px'
          borderColor={useColorModeValue('white', 'gray.800')}
        >
          {total}
        </Box>
        {/* )} */}
      </Box>
    </>
  )
}

export default IconNavbar
