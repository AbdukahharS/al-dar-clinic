import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'

import Header from '@/components/layout/Header'

const orders = [
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'Requested',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'Cancelled',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'Placed',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'OnDelivery',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'Delivered',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'Returned',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
]

const Orders = () => {
  return (
    <div>
      <Header pageTitle='Order History' />
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto text-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Order ID
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Products
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Status
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
            {orders.map((order, index) => (
              <tr key={index} className='border'>
                <td className='px-3 py-4 whitespace-nowrap'>
                  {order.orderId}
                  <p className='text-xs'>{order.timestamp}</p>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.products}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <div className='border rounded-lg w-fit p-2 px-4 text-gray-500'>
                    {order.status.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.amount}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <Link href={`/profile/orders/${order.orderId}`}>
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

export default Orders
