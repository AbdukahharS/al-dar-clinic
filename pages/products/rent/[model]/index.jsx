'use client'

import { useParams } from 'next/navigation'

import Card from '@/components/Card'
import tools from '@/public/images/tools.webp'
import equipments from '@/public/images/equipments.webp'
import devices from '@/public/images/devices.webp'
import accessories from '@/public/images/accessories.webp'
import Animated from '@/components/Animated'

const Model = () => {
  const params = useParams()

  const categories = [
    {
      name: 'Physiotherapy Tools',
      img: tools,
      link: `/products/rent/${params?.model}/tools`,
    },
    {
      name: 'Physiotherapy Equipment',
      img: equipments,
      link: `/products/rent/${params?.model}/equipments`,
    },
    {
      name: 'Physiotherapy Devices',
      img: devices,
      link: `/products/rent/${params?.model}/devices`,
    },
    {
      name: 'Accessories',
      img: accessories,
      link: `/products/rent/${params?.model}/accessories`,
    },
  ]
  return (
    <div className='flex-1'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-12 md:mt-16'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>
          Rent {params?.model.toUpperCase() || 'B2C'}
        </h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className='flex flex-col md:flex-row md:flex-wrap gap-20 w-full max-w-7xl mx-auto px-7 mt-12 mb-20'>
        {categories.map((el, i) => (
          <Card key={i} data={el} />
        ))}
      </div>
    </div>
  )
}

export default Model
