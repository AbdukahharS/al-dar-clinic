import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import Carousel1 from '@/public/images/carousel 1.webp'
import Carousel3 from '@/public/images/carousel 3.webp'
import HomeCare from '@/public/images/home-care.webp'
import LongTerm from '@/public/images/long-term.webp'
import Physical from '@/public/images/physical-therapy.webp'
import Speech from '@/public/images/speech-and-swallow.webp'
import 'swiper/css'
import Button from '../Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const slides = [
  {
    img: HomeCare,
    title: 'Home Care',
    desc: 'Our Home Care services are designed to bring high-quality healthcare services to the comfort and convenience of your own home.',
  },
  {
    img: Physical,
    title: 'Physical Therapy',
    desc: 'Our experienced physical therapists are here to help you regain mobility, strength, and functionality.',
  },
  {
    img: Carousel3,
    title: 'Counseling',
    desc: 'Our services are designed to bring high-quality counseling to the comfort and convenience of our patients.',
  },
  {
    img: Carousel1,
    title: 'Occupational Therapy',
    desc: 'Our dedicated occupational therapists work closely with patients to develop strategies and interventions that address barriers',
  },
  {
    img: Speech,
    title: 'Speech and Swallow Therapy',
    desc: 'Our specialized speech therapists are adept at addressing communication and swallowing disorders',
  },
  {
    img: LongTerm,
    title: 'Long Term Care',
    desc: 'Our patient-centered care concentrates on relieving the distress of patients, using a holistic approach to rehabilitate in an engaging environment',
  },
]

const Carousel = () => {
  return (
    <div className='w-full mt-16 mb-14 relative md:px-7'>
      <Swiper
        className='w-full max-w-7xl !p-4 mx-auto overflow-visible services'
        slidesPerView={3}
        spaceBetween={52}
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-service-next',
          prevEl: '.swiper-service-prev',
          clickable: true,
        }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1, // 1 slide per view for screens smaller than 640px
            spaceBetween: 20, // Adjust space between slides if needed
          },
          768: {
            slidesPerView: 2, // Optional: 2 slides for tablets
            spaceBetween: 30, // Adjust space
          },
          1024: {
            slidesPerView: 3, // Restore to 3 slides for desktops
            spaceBetween: 52,
          },
        }}
      >
        {slides.map((el, ind) => (
          <SwiperSlide
            className='rounded-2xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.1)] md:shadow-[0px_1px_16px_0px_rgba(0,0,0,0.2)] !h-[472px]'
            key={ind}
          >
            <div className='w-full h-64 overflow-hidden rounded-2xl'>
              <Image
                src={el.img}
                alt={el.title}
                className='min-w-full w-fit h-fit -translate-y-[calc((100%-256px)/2)] min-h-full'
                loading='lazy'
              />
            </div>
            <div className='p-7'>
              <h3 className='text-center font-medium text-xl text-[#151515] pb-4'>
                {el.title}
              </h3>
              <p className='text-sm text-[#575757]'>{el.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='hero-navigation flex flex-row justify-center mt-8 gap-3 md:mb-7 md:absolute md:top-1/2 md:-translate-y-1/2 md:justify-between md:w-full z-20 left-0'>
        <Button size='iconSM' className='swiper-service-prev' variant='primary'>
          <FaChevronLeft />
        </Button>
        <Button size='iconSM' className='swiper-service-next' variant='primary'>
          <FaChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default Carousel
