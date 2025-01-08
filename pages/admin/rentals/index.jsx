import { useEffect, useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'

const rentalOrders = [
  {
    orderId: '1010246',
    productName: 'Dumbbell',
    quantity: 2,
    status: 'Requested',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010247',
    productName: 'Dumbbell',
    quantity: 2,
    status: 'Cancelled',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010248',
    productName: 'Gym Ball',
    quantity: 3,
    status: 'Placed',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010249',
    productName: 'Soft Dumbbell',
    quantity: 4,
    status: 'OnDelivery',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010250',
    productName: 'Weight Ball',
    quantity: 6,
    status: 'Delivered',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010251',
    productName: 'Weight Ball',
    quantity: 6,
    status: 'Returned',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
]

const statusOptions = [
  'Requested',
  'Placed',
  'OnDelivery',
  'Delivered',
  'Returned',
  'Cancelled',
]

const RentalOrders = () => {
  const [data, setData] = useState(rentalOrders)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')

  useEffect(() => {
    const filteredData = rentalOrders.filter((order) => {
      if (filter === 'all') {
        return true
      } else {
        return order.status === filter
      }
    })

    const sortedData = [...filteredData].sort((a, b) => {
      if (sort === 'asc') {
        return new Date(a.timestamp) - new Date(b.timestamp)
      } else {
        return new Date(b.timestamp) - new Date(a.timestamp)
      }
    })

    setData(sortedData)
  }, [filter, sort])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Manage Rental Orders</h1>
        <div className='flex items-center gap-4'>
          <select
            id='statusFilter'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='mr-4 p-2 rounded-lg text-primary'
          >
            <option value='all'>All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace(/([A-Z])/g, ' $1').trim()}
              </option>
            ))}
          </select>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            onChange={(e) => setSort(e.target.value)}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>

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
                Amount
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
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
                  <div className='border mx-auto rounded-lg w-fit p-2 px-4 text-gray-500'>
                    {order.status.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.amount}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <Link href={`/admin/rentals/${order.orderId}`}>
                    <FaCircleInfo className='mx-auto text-xl' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-between mt-7 md:px-4'>
        <p className='text-gray-400'>
          Showing {data.length} of {rentalOrders.length} results
        </p>
      </div>
    </div>
  )
}

export default RentalOrders
