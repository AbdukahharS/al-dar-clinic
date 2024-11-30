'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { EffectCoverflow, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

import Button from '../Button'
import slide_image_1 from '@/public/images/gallery-1.webp'
import slide_image_2 from '@/public/images/gallery-2.webp'
import slide_image_3 from '@/public/images/gallery-3.webp'

function GalleryCarousel() {
  const [active, setActive] = useState(0)

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
      {[slide_image_1, slide_image_2, slide_image_3].map((img, ind) => (
        <SwiperSlide
          key={ind}
          className='!w-2/3 h-[470px] overflow-hidden rounded-3xl shadow-[0px_6px_20px_0px_rgba(0,0,0,0.15)]'
        >
          {/* <div className='relative w-full h-[310px] md:h-[450px]'>
            <Image
              src={el.img}
              alt={el.title}
              fill
              loading={ind === 0 ? 'eager' : 'lazy'}
              priority={ind === 0 ? true : false}
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              className={ind === 0 ? 'lg:max-w-5xl' : ''}
            />
          </div> */}
          <motion.div
            className={`relative h-[300px] md:h-[470px]`}
            animate={{
              filter: ind !== active ? 'brightness(60%)' : 'brightness(100%)',
            }}
            transition={{ duration: 0.5 }} // Customize the duration of the transition
          >
            <Image
              src={img}
              alt={'Gallery item'}
              fill
              loading={ind === 0 ? 'eager' : 'lazy'}
              priority={ind === 0 ? true : false}
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
