'use client'

import { useParams, useRouter } from 'next/navigation'

import { FaArrowLeft } from 'react-icons/fa6'
import ProductCard from '@/components/ProductCard'
import dumbbell from '@/public/images/products/dumbbell.webp'
import sponge from '@/public/images/products/sponge.webp'
import dumbbellCase from '@/public/images/products/case.webp'
import handle from '@/public/images/products/handle-ball.webp'
import weight from '@/public/images/products/weight-ball.webp'
import kettle from '@/public/images/products/kettle.webp'
import Button from '@/components/Button'
import Animated from '@/components/Animated'

const Category = () => {
  const params = useParams()
  const router = useRouter()

  const products = [
    {
      id: 1,
      name: 'Dumbbell 6Kgs',
      img: dumbbell,
      price: 100,
      link: `/products/rent/${params?.model}/${params?.category}/1`,
    },
    {
      id: 2,
      name: 'Sponge Dumbbell',
      img: sponge,
      price: 250,
      link: `/products/rent/${params?.model}/${params?.category}/2`,
    },
    {
      id: 3,
      name: 'Portable Case 6 Dumbbells',
      img: dumbbellCase,
      price: 100,
      link: `/products/rent/${params?.model}/${params?.category}/3`,
    },
    {
      id: 4,
      name: 'Weight Ball with Handles',
      img: handle,
      price: 100,
      link: `/products/rent/${params?.model}/${params?.category}/4`,
    },
    {
      id: 5,
      name: 'Soft Weight Ball',
      img: weight,
      price: 100,
      link: `/products/rent/${params?.model}/${params?.category}/5`,
    },
    {
      id: 6,
      name: 'Kettle Dumbbel 2Kg',
      img: kettle,
      price: 100,
      link: `/products/rent/${params?.model}/${params?.category}/6`,
    },
  ]
  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100%'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-4 md:gap-12 w-full max-w-7xl mx-auto px-7 mt-12 md:mt-16'
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
          PHYSIOTHERAPY {params?.category.toUpperCase() || 'TOOLS'}
        </h2>
        <div className='bg-primary hidden md:block h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row md:flex-wrap gap-20 justify-center items-center w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        {products.map((el, i) => (
          <ProductCard key={i} product={el} />
        ))}
      </div>
    </div>
  )
}

export default Category
