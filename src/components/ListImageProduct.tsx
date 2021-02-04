import React, { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import { GIFLoading } from '../assets'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const ListImageProduct: React.FC = () => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  }
  const sliderRef: React.RefObject<Slider> = useRef(null)
  const next = () => sliderRef.current?.slickNext()
  const prev = () => sliderRef.current?.slickPrev()
  return (
    <Box position='relative'>
      <Box
        onClick={prev}
        rounded='full'
        position='absolute'
        left='-30px'
        zIndex={100}
        top='15%'
        shadow='lg'
        height='40px'
        width='40px'
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        display='flex'
        alignItems='center'
        color={useColorModeValue('gray.500', 'gray.300')}
        justifyContent='center'
        cursor='pointer'
      >
        <FaAngleLeft />
      </Box>
      <Box
        onClick={next}
        rounded='full'
        position='absolute'
        right='-30px'
        zIndex={100}
        top='15%'
        shadow='lg'
        height='40px'
        width='40px'
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        display='flex'
        alignItems='center'
        color={useColorModeValue('gray.500', 'gray.300')}
        justifyContent='center'
        cursor='pointer'
      >
        <FaAngleRight />
      </Box>
      <Slider {...settings} ref={sliderRef}>
        {Array(10)
          .fill('')
          .map((_, id) => (
            <Box rounded='lg' overflow='hidden' key={id} cursor='pointer'>
              <Image
                fallbackSrc={GIFLoading}
                src='https://cf.shopee.co.id/file/bd94bcc5d73b5591f5e66183a8e439e8'
                alt='baju'
                boxSize='100%'
                objectFit='cover'
              />
            </Box>
          ))}
      </Slider>
    </Box>
  )
}

export default ListImageProduct
