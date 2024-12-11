import { FaCircleInfo } from 'react-icons/fa6'

import Header from '@/components/layout/Header'
import Link from 'next/link'

const orders = [
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'pending',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'rejected',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'confirmed',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'on-the-way',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'delivered',
    payment: 'Paid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'cancelled',
    payment: 'Unpaid',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
]

const StatusBar = ({ status }) => {
  let style
  switch (status) {
    case 'pending':
      style = 'border-[#FFCE09] text-[#FFCE09]'
      break
    case 'rejected':
      style = 'border-[#AE4229] text-[#AE4229]'
      break
    case 'confirmed':
      style = 'border-[#FFAE00] text-[#FFAE00]'
      break
    case 'on-the-way':
      style = 'border-[#AC43FC] text-[#AC43FC]'
      break
    case 'delivered':
      style = 'border-[#58C57D] text-[#58C57D]'
      break
    case 'cancelled':
      style = 'border-[#AE4229] text-[#AE4229]'
      break

    default:
      break
  }
  return (
    <div className={`px-4 py-1 border rounded-lg w-fit mx-auto ${style}`}>
      {status.replace(/-/g, ' ').charAt(0).toUpperCase() +
        status.replace(/-/g, ' ').slice(1)}
    </div>
  )
}

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
