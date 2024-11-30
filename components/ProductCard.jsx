import Image from 'next/image'
import Link from 'next/link'


import Button from './Button'

const ProductCard = ({ product }) => {
  return (
    <div className='w-80 max-w-full'>
      <div className='relative w-full h-[280px]'>
        <Image
          src={product.img}
          alt={product.name}
          fill
          className='object-cover rounded-2xl shadow-[0px_5px_20px_0px_rgba(0,0,0,0.08)]'
        />
      </div>
      <div className='flex flex-row justify-between items-center mt-5'>
        <div>
          {product.price && <b>Dhs {product.price}</b>}
          <h4 className='text-xl'>{product.name}</h4>
        </div>
        <div className='flex flex-col items-center gap-[6px]'>
          <Link href={product.link || `/products/${product.id}`}>
            <Button size='sm' className='whitespace-nowrap'>
              {product.id ? 'Buy now' : 'Explore'}
            </Button>
          </Link>
          {product.id && (
            <Button variant='ghost' className='underline text-xs !p-0'>
              + Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
