import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import Carousel1 from '@/public/images/carousel 1.webp'
import Carousel3 from '@/public/images/counseling-short.webp'
import HomeCare from '@/public/images/home-care.webp'
import LongTerm from '@/public/images/long-term.webp'
import Physical from '@/public/images/physical-therapy.webp'
import Speech from '@/public/images/speech-and-swallow.webp'
import 'swiper/css'
import Button from '../Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Animated from '../Animated'

const TeamCard = ({ item }) => {
  return (
    <Animated className='rounded-2xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.1)] md:shadow-[0px_1px_16px_0px_rgba(0,0,0,0.2)] !h-[472px] max-w-[320px] mx-auto'>
      <Image
        src={item.image.original}
        alt={item.name}
        loading='lazy'
        height={320}
        width={320}
        className='shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] w-full bg-white object-cover rounded-2xl h-[320px]'
      />
      <h4 className='font-medium text-2xl text-[#151515] text-center mt-5 mb-2'>
        {item.name}
      </h4>
      <p className='text-center opacity-70 font-medium'>{item.position}</p>
      <p className='text-center opacity-90 font-medium mt-1'>
        {item.location?.name}
      </p>
    </Animated>
  )
}

const Carousel = () => {
     const [team, setTeam] = useState([])
    
      useEffect(() => {
        const fetchTeamMembers = async () => {
          try {
            const response = await axios.get('/team-member/all')
            setTeam(response.data.data)
          } catch (error) {
            console.error('Error fetching team members:', error)
          }
        }
    
        if (axios.defaults.baseURL) {
          fetchTeamMembers()
        }
      }, [axios.defaults.baseURL])
  return (
    <div className='w-full my-8 md:my-12 relative md:px-7'>
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
          700: {
            slidesPerView: 2, // Optional: 2 slides for tablets
            spaceBetween: 30, // Adjust space
          },
          1024: {
            slidesPerView: 3, // Restore to 3 slides for desktops
            spaceBetween: 52,
          },
        }}
      >
        {team.map((el, ind) => (
          <SwiperSlide
            key={ind}
          >
           <TeamCard key={ind} item={el} />
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
