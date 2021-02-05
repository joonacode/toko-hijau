import React, { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import { GIFLoading } from '../assets'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { dumyProducts } from '../state/product/dumyProducts'
import useProduct from '../hooks/useProduct'

type Props = {
  handleClickImage: any
  previewImage: string
}

const ListImageProduct: React.FC<Props> = ({
  handleClickImage,
  previewImage,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const detailProduct = useProduct().detailProduct

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
        <Box
          rounded='lg'
          overflow='hidden'
          cursor='pointer'
          border={detailProduct.image === previewImage ? '2px' : '0'}
          borderColor={
            detailProduct.image === previewImage ? 'green.300' : 'white'
          }
          onClick={() => handleClickImage(detailProduct.image)}
        >
          <Image
            fallbackSrc={GIFLoading}
            src={detailProduct.image}
            alt='baju'
            boxSize='100%'
            maxHeight={{ base: '60px', md: '50px', xl: '60px' }}
            minHeight={{ base: '60px', md: '50px', xl: '60px' }}
            objectFit='cover'
          />
        </Box>
        {dumyProducts.map(
          (v, id) =>
            v.image !== detailProduct.image && (
              <Box
                rounded='lg'
                overflow='hidden'
                key={id}
                cursor='pointer'
                border={v.image === previewImage ? '2px' : '0'}
                borderColor={v.image === previewImage ? 'green.300' : 'white'}
                onClick={() => handleClickImage(v.image)}
              >
                <Image
                  fallbackSrc={GIFLoading}
                  src={v.image}
                  alt='baju'
                  boxSize='100%'
                  maxHeight={{ base: '60px', md: '50px', xl: '60px' }}
                  minHeight={{ base: '60px', md: '50px', xl: '60px' }}
                  objectFit='cover'
                />
              </Box>
            ),
        )}
      </Slider>
    </Box>
  )
}

export default ListImageProduct
