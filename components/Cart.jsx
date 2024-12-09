import { useState } from 'react'
import { FaCartShopping, FaCircleXmark, FaPlus, FaMinus } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Image from 'next/image'

import Button from './Button'
import dumbbell from '@/public/images/products/dumbbell.webp'
import sponge from '@/public/images/products/sponge.webp'
import empty from '@/public/images/empty-box.webp'

const Cart = () => {
  const [open, setOpen] = useState(false)

  const cartItems = [
    {
      id: 1,
      name: 'Dumbbell 6Kgs',
      img: dumbbell,
      price: 100,
      category: 'PHYSIOTHERAPY TOOLS',
    },
    {
      category: 'PHYSIOTHERAPY TOOLS',
      id: 2,
      name: 'Sponge Dumbbell',
      img: sponge,
      price: 250,
    },
  ]

  return (
    <>
      <Button
        variant='outline'
        size='icon'
        className='!text-primary !text-2xl !border-black hidden md:flex relative'
        onClick={() => setOpen(true)}
      >
        <FaCartShopping />
        {cartItems.length && (
          <div className='absolute bg-red-500 top-0 right-0 text-white text-xs flex w-4 h-4 items-center justify-center rounded-full'>
            {cartItems.length}
          </div>
        )}
      </Button>
      <Button
        variant='outline'
        size='iconSM'
        className='!text-primary !text-2xl !border-black md:hidden relative'
        onClick={() => setOpen(true)}
      >
        <FaCartShopping className='text-sm' />
        {cartItems.length && (
          <div className='absolute bg-red-500 top-0 right-0 text-white text-xs flex w-4 h-4 items-center justify-center rounded-full translate-x-1/4 -translate-y-1/4'>
            {cartItems.length}
          </div>
        )}
      </Button>
      <motion.div
        initial={{ opacity: 0, zIndex: -100 }}
        animate={
          open
            ? { opacity: 1, pointerEvents: 'auto', zIndex: 100 }
            : { opacity: 0, pointerEvents: 'none', zIndex: -100 }
        }
        transition={{ duration: 0.3 }}
        className='absolute top-0 left-0 w-full !h-screen bg-black/60 flex justify-end overflow-hidden'
      >
        <motion.div
          initial={{ y: 15 }}
          animate={open ? { y: 0 } : { y: 15 }}
          className='w-[100%] sm:max-w-sm bg-white flex flex-col'
        >
          <div className='p-6 pt-12 flex flex-row items-center justify-between border-b border-black'>
            <h2 className='text-2xl font-medium text-primary'>Shopping Cart</h2>
            <Button size='icon' variant='ghost' onClick={() => setOpen(false)}>
              <FaCircleXmark className='text-primary text-4xl' />
            </Button>
          </div>
          {cartItems.length ? (
            <>
              <div className='flex-1'>
                {cartItems.map((el, i) => (
                  <div
                    key={i}
                    className={`w-full flex flex-row gap-4 items-stretch p-5 pt-6 ${
                      i !== cartItems.length - 1 && 'border-b'
                    }`}
                  >
                    <Image
                      src={el.img}
                      alt={el.name}
                      width={80}
                      height={80}
                      loading='lazy'
                      className='bg-white rounded-2xl shadow-[0px_5px_20px_0px_rgba(0,0,0,0.08)]'
                    />
                    <div className='flex-1 flex flex-row items-stretch'>
                      <div className='flex-1 flex flex-col justify-between'>
                        <div className='flex-1 flex flex-col justify-start'>
                          <span className='text-[10px] font-medium'>
                            {el.category}
                          </span>
                          <p className='text-lg'>{el.name}</p>
                        </div>
                        <div className='rounded-full bg-gray-200/70 h-fit p-1 w-fit flex gap-2 flex-row items-center'>
                          <button
                            className={`text-[10px] inline-block p-[3px] cursor-pointer rounded-full text-white bg-black`}
                            disable={true ? 'true' : 'false'}
                            onClick={() => {}}
                          >
                            <FaMinus />
                          </button>
                          <span className='text-black text-xs'>1</span>
                          <button
                            className={`text-[10px] inline-block p-[3px] cursor-pointer rounded-full bg-black text-white`}
                            onClick={() => {}}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <div className='flex flex-col justify-between'>
                        <button className='bg-red-300/30 text-red-500 text-[10px] py-[3.5px] px-[9.5px] rounded-full transition-all duration-200 hover:scale-110'>
                          Remove
                        </button>
                        <p className='text-xs font-medium'>Dhs {el.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='pt-3 px-4 border-t pb-8'>
                <div className='flex flex-row items-center justify-between text-gray-700 font-semibold mb-3'>
                  <p>Total</p>
                  <p>Dhs 350</p>
                </div>
                <Button className='w-full'>Proceed to Checkout</Button>
              </div>
            </>
          ) : (
            <div className='flex-1 flex items-center'>
              <Image
                src={empty}
                alt='Empty box'
                loading='lazy'
                className='w-full'
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export default Cart
