import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const RadioCheck: React.FC<any> = (props) => {
  return (
    <label>
      <input
        type='radio'
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.value === props.valueUser}
      />
      <Box
        border='1px'
        borderColor={useColorModeValue('gray.200', 'blue.800')}
        py={props.py || '5px'}
        pr={props.pr || '5px'}
        pl={props.pl || '5px'}
        m={props.m || '5px'}
        rounded={props.rounded || 'xl'}
        className='variant-select'
      >
        {props.children}
      </Box>
    </label>
  )
}

export default RadioCheck
