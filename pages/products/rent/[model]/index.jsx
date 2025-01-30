'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Card from '@/components/Card'
import Animated from '@/components/Animated'
import Button from '@/components/Button'

const Model = () => {
  const params = useParams()
  const [categories, setCategories] = useState([])
  const [business, setBusiness] = useState({})
  const router = useRouter()

  const fetchCategories = async () => {
    try {
      const res = await axios.post('/category/byBusinessId', {
        businessId: params.model,
      })

      setCategories(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchBusiness = async () => {
    try {
      const res = await axios.get('/business/' + params.model)

      setBusiness(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization'] &&
      params.model
    ) {
      fetchCategories()
      fetchBusiness()
    }
  }, [
    axios.defaults.baseURL,
    axios.defaults.headers.common['Authorization'],
    params,
  ])

  return (
    <div className='flex-1'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-12 md:mt-16'
      >
        <Button
          onClick={() => router.back()}
          variant='outline'
          size='iconSM'
          className='border-black'
        >
          <FaArrowLeft className=' text-black' />
        </Button>
        <h2 className='font-medium text-2xl md:text-4xl'>
          Rent {business?.name}
        </h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row md:flex-wrap gap-20 w-full max-w-7xl mx-auto px-7 mt-12 mb-20'>
        {categories.map((el, i) => (
          <Card
            key={i}
            data={{
              name: el.name,
              img: el.image.original,
              link: `/products/rent/${params?.model}/${el.id}`,
            }}
          />
        ))}
      </div>
      {!categories.length && (
        <h1 className='text-center text-4xl font-semibold mb-40'>
          This business type has no categories!
        </h1>
      )}
    </div>
  )
}

export default Model
