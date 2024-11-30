'use client'

import { useParams } from 'next/navigation'

import Card from '@/components/Card'
import tools from '@/public/images/tools.webp'
import equipments from '@/public/images/equipments.webp'
import devices from '@/public/images/devices.webp'
import accessories from '@/public/images/accessories.webp'

const Model = () => {
  const params = useParams()

  const categories = [
    {
      name: 'Physiotherapy Tools',
      img: tools,
      link: `/products/buy/${params?.model}/tools`,
    },
    {
      name: 'Physiotherapy Equipment',
      img: equipments,
      link: `/products/buy/${params?.model}/equipments`,
    },
    {
      name: 'Physiotherapy Devices',
      img: devices,
      link: `/products/buy/${params?.model}/devices`,
    },
    {
      name: 'Accessories',
      img: accessories,
      link: `/products/buy/${params?.model}/accessories`,
    },
  ]
  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100%'>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16 md:mt-20'>
        <h2 className='font-medium text-3xl md:text-5xl'>
          BUY {params?.model.toUpperCase() || 'B2C'}
        </h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className='flex flex-col md:flex-row md:flex-wrap gap-20 w-full max-w-7xl mx-auto px-7 mt-16 mb-28'>
        {categories.map((el, i) => (
          <Card key={i} data={el} />
        ))}
      </div>
    </div>
  )
}

export default Model
