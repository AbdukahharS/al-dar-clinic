import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

import Button from '@/components/Button'
import dumbbell from '@/public/images/products/dumbbell.webp'
import sponge from '@/public/images/products/sponge.webp'
import Animated from '@/components/Animated'
import cod from '@/public/images/cod.webp'

const cartItems = [
  {
    id: 1,
    name: 'Dumbbell 6Kgs',
    img: dumbbell,
    price: 100,
    category: 'PHYSIOTHERAPY TOOLS',
    quantity: 1,
  },
  {
    category: 'PHYSIOTHERAPY TOOLS',
    id: 2,
    name: 'Sponge Dumbbell',
    img: sponge,
    price: 250,
    quantity: 1,
  },
]

const Payment = () => {
  const [chosenMethod, setChosenMethod] = useState()
  const router = useRouter()

  const methods = Array(2).fill({
    img: cod,
    name: 'Cash on Delivery',
  })

  const handleConfirm = (e) => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ zIndex: -20, opacity: 0 }}
          animate={
            t.visible
              ? { zIndex: 100, opacity: 1 }
              : { zIndex: -20, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className='fixed -top-4 -left-4 w-screen !h-screen bg-black/60 flex items-center justify-center p-5'
        >
          <motion.div
            initial={{ y: 15 }}
            animate={t.visible ? { y: 0 } : { y: 15 }}
            className='w-full sm:w-[70%] max-w-5xl md:mx-auto bg-white rounded-2xl p-3 pb-12 md:p-8 md:pb-20'
          >
            <Button
              size='icon'
              variant='ghost'
              onClick={() => toast.dismiss(t.id)}
              className='ml-auto'
            >
              <FaCircleXmark className='text-primary text-4xl' />
            </Button>
            <div>
              <FaCircleCheck className='text-primary text-[156px] md:text-[190px] xl:text-[238px] mx-auto' />
            </div>
            <p className='text-xl font-medium md:text-2xl xl:text-4xl text-center py-12 md:mt-18 tracking-wide'>
              Your Order is Confirmed
            </p>
            <div className='flex flex-row items-center justify-center gap-4 md:hidden'>
              <Link href='/profile/orders/1'>
                <Button
                  variant='outline'
                  className='text-primary border-primary'
                  size='sm'
                  onClick={() => toast.dismiss(t.id)}
                >
                  Order details
                </Button>
              </Link>
              <Button size='sm' onClick={() => toast.dismiss(t.id)}>
                Continue
              </Button>
            </div>
            <div className='hidden flex-row items-center justify-center gap-8 md:flex'>
              <Link href='/profile/orders/1'>
                <Button
                  variant='outline'
                  className='text-primary border-primary'
                  onClick={() => toast.dismiss(t.id)}
                >
                  Order details
                </Button>
              </Link>
              <Button onClick={() => toast.dismiss(t.id)}>Continue</Button>
            </div>
          </motion.div>
        </motion.div>
      ),
      { duration: Infinity }
    )
  }

  return (
    <div className='px-3 w-full max-w-7xl mx-auto py-9 md:py-20'>
      <div>
        <div className='flex flex-row items-center gap-4 md:gap-5'>
          <Button
            variant='outline'
            size='icon'
            className='hidden md:flex'
            onClick={() => router.back()}
          >
            <FaArrowLeft />
          </Button>
          <Button
            variant='outline'
            size='iconSM'
            className='md:hidden'
            onClick={() => router.back()}
          >
            <FaArrowLeft />
          </Button>
          <h1 className='font-medium text-xl'>
            Provide Your Shipping Information
          </h1>
        </div>
        <h2 className='text-sm ml-[50px] md:ml-[68px]'>
          Check Your Information Before You Continue
        </h2>
      </div>
      <Animated className='flex flex-row items-center max-w-xl gap-1 mx-auto w-full py-12 md:py-16'>
        <div className='h-1 w-[calc((100%-114px)/6)] bg-green-500 rounded-full'></div>
        <div className='w-[30px] h-[30px] border-[7px] rounded-full border-green-500 relative'>
          <span className='absolute -bottom-3 left-1/2 translate-y-full -translate-x-1/2 text-sm text-gray-700'>
            Cart
          </span>
        </div>
        <div className='h-1 w-[calc((100%-114px)/3)] bg-green-500 rounded-full'></div>
        <div className='w-[30px] h-[30px] rounded-full relative border-[7px] border-green-500'>
          <span className='absolute -bottom-3 left-1/2 translate-y-full -translate-x-1/2 text-sm text-gray-700'>
            Checkout
          </span>
        </div>
        <div className='h-1 w-[calc((100%-114px)/3)] bg-green-500 rounded-full'></div>
        <div className='w-[30px] h-[30px] rounded-full bg-gray-300 relative border-[7px] border-gray-300'>
          <span className='absolute -bottom-3 left-1/2 translate-y-full -translate-x-1/2 text-sm text-gray-700'>
            Payment
          </span>
        </div>
        <div className='h-1 w-[calc((100%-114px)/6)] bg-gray-300 rounded-full'></div>
      </Animated>
      <div className='flex flex-col md:flex-row gap-7'>
        <div className='w-full md:w-[calc(70%-14px)]'>
          <div className='w-full border rounded-2xl'>
            <div className='flex flex-row items-center justify-between px-3 md:px-6 pt-7 pb-3 border-b'>
              <h3 className='font-medium'>Select Payment Method</h3>
            </div>
            <div className='px-[11.5px] py-7 md:px-6 flex flex-col'>
              {methods.map((el, i) => (
                <div
                  key={i}
                  className={`w-full py-4 px-5 cursor-pointer flex flex-row items-center gap-5 md:gap-8 text-xl md:text-2xl font-medium ${
                    chosenMethod === i && 'bg-blue-300/20 rounded-xl'
                  }`}
                  onClick={() => setChosenMethod(i)}
                >
                  <Image
                    src={el.img}
                    alt={el.name}
                    loading='lazy'
                    width={88}
                    height={52}
                  />
                  <h4>{el.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Animated className='w-full md:w-[calc(30%-14px)] border rounded-lg h-fit'>
          <div className='px-3 md:px-6 pt-7 pb-3 border-b'>
            <h3 className='text-center font-medium'>Order Summary</h3>
          </div>
          <div className='px-[11.5px] py-7 md:px-6'>
            {cartItems.map((el, i) => (
              <div
                key={i}
                className={`w-full flex flex-row gap-4 items-stretch p-5 pt-6 `}
              >
                <Image
                  src={el.img}
                  alt={el.name}
                  width={58}
                  height={58}
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
                    <p className='text-[10px]'>Quantity: {el.quantity}</p>
                  </div>
                  <div className='flex flex-col justify-end'>
                    <p className='text-xs font-medium'>Dhs {el.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='border-t border-gray-600 py-2 px-4 flex flex-row items-center justify-between mx-[11.5px] mb-4 md:mx-6'>
            <p className='font-semibold text-gray-700'>Total</p>
            <p className='font-semibold text-gray-700'>
              Dhs{' '}
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </p>
          </div>
        </Animated>
      </div>
      <Animated className='w-full md:w-[calc(70%-14px)] flex flex-row items-center justify-between mt-8'>
        <Link href='/order/checkout'>
          <Button variant='outline' className='border-primary text-primary'>
            Back to Checkout
          </Button>
        </Link>
        <Button onClick={handleConfirm}>Confirm Order</Button>
      </Animated>
    </div>
  )
}

export default Payment
