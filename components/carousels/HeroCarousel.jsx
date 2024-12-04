import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

import Button from '../Button'
import Carousel1 from '@/public/images/carousel 1.webp'
import Carousel2 from '@/public/images/carousel 2.webp'
import Carousel3 from '@/public/images/carousel 3.webp'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  {
    img: Carousel1,
    title: 'Home Healthcare',
    desc: 'Our team of skilled nurses offers a variety of medical services including wound care, medication management, and more.',
    link: '/book',
  },
  {
    img: Carousel2,
    title: 'Physical Therapy',
    desc: 'Our experienced physical therapists are here to help you regain mobility, strength, and functionality.',
    link: '/book',
  },
  {
    img: Carousel3,
    title: 'Counseling',
    desc: 'Our services are designed to bring high-quality counseling to the comfort and convenience of our patients.',
    link: '/book',
  },
]

const Carousel = () => {
  const pagination = {
    el: '#bullets',
    bulletClass:
      'cursor-pointer h-3 w-3 rounded-full bg-black block bg-gray-400',
    bulletActiveClass: '!bg-white',
    clickable: true,
  }

  return (
    <>
      <Swiper
        className='w-full max-w-7xl mx-auto h-[310px] md:h-[450px] md:rounded-3xl overflow-hidden relative hero'
        pagination={pagination}
        navigation={{
          nextEl: '.swiper-hero-next',
          prevEl: '.swiper-hero-prev',
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        loop={true}
      >
        {slides.map((el, ind) => (
          <SwiperSlide
            className='after:bg-gradient-to-r after:from-white/0 after:from-50% after:via-[#707070bb] after:via-[70%] after:to-[#474747] after:to-100% after:w-full after:h-full relative after:absolute after:top-0 after:left-0 bg-[#D9D9D9]'
            key={ind}
          >
            <div className='relative w-full h-[310px] md:h-[450px]'>
              <Image
                src={el.img}
                alt={el.title}
                fill
                loading={ind === 0 ? 'eager' : 'lazy'}
                priority={ind === 0 ? true : false}
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                className={ind === 0 ? 'lg:max-w-5xl' : ''}
              />
            </div>
            <div className='absolute right-6 md:right-12 lg:right-24 z-10 bottom-28 md:bottom-36 text-white max-w-36 md:max-w-56 lg:max-w-80'>
              <h3 className='mb-2 md:mb-5 font-medium text-lg md:text-[42px]'>
                {el.title}
              </h3>
              <p className='mb-7 font-medium text-[10px] md:text-base'>
                {el.desc}
              </p>
              <Link href={el.link}>
                <Button
                  variant='outline'
                  className='float-right text-xs md:!text-lg'
                  size='sm'
                >
                  Book now
                </Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <div className='controls absolute !bottom-6 z-10 right-0 pr-6 md:pr-24'>
          <div className='hero-navigation flex flex-row gap-3 md:mb-7 text-white'>
            <Button
              size='iconSM'
              className='swiper-hero-prev'
              variant='outline'
            >
              <FaChevronLeft />
            </Button>
            <Button
              size='iconSM'
              className='swiper-hero-next'
              variant='outline'
            >
              <FaChevronRight />
            </Button>
          </div>
          <div
            id='bullets'
            className='hidden md:flex flex-row gap-2 justify-end'
          ></div>
        </div>
      </Swiper>
    </>
  )
}

export default Carousel
