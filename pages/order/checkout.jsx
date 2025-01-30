import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaPencil, FaCirclePlus } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import Image from 'next/image'

import Button from '@/components/Button'
import Animated from '@/components/Animated'
import Address from '@/components/Address'
import Link from 'next/link'
import useCart from '@/hooks/useCart'
import axios from 'axios'
import toast from 'react-hot-toast'

const Checkout = () => {
  const [chosenAddress, setChosenAddress] = useState(null)
  const [chosenBilling, setChosenBilling] = useState(null)
  const [open, setOpen] = useState(false)
  const [sameBilling, setSameBilling] = useState(true)
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState(null)
  const router = useRouter()
  const { items, totalPrice } = useCart()

  const fetchAdresses = async () => {
    try {
      const res = await axios.get('/address/all')

      setAddresses(res.data.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          'Something went wrong. Please, reload the page!'
      )
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization']
    ) {
      fetchAdresses()
    }
  }, [axios.defaults, axios.defaults.headers.common['Authorization']])

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
        <div className='w-[30px] h-[30px] rounded-full bg-gray-300 relative border-[7px] border-gray-300'>
          <span className='absolute -bottom-3 left-1/2 translate-y-full -translate-x-1/2 text-sm text-gray-700'>
            Checkout
          </span>
        </div>
        <div className='h-1 w-[calc((100%-114px)/3)] bg-gray-300 rounded-full'></div>
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
              <h3 className='font-medium'>Shipping Address</h3>
              <div className='flex flex-row items-center gap-2 md:gap-6'>
                {chosenAddress && (
                  <button
                    onClick={() => {
                      setAddress(chosenAddress)
                      setOpen(true)
                    }}
                    className='bg-green-200/30 text-green-500 text-xs md:text-base flex flex-row items-center gap-1 md:gap-2 rounded-lg py-1 px-[6px] transition-all duration-200 hover:scale-110'
                  >
                    <FaPencil /> Edit
                  </button>
                )}
                <button
                  onClick={() => setOpen(true)}
                  className='bg-blue-200/30 text-blue-500 text-xs md:text-base flex flex-row items-center gap-1 md:gap-2 rounded-lg py-1 px-[6px] transition-all duration-200 hover:scale-110'
                >
                  <FaCirclePlus /> Add New
                </button>
              </div>
            </div>
            <div className='px-[11.5px] py-7 md:px-6 flex flex-col md:flex-row md:flex-wrap gap-4'>
              {addresses.map((el, i) => (
                <div
                  key={i}
                  className={`w-[calc(50%-8px)] py-4 px-5 border rounded-xl cursor-pointer ${
                    chosenAddress?.id === el.id &&
                    ' border-primary bg-primary/10'
                  }`}
                  onClick={() => setChosenAddress(el)}
                >
                  <p>{el.fullname}</p>
                  <p>{el.number}</p>
                  <p>{el.email}</p>
                  <p>{el.city},</p>
                  <p>{el.state},</p>
                  <p>{el.country},</p>
                  <p>{el.street},</p>
                  <p>{el.postalCode}</p>
                </div>
              ))}
            </div>
          </div>
          <Animated className='flex flex-row gap-2 my-6 md:py-8'>
            <input
              type='checkbox'
              name='same-billing'
              id='same-billing'
              defaultChecked={sameBilling}
              onClick={() => setSameBilling(!sameBilling)}
              className='w-5 h-5'
            />
            <label htmlFor='same-billing'>
              Save Shipping Address as Billing Address
            </label>
          </Animated>
          <motion.div
            animate={
              sameBilling
                ? { height: 0, borderWidth: 0 }
                : { height: 'auto', borderWidth: '1px' }
            }
            transition={{ duration: 0.3 }}
            className='w-full border rounded-2xl overflow-hidden'
          >
            <div className='flex flex-row items-center justify-between px-3 md:px-6 pt-7 pb-3 border-b'>
              <h3 className='font-medium'>Billing Address</h3>
              <div className='flex flex-row items-center gap-2 md:gap-6'>
                {chosenBilling ? (
                  <button
                    onClick={() => {
                      setAddress(chosenBilling)
                      setOpen(true)
                    }}
                    className='bg-green-200/30 text-green-500 text-xs md:text-base flex flex-row items-center gap-1 md:gap-2 rounded-lg py-1 px-[6px] transition-all duration-200 hover:scale-110'
                  >
                    <FaPencil /> Edit
                  </button>
                ) : (
                  ''
                )}
                <button
                  onClick={() => setOpen(true)}
                  className='bg-blue-200/30 text-blue-500 text-xs md:text-base flex flex-row items-center gap-1 md:gap-2 rounded-lg py-1 px-[6px] transition-all duration-200 hover:scale-110'
                >
                  <FaCirclePlus /> Add New
                </button>
              </div>
            </div>
            <div className='px-[11.5px] py-7 md:px-6 flex flex-col md:flex-row md:flex-wrap gap-4'>
              {addresses.map((el, i) => (
                <div
                  key={i}
                  className={`w-[calc(50%-8px)] py-4 px-5 border rounded-xl cursor-pointer ${
                    chosenBilling?.id === el.id &&
                    'border-primary bg-primary/10'
                  }`}
                  onClick={() => setChosenBilling(el)}
                >
                  <p>{el.fullname}</p>
                  <p>{el.number}</p>
                  <p>{el.email}</p>
                  <p>{el.city},</p>
                  <p>{el.state},</p>
                  <p>{el.country},</p>
                  <p>{el.street},</p>
                  <p>{el.postal}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className='w-full md:w-[calc(30%-14px)] border rounded-lg h-fit'>
          <div className='px-3 md:px-6 pt-7 pb-3 border-b'>
            <h3 className='text-center font-medium'>Order Summary</h3>
          </div>
          <div className='px-[11.5px] py-7 md:px-6'>
            {items.map((el, i) => (
              <div
                key={i}
                className={`w-full flex flex-row gap-4 items-stretch p-5 pt-6 `}
              >
                <Image
                  src={el.product.images[0].thumbnail}
                  alt={el.product.name}
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
                      <p className='text-lg'>{el.product.name}</p>
                    </div>
                    <p className='text-[10px]'>Quantity: {el.quantity}</p>
                  </div>
                  <div className='flex flex-col justify-end'>
                    <p className='text-xs font-medium'>
                      Dhs {el.product.buyPrice[el.weightInKg]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='border-t border-gray-600 py-2 px-4 flex flex-row items-center justify-between mx-[11.5px] mb-4 md:mx-6'>
            <p className='font-semibold text-gray-700'>Total</p>
            <p className='font-semibold text-gray-700'>Dhs {totalPrice}</p>
          </div>
        </div>
      </div>
      <Animated className='w-full md:w-[calc(70%-14px)] flex flex-row items-center justify-between mt-8'>
        <Button variant='outline' className='border-primary text-primary'>
          Back to Cart
        </Button>
        {chosenAddress?.id && (
          <Link href={'/order/payment?address=' + chosenAddress?.id}>
            <Button>Save and Pay</Button>
          </Link>
        )}
      </Animated>
      <Address
        open={open}
        setOpen={setOpen}
        setAddresses={setAddresses}
        address={address}
        setAddress={setAddress}
      />
    </div>
  )
}

export default Checkout
