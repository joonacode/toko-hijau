import { useColorModeValue } from '@chakra-ui/react'

const useSecondaryColor = () => {
  return useColorModeValue('gray.500', 'gray.200')
}

export default useSecondaryColor
