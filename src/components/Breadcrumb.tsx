import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb as BreadcrumbChakra,
} from '@chakra-ui/react'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type Props = {
  dataBreadcrumb: string[]
}

const Breadcrumb: React.FC<Props> = ({ dataBreadcrumb }) => {
  return (
    <BreadcrumbChakra
      mb='20px'
      spacing='8px'
      separator={<FaAngleRight color='gray.500' />}
    >
      <BreadcrumbItem fontSize='sm'>
        <BreadcrumbLink as={Link} to='/' color='gray.500'>
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      {dataBreadcrumb.map((v, i) => (
        <BreadcrumbItem fontSize='sm' key={i}>
          <BreadcrumbLink as={Link} to='/' color='gray.500'>
            {v}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </BreadcrumbChakra>
  )
}

export default Breadcrumb
