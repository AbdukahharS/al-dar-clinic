'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { FaArrowLeft } from 'react-icons/fa6'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import Animated from '@/components/Animated'

const Category = () => {
  const params = useParams()
  const router = useRouter()

  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await axios.post('/products/category', {
        categoryId: params.category,
      })

      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCategory = async () => {
    try {
      const res = await axios.get('/category/' + params.category)

      setCategory(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization'] &&
      params?.category
    ) {
      fetchProducts()
      fetchCategory()
    }
  }, [
    axios.defaults.baseURL,
    axios.defaults.headers.common['Authorization'],
    params,
  ])

  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100% pt-12 md:pt-16'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-4 md:gap-12 w-full max-w-7xl mx-auto px-7'
      >
        <Button
          onClick={() => router.back()}
          variant='outline'
          size='iconSM'
          className='border-black'
        >
          <FaArrowLeft className=' text-black' />
        </Button>
        <h2 className='font-medium text-xl md:text-3xl'>
          {category?.name?.toLocaleUpperCase()}
        </h2>
        <div className='bg-primary hidden md:block h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row md:flex-wrap gap-20 justify-center items-center w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        {products
          .filter((el) => el.productType === 'RENT')
          .map((el, i) => (
            <ProductCard
              key={i}
              product={{
                id: el.id,
                name: el.name,
                img: el.images[0].original,
                price: `${el.rentPrice[Object.keys(el.rentPrice)[0]]}/day`,
                link: `/products/${el.productType.toLocaleLowerCase()}/${
                  params?.model
                }/${params?.category}/${el.id}`,
              }}
            />
          ))}
      </div>
    </div>
  )
}

export default Category
