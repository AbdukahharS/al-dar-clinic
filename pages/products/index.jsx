import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Card from '@/components/Card'
import Animated from '@/components/Animated'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ProductsHome = () => {
  const [business, setBusiness] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBusinesses = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/business')
      setBusiness(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (axios.defaults.baseURL) {
      fetchBusinesses()
    }
  }, [axios.defaults.baseURL])

  const renderProducts = (orderType) => {
    if (loading) {
      return (
        <AiOutlineLoading3Quarters className='animate-spin h-20 w-20 text-primary mx-auto' />
      )
    }
    const filteredBusiness = business.filter((el) => el.orderType === orderType)
    if (filteredBusiness.length === 0) {
      return (
        <p className='text-center text-xl md:text-4xl mx-auto'>Coming Soon</p>
      )
    }
    return filteredBusiness.map((el) => (
      <Card
        data={{
          name: el.name,
          img: el.image.original,
          link: `/products/${orderType.toLowerCase()}/${el.id}`,
        }}
        key={el.id}
      />
    ))
  }

  return (
    <div className='flex-1'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-10 md:mt-14'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>BUY PRODUCTS</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        {renderProducts('BUY')}
      </div>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-10 md:mt-14'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>RENT PRODUCTS</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        {renderProducts('RENT')}
      </div>
    </div>
  )
}

export default ProductsHome
