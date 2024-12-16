import React from 'react'

import Card from '@/components/Card'
import b2b from '@/public/images/b2b.webp'
import b2c from '@/public/images/b2c.webp'
import Animated from '@/components/Animated'

const ProductsHome = () => {
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
        <Card data={{ name: 'B2B', img: b2b, link: '/products/buy/b2b' }} />
        <Card data={{ name: 'B2C', img: b2c, link: '/products/buy/b2c' }} />
      </div>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-10 md:mt-14'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>RENT PRODUCTS</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        <Card data={{ name: 'B2B', img: b2b, link: '/products/rent/b2b' }} />
        <Card data={{ name: 'B2C', img: b2c, link: '/products/rent/b2c' }} />
      </div>
    </div>
  )
}

export default ProductsHome
