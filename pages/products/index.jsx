import React, { useEffect, useState } from 'react'

import Card from '@/components/Card'
import b2b from '@/public/images/b2b.webp'
import b2c from '@/public/images/b2c.webp'
import Animated from '@/components/Animated'
import axios from 'axios'

const ProductsHome = () => {
  const [business, setBusiness] = useState([])

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('/business')
      setBusiness(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization']
    ) {
      fetchBusinesses()
    }
  }, [axios.defaults.baseURL, axios.defaults.headers.common['Authorization']])
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
        {business
          .filter((el) => el.orderType === 'BUY')
          .map((el) => (
            <Card
              data={{
                name: el.name,
                img: el.image.original,
                link: '/products/buy/' + el.id,
              }}
              key={el.id}
            />
          ))}
      </div>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-10 md:mt-14'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>RENT PRODUCTS</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        {business
          .filter((el) => el.orderType === 'RENT')
          .map((el) => (
            <Card
              data={{
                name: el.name,
                img: el.image.original,
                link: '/products/rent/' + el.id,
              }}
              key={el.id}
            />
          ))}
        {/* <Card data={{ name: 'B2B', img: b2b, link: '/products/rent/b2b' }} /> */}
        {/* <Card data={{ name: 'B2C', img: b2c, link: '/products/rent/b2c' }} /> */}
      </div>
    </div>
  )
}

export default ProductsHome
