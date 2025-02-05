import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaCircleXmark, FaExclamation } from 'react-icons/fa6'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { usePDF } from 'react-to-pdf'

import Header from '@/components/layout/Header'
import Animated from '@/components/Animated'
import Button from '@/components/Button'
import Receipt from '@/components/Receipt'
import useAuth from '@/hooks/useAuth'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const orderStatuses = [
  'Requested',
  'Placed',
  'PickedUp',
  'ForPacking',
  'Packed',
  'OnDelivery',
  'Delivered',
  'Complete',
  'Cancelled',
  'ToReturn',
  'Returned',
  'Failed',
]

const OrderDetails = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'receipt.pdf' })
  const params = useParams()
  const [order, setOrder] = useState({})
  const [currentStatus, setCurrentStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/order/${params.orderId}`)
      setOrder(res.data)
      console.log(res.data)

      setCurrentStatus(res.data.orderStatus)
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params?.orderId && axios.defaults.baseURL && isAuthenticated) {
      fetchOrder()
    }
  }, [params, axios.defaults.baseURL, isAuthenticated])

  const handleCancel = () => {
    const cancelOrder = async (id) => {
      if (loading) return
      setLoading(true)
      try {
        await axios.put(`/order/cancel/${order.id}`)
        toast.success('Order has been cancelled successfully')
        router.push('/profile/orders')
      } catch (error) {
        console.log(error)

        toast.error(error.message || 'Something went wrong')
      } finally {
        toast.dismiss(id)
        setLoading(false)
      }
    }
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
          className='absolute -top-4 -left-4 w-screen !h-screen bg-black/60 flex items-center justify-center p-5'
        >
          <motion.div
            initial={{ y: 15 }}
            animate={t.visible ? { y: 0 } : { y: 15 }}
            className='w-fit xl:w-full max-w-2xl md:mx-auto bg-white rounded-2xl p-3 pb-12 md:p-8 md:pb-20'
          >
            <Button
              size='icon'
              variant='ghost'
              onClick={() => toast.dismiss(t.id)}
              className='ml-auto'
            >
              <FaCircleXmark className='text-primary text-4xl mx-auto' />
            </Button>
            <div className='border-8 border-yellow-500 rounded-full w-fit mx-auto'>
              <FaExclamation className='text-yellow-500 text-[100px] md:text-[136px] lg:text-[180px] xl:text-[218px]' />
            </div>
            <p className='text-xl font-medium md:text-2xl xl:text-4xl text-center mt-12 md:mt-18 tracking-wide'>
              Are you sure?
            </p>
            <p className='text-center my-4 lg:my-8'>
              You want to cancel your order?
            </p>
            <div className='flex flex-row items-center justify-center gap-4 md:hidden'>
              <Button size='sm' onClick={() => cancelOrder(t.id)}>
                {loading ? 'Cancelling...' : 'Yes, Cancel it!'}
              </Button>
              <Button
                size='sm'
                variant='secondary'
                onClick={() => toast.dismiss(t.id)}
              >
                No, Don&apos;t Cancel
              </Button>
            </div>
            <div className='hidden flex-row items-center justify-center gap-8 md:flex'>
              <Button onClick={() => cancelOrder(t.id)}>
                {loading ? 'Cancelling...' : 'Yes, Cancel it!'}
              </Button>
              <Button variant='secondary' onClick={() => toast.dismiss(t.id)}>
                No, Don&apos;t Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ),
      { duration: Infinity }
    )
  }

  return (
    <div className='text-gray-700 md:rounded-2xl md:bg-white md:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] md:px-6 md:pb-10'>
      <Header pageTitle='Order Details' />
      {order.id ? (
        <>
          <Receipt order={order} refName={targetRef} user={user} />
          <div className='text-center'>
            <p className='text-xl font-medium mb-3'>Thank you</p>
            <p>Your order status is as follows</p>
            <p className='text-sm'>
              <b>Order ID:</b> <span className='text-primary'>#{order.id}</span>
            </p>
          </div>
          <Animated className='flex flex-row items-center max-w-3xl gap-[2px] md:gap-1 mx-auto !w-full py-12 md:py-16'>
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
                      <td className='font-semibold px-4 pt-4 pb-2'>
                        Order ID:
                      </td>
                      <td className='px-4 pt-4 pb-2'>#{order.id}</td>
                    </tr>
                    <tr>
                      <td className='font-semibold px-4 py-2'>Order Date:</td>
                      <td className='px-4 py-2'>
                        {' '}
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
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
                      <td className='px-4 pt-4 pb-2'>
                        {order.address.fullname}
                      </td>
                    </tr>
                    <tr>
                      <td className='font-semibold px-4 py-2'>Phone:</td>
                      <td className='px-4 py-2'>{order.address.phone}</td>
                    </tr>
                    <tr>
                      <td className='font-semibold px-4 py-2'>Email:</td>
                      <td className='px-4 py-2 break-all'>
                        {order.address.email}
                      </td>
                    </tr>
                    <tr>
                      <td className='font-semibold px-4 py-2'>Address:</td>
                      <td className='px-4 py-2 break-words'>
                        {order.address.street}
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
                  {order.quantity.map((el, i) => (
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
                              {el.product.productType}
                            </span>
                            <p className='text-lg'>{el.product.name}</p>
                          </div>
                          {/* <p className='text-[10px]'>
                            Quantity: {el.product.quantity}
                          </p> */}
                        </div>
                        {/* <div className='flex flex-col justify-end'>
                          <p className='text-xs font-medium'>
                            $ {el.product.price}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='border-t border-gray-600 py-2 px-4 flex flex-row items-center justify-between mx-[11.5px] mb-4 md:mx-6'>
                  <p className='font-semibold text-gray-700'>Total</p>
                  <p className='font-semibold text-gray-700'>$ {order.total}</p>
                </div>
              </Animated>
              <Animated className='flex flex-row items-center justify-between md:justify-end md:gap-6 md:hidden'>
                <Button size='sm' onClick={() => toPDF()}>
                  Download Receipt
                </Button>
                {!order.canCancelOrder || currentStatus === 'Cancelled' ? (
                  ''
                ) : (
                  <Button
                    size='sm'
                    variant='outline'
                    className='border-red-500 text-red-500'
                    onClick={handleCancel}
                  >
                    Cancel Order
                  </Button>
                )}
              </Animated>
              <Animated className='flex-row items-center justify-end gap-6 hidden md:flex'>
                <Button onClick={() => toPDF()}>Download Receipt</Button>
                {!order.canCancelOrder || currentStatus === 'Cancelled' ? (
                  ''
                ) : (
                  <Button
                    onClick={handleCancel}
                    variant='outline'
                    className='border-red-500 text-red-500'
                  >
                    Cancel Order
                  </Button>
                )}
              </Animated>
            </div>
          </div>
        </>
      ) : loading ? (
        <div className='py-10 flex items-center justify-center'>
          <AiOutlineLoading3Quarters className='animate-spin h-10 w-10' />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default OrderDetails
