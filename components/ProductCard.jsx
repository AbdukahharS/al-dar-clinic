import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Animated from './Animated'

function format(num) {
  return num % 1 === 0
    ? num.toLocaleString('en-US')
    : num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
}

const ProductCard = ({ product, rate }) => {
  if (!product) return null
  return (
    <Animated>
      <Link href={product.link || `/products/${product.id}`}>
        <motion.div
          className='w-64 max-w-full shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white p-2 rounded-2xl cursor-pointer'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
          }}
        >
          <motion.div
            className='relative w-full h-[280px] border-gray-300/30 rounded-2xl border-2 p-1 overflow-hidden'
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={product.img}
              alt={product.name}
              fill
              className='object-fit'
            />
          </motion.div>
          <div className='mt-5 mb-2 px-1'>
            <p className='text-lg'>{product.name}</p>
            <p className='font-semibold text-lg'>
              OMR {format(product.price * rate['Omání rial'])} / IQD{' '}
              {format(product.price * rate['Iraquí Dinar'])} / Dhs{' '}
              {format(product.price * rate['Dirham'])}
            </p>
          </div>
        </motion.div>
      </Link>
    </Animated>
  )
}

export default ProductCard
