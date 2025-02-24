import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaCirclePlus,
} from 'react-icons/fa6'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import useAuth from '@/hooks/useAuth'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'

const GalleryManagement = () => {
  const [data, setData] = useState([])
  const [active, setActive] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const fileInputRef = useRef(null)
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [uploading, setUploading] = useState(false) // separate loading for uploads
  const [deleting, setDeleting] = useState(null) // track which item is being deleted

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('/gallery')
        const imageUrls = response.data.data
        setData([...imageUrls, ''])
      } catch (error) {
        console.error('Error fetching gallery images:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchGalleryImages()
    }
  }, [isAuthenticated])

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file && isAuthenticated) {
      const formData = new FormData()
      formData.append('file', file)
      setUploading(true) // set upload loading
      try {
        const response = await axios.post('/gallery/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        setData((prevData) => [response.data.data, ...prevData])
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        setUploading(false) // end upload loading
        if (fileInputRef.current) {
          fileInputRef.current.value = '' // Reset file input value
        }
      }
    }
  }

  const handleDelete = async (id) => {
    const removeFromList = async () => {
      setDeleting(id) // Set the id of the item being deleted
      try {
        await axios.delete('/gallery/' + id)
        const newData = data.filter((item) => item.id !== id)
        setData(newData)
      } catch (error) {
        console.error('Error deleting image:', error)
      } finally {
        setDeleting(null) // Reset deleting state
      }
    }
    confirm(
      'Delete Gallery Image',
      'Are you sure you want to delete this image?',
      'Delete',
      removeFromList
    )
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <AiOutlineLoading3Quarters className='animate-spin h-10 w-10' />
      </div>
    )
  }

  return (
    <div className='pb-20'>
      <div className='h-[96px]'></div>

      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <h1 className='text-2xl font-medium'>Gallery Management</h1>
        <Button
          className='bg-white !text-primary rounded-lg p-2'
          onClick={handleAddImage}
        >
          {uploading ? (
            <>
              <AiOutlineLoading3Quarters className='animate-spin text-primary inline' />{' '}
              Adding Gallery Image
            </>
          ) : (
            'Add Gallery Image'
          )}
        </Button>
      </div>

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

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
        className='gallery py-9 mt-10 md:mt-16 lg:mt-20 max-w-[1400px]'
      >
        {data.map((img, ind) => (
          <React.Fragment key={img?.id + ind}>
            {ind !== data.length - 1 ? (
              <SwiperSlide
                key={img?.id}
                className='!w-2/3 h-[470px] overflow-hidden rounded-3xl shadow-[0px_6px_20px_0px_rgba(0,0,0,0.15)] relative'
                onMouseEnter={() => setHoveredIndex(ind)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className='relative h-[300px] md:h-[470px]'
                  animate={{
                    filter:
                      ind === hoveredIndex || ind !== active
                        ? 'brightness(60%)'
                        : 'brightness(100%)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={img?.image.original}
                    alt={'Gallery item'}
                    fill
                    loading={ind === 0 ? 'eager' : 'lazy'}
                    priority={ind === 0}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </motion.div>

                {hoveredIndex === ind && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className='absolute inset-0 flex justify-center items-center'
                  >
                    {deleting === img?.id ? (
                      <AiOutlineLoading3Quarters className='animate-spin text-white text-5xl lg:text-[60px] bg-black/50 p-3 rounded-full' />
                    ) : (
                      <FaTrash
                        className='text-red-500 w-[60px] h-[60px] cursor-pointer'
                        onClick={() => handleDelete(img?.id)}
                      />
                    )}
                  </motion.div>
                )}
              </SwiperSlide>
            ) : (
              <SwiperSlide
                key={'add-slide'}
                className='!w-2/3 h-[470px] overflow-hidden rounded-3xl shadow-[0px_6px_20px_0px_rgba(0,0,0,0.15)] cursor-pointer'
                onClick={handleAddImage}
              >
                <motion.div
                  className='relative h-[300px] md:h-[470px] bg-primary flex justify-center items-center'
                  transition={{ duration: 0.3 }}
                >
                  {uploading ? (
                    <AiOutlineLoading3Quarters className='animate-spin text-white text-5xl lg:text-[68px]' />
                  ) : (
                    <FaCirclePlus className='text-white text-5xl lg:text-[68px]' />
                  )}
                </motion.div>
              </SwiperSlide>
            )}
          </React.Fragment>
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
    </div>
  )
}

export default GalleryManagement
