import Image from 'next/image'
import Link from 'next/link'

import Button from './Button'

const Card = ({ data }) => {
  if (!data) return null
  return (
    <div className='w-80 max-w-full'>
      <div className='relative w-full h-[280px]'>
        <Image
          src={data.img}
          alt={data.name}
          fill
          className='object-cover rounded-2xl shadow-[0px_5px_20px_0px_rgba(0,0,0,0.08)]'
        />
      </div>
      <div className='flex flex-row justify-between items-center mt-5'>
        <div>
          <h4 className='text-xl'>{data.name}</h4>
        </div>
        <div className='flex flex-col items-center gap-[6px]'>
          <Link href={data.link || `/datas/${data.id}`}>
            <Button size='sm' className='whitespace-nowrap'>
              {data.id ? 'Buy now' : 'Explore'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
