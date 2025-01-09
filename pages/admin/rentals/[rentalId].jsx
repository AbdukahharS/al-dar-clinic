import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaArrowLeft } from 'react-icons/fa6'

import Animated from '@/components/Animated'
import dumbbell from '@/public/images/products/dumbbell.webp'
import Button from '@/components/Button'

const cartItems = [
  {
    id: 1,
    name: 'Dumbbell 6Kgs',
    img: dumbbell,
    price: 100,
    category: 'PHYSIOTHERAPY TOOLS',
    quantity: 1,
  },
]

const orderStatuses = [
  'Requested',
  'Placed',
  'PickedUp',
  'ForPacking',
  'Packed',
  'OnDelivery',
  'Delivered',
  'Complete',
  'ToReturn',
  'Returned',
  'Failed',
  'Cancelled',
]

const RentalOrderDetails = () => {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState('Packed')
  const [newStatus, setNewStatus] = useState(currentStatus)

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentStatus(newStatus)
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Rental Order Details</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <div className='text-center'>
          <p className='text-xl font-medium mb-3'>Thank you</p>
          <p>Your order status is as follows</p>
          <p className='text-sm'>
            <b>Order ID:</b> <span className='text-primary'># 1010246</span>
          </p>
        </div>
        <Animated className='flex flex-row items-center max-w-3xl gap-1 mx-auto !w-full py-12 md:py-16'>
          {orderStatuses.map((status, i) => (
            <React.Fragment key={i}>
              <div
                className={`${
                  status === currentStatus
                    ? 'w-[30px] h-[30px] border-8 border-green-500'
                    : i < orderStatuses.indexOf(currentStatus)
                    ? 'w-[20px] h-[20px] bg-green-500'
                    : 'w-[20px] h-[20px] bg-gray-300'
                } rounded-full relative group`}
              >
                <span
                  className={`${
                    status !== currentStatus &&
                    'opacity-0 group-hover:opacity-100'
                  } absolute ${
                    status === currentStatus
                      ? '-top-3 -translate-y-full'
                      : '-bottom-3 translate-y-full'
                  } left-1/2 -translate-x-1/2 text-xs md:text-sm text-gray-700 text-center transition-opacity`}
                >
                  {status.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              {i !== orderStatuses.length - 1 && (
                <div
                  className={`h-1 flex-1 ${
                    i < orderStatuses.indexOf(currentStatus)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  } rounded-full`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </Animated>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='w-full md:w-[calc(40%-12px)]'>
            <Animated className='border rounded-lg'>
              <table className='table-auto w-full text-sm'>
                <tbody>
                  <tr>
                    <td className='font-semibold px-4 pt-4 pb-2'>Order ID:</td>
                    <td className='px-4 pt-4 pb-2'>#1010146</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Rental Period:</td>
                    <td className='px-4 pt-4 pb-2'>10-10-24 to 12-10-24</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Order Date:</td>
                    <td className='px-4 py-2'>10-10-2024 09:09 AM</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Order Type:</td>
                    <td className='px-4 py-2'>Delivery</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Order Status:</td>
                    <td className='px-4 py-2'>{currentStatus}</td>
                  </tr>
                </tbody>
              </table>
            </Animated>
            <Animated className='border rounded-lg mt-5'>
              <h3 className='font-semibold text-center mb-6 mt-3'>
                Billing Address
              </h3>
              <table className='table-auto w-full text-sm'>
                <tbody>
                  <tr>
                    <td className='font-semibold px-4 pt-4 pb-2'>Name:</td>
                    <td className='px-4 pt-4 pb-2'>Sparsh Jaiswal</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Phone:</td>
                    <td className='px-4 py-2'>+8801253344</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Email:</td>
                    <td className='px-4 py-2'>sparsh@gmail.com</td>
                  </tr>
                  <tr>
                    <td className='font-semibold px-4 py-2'>Address:</td>
                    <td className='px-4 py-2'>
                      House 30, Road 1B, Block: A, Dubai 11
                    </td>
                  </tr>
                </tbody>
              </table>
            </Animated>
          </div>
          <div className='w-full md:w-[calc(60%-12px)] flex flex-col justify-between gap-6'>
            <Animated className='border rounded-lg h-fit'>
              <div className='px-3 md:px-6 pt-5'>
                <h3 className='text-center text-lg font-semibold'>
                  Order Summary
                </h3>
              </div>
              <div className='px-[11.5px] py-7 pt-5 md:px-6'>
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
            <form onSubmit={handleSubmit} className='mb-6'>
              <label htmlFor='status' className='block mb-2'>
                Change Order Status:
              </label>
              <select
                id='status'
                value={newStatus}
                onChange={handleStatusChange}
                className='border rounded p-2 mr-4'
              >
                {orderStatuses.map((status, i) => (
                  <option key={i} value={status}>
                    {status.replace(/([A-Z])/g, ' $1').trim()}
                  </option>
                ))}
              </select>
              <Button type='submit' variant='primary'>
                Update Status
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalOrderDetails
