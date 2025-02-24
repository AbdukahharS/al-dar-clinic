'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import axios from 'axios' // Import axios for fetching
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

import Button from '../Button'

function GalleryCarousel() {
  const [active, setActive] = useState(0)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/gallery') // Replace with your API endpoint
        const imageUrls = response.data.data.map((item) => item.image.original) //Extract image urls.
        setImages(imageUrls)
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setLoading(false)
      }
    }

    if (axios.defaults.baseURL) {
      fetchImages()
    }
  }, [axios.defaults.baseURL]) // Add axios base URL as dependency

  if (loading) {
    return (
      <div className='flex justify-center items-center h-40'>
        <AiOutlineLoading3Quarters className='animate-spin h-10 w-10 text-5xl text-primary' />
      </div>
    ) // Simple loading indicator
  }

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: '60%',
        depth: 300,
        modifier: 1,
        slideShadows: true,
      }}
      navigation={{
        nextEl: '.swiper-gallery-next',
        prevEl: '.swiper-gallery-prev',
        clickable: true,
      }}
      modules={[EffectCoverflow, Navigation]}
      onSlideChange={(swiper) => {
        setActive(swiper.realIndex)
      }}
      className='gallery py-9'
    >
      {images.map((img, ind) => (
        <SwiperSlide
          key={ind}
          className='!w-2/3 h-[470px] overflow-hidden rounded-3xl shadow-[0px_6px_20px_0px_rgba(0,0,0,0.15)]'
        >
          <motion.div
            className='relative h-[300px] md:h-[470px]'
            animate={{
              filter: ind !== active ? 'brightness(60%)' : 'brightness(100%)',
            }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={img}
              alt={`Gallery item ${ind + 1}`}
              fill
              loading={ind === 0 ? 'eager' : 'lazy'}
              priority={ind === 0}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </motion.div>
        </SwiperSlide>
      ))}
      <div className='slider-controler mt-16 flex flex-row gap-4 justify-center'>
        <Button size='icon' className='swiper-gallery-prev'>
          <FaChevronLeft />
        </Button>
        <Button size='icon' className='swiper-gallery-next'>
          <FaChevronRight />
        </Button>
      </div>
    </Swiper>
  )
}

export default GalleryCarousel
