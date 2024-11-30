import React from 'react'

import ProductCard from '@/components/ProductCard'
import b2b from '@/public/images/b2b.webp'
import b2c from '@/public/images/b2c.webp'

const ProductsHome = () => {
  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100%'>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16 md:mt-20'>
        <h2 className='font-medium text-3xl md:text-5xl'>BUY PRODUCTS</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className='flex flex-col md:flex-row gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        <ProductCard product={{ name: 'B2B', img: b2b, link: '#' }} />
        <ProductCard
          product={{ name: 'B2C', img: b2c, link: '/products/buy' }}
        />
      </div>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16 md:mt-20'>
        <h2 className='font-medium text-3xl md:text-5xl'>RENT PRODUCTS</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className='flex flex-col md:flex-row gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        <ProductCard product={{ name: 'B2B', img: b2b, link: '#' }} />
        <ProductCard
          product={{ name: 'B2C', img: b2c, link: '/products/rent' }}
        />
      </div>
    </div>
  )
}

export default ProductsHome
