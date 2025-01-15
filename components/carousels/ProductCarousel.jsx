import Image from 'next/image'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import Button from '../Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

export default function ProductCarousel({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  if (!data) return null

  return (
    <>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={{
          nextEl: '.swiper-product-next',
          prevEl: '.swiper-product-prev',
          clickable: true,
        }}
        className='mySwiper2 shadow-[0px_5px_20px_0px_rgba(0,0,0,0.08)] overflow-hidden rounded-2xl relative w-[320px] !h-[320px] md:w-[560px] md:!h-[560px]'
      >
        {data.map((item, i) => (
          <SwiperSlide
            key={i}
            className='relative w-[320px] !h-[320px] md:w-[560px] md:!h-[560px]'
          >
            <Image
              src={item}
              alt={`Main carousel ${i + 1}`}
              fill
              loading='lazy'
            />
          </SwiperSlide>
        ))}
        <div className='flex flex-row absolute top-1/2 -translate-y-1/2 justify-between w-full z-20 left-0'>
          <Button
            size='iconSM'
            variant='outline'
            className='swiper-product-prev bg-white border-black'
          >
            <FaChevronLeft />
          </Button>
          <Button
            size='iconSM'
            variant='outline'
            className='swiper-product-next bg-white border-black'
          >
            <FaChevronRight />
          </Button>
        </div>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper mt-4 w-[320px] md:w-[560px]'
      >
        {data.map((item, i) => (
          <SwiperSlide
            key={i}
            className='relative w-[78px] !h-[78px] md:w-[112px] md:!h-[112px] bg-white border rounded-xl overflow-hidden'
          >
            <Image
              src={item}
              alt={`Secondary carousel ${i + 1}`}
              loading='lazy'
              fill
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
