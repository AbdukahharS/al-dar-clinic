import { useEffect, useRef, useState } from 'react'
import { FaCircleInfo, FaRotateRight } from 'react-icons/fa6'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'

const rentalOrders = [
  {
    orderId: '1010246',
    productName: 'Laptop',
    quantity: 2,
    status: 'Requested',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010247',
    productName: 'Smartphone',
    quantity: 3,
    status: 'Cancelled',
    amount: '$312.50',
    timestamp: '10:10 AM, 11-11-2024',
  },
  {
    orderId: '1010248',
    productName: 'Headphones',
    quantity: 1,
    status: 'Placed',
    amount: '$112.50',
    timestamp: '11:11 AM, 12-12-2024',
  },
  {
    orderId: '1010249',
    productName: 'Tablet',
    quantity: 4,
    status: 'Delivered',
    amount: '$412.50',
    timestamp: '12:12 PM, 01-01-2025',
  },
  {
    orderId: '1010250',
    productName: 'Camera',
    quantity: 5,
    status: 'Complete',
    amount: '$512.50',
    timestamp: '01:01 PM, 02-02-2025',
  },
  {
    orderId: '1010251',
    productName: 'Smartwatch',
    quantity: 6,
    status: 'Failed',
    amount: '$612.50',
    timestamp: '02:02 PM, 03-03-2025',
  },
  {
    orderId: '1010252',
    productName: 'Gaming Console',
    quantity: 2,
    status: 'PickedUp',
    amount: '$422.50',
    timestamp: '03:03 PM, 04-04-2025',
  },
  {
    orderId: '1010253',
    productName: 'Bluetooth Speaker',
    quantity: 3,
    status: 'ForPacking',
    amount: '$322.50',
    timestamp: '04:04 PM, 05-05-2025',
  },
  {
    orderId: '1010254',
    productName: 'Keyboard',
    quantity: 1,
    status: 'Packed',
    amount: '$122.50',
    timestamp: '05:05 PM, 06-06-2025',
  },
  {
    orderId: '1010255',
    productName: 'Monitor',
    quantity: 4,
    status: 'OnDelivery',
    amount: '$422.50',
    timestamp: '06:06 PM, 07-07-2025',
  },
  {
    orderId: '1010256',
    productName: 'Mouse',
    quantity: 5,
    status: 'ToReturn',
    amount: '$522.50',
    timestamp: '07:07 PM, 08-08-2025',
  },
  {
    orderId: '1010257',
    productName: 'Router',
    quantity: 6,
    status: 'Returned',
    amount: '$622.50',
    timestamp: '08:08 PM, 09-09-2025',
  },
]

const statusOptions = [
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

const RentalOrders = () => {
  const router = useRouter
  const [data, setData] = useState(rentalOrders)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')
  const isInitialRender = useRef(true) // Ref to track initial render

  useEffect(() => {
    const storedFilter = sessionStorage.getItem('rentalOrderFilter')
    const storedSort = sessionStorage.getItem('rentalOrderSort')

    if (storedFilter) setFilter(storedFilter)
    if (storedSort) setSort(storedSort)
  }, [])

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the effect on the initial render
      isInitialRender.current = false
      return
    }

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
    sessionStorage.setItem('rentalOrderFilter', filter)
    sessionStorage.setItem('rentalOrderSort', sort)
  }, [filter, sort])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Manage Rental Orders</h1>
        <div className='flex items-center gap-4'>
          <Button
            className='bg-white !text-primary rounded-lg flex items-center flex-row gap-2'
            onClick={() => router.refresh()}
          >
            <FaRotateRight className='text-xl my-[2px]' />
            <span className='hidden xl:inline'>Refresh</span>
          </Button>
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
            value={sort}
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
            {data.map(
              (order, index) =>
                index < 6 && (
                  <tr key={index} className='border'>
                    <td className='px-3 py-4 whitespace-nowrap text-center'>
                      {order.orderId}
                      <p className='text-xs'>{order.timestamp}</p>
                    </td>
                    <td className='px-3 py-4 whitespace-nowrap text-center'>
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
                )
            )}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-between mt-7 md:px-4'>
        <p className='text-gray-400'>
          Showing {data.length == 12 ? '6' : data.length} of{' '}
          {rentalOrders.length} results
        </p>
      </div>
    </div>
  )
}

export default RentalOrders
