import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'

import Header from '@/components/layout/Header'
import { StatusBar } from '../orders'

const rentalOrders = [
  {
    orderId: '1010246',
    productName: 'Dumbbell',
    quantity: 2,
    status: 'pending',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    productName: 'Dumbbell',
    quantity: 2,
    status: 'rejected',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    productName: 'Gym Ball',
    quantity: 3,
    status: 'confirmed',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    productName: 'Soft Dumbbell',
    quantity: 4,
    status: 'on-the-way',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    productName: 'Weight Ball',
    quantity: 6,
    status: 'delivered',
    payment: 'Paid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    productName: 'Weight Ball',
    quantity: 6,
    status: 'cancelled',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
]

const Rental = () => {
  return (
    <div className=' md:w-[calc(100%+(100vw-1280px)/2)]'>
      <Header pageTitle='Rental History' />
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto text-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Order ID
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Product Name
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Quantity
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Status
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Payment
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Amount
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rentalOrders.map((order, index) => (
              <tr key={index} className='border'>
                <td className='px-3 py-4 whitespace-nowrap'>
                  {order.orderId}
                  <p className='text-xs'>{order.timestamp}</p>
                </td>
                <td className='px-3 py-4 whitespace-nowrap'>
                  {order.productName}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.quantity}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <StatusBar status={order.status} />
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <div
                    className={`px-2 py-1 rounded-full w-fit ${
                      order.payment !== 'Paid'
                        ? 'bg-red-300/30 text-red-500'
                        : 'bg-green-300/30 text-green-500'
                    }`}
                  >
                    {order.payment}
                  </div>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.amount}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <Link href={`/profile/rental/${order.orderId}`}>
                    <FaCircleInfo className='mx-auto text-xl' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-between mt-7 md:px-4'>
        <p className='text-gray-400'>Showing 1 to 6 of 30 results</p>
        <div className='flex flex-row items-center gap-2'>
          <button className='w-7 h-7 flex items-center justify-center rounded-full text-white bg-primary cursor-pointer'>
            1
          </button>
          <button className='w-7 h-7 flex items-center justify-center rounded-full text-primary border border-primary cursor-pointer'>
            2
          </button>
          <span>....</span>
          <button className='w-7 h-7 flex items-center justify-center rounded-full text-primary border border-primary cursor-pointer'>
            5
          </button>
        </div>
      </div>
    </div>
  )
}

export default Rental
