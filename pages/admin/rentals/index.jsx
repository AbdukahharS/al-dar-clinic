import { useEffect, useRef, useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'

const rentalOrders = [
  {
    orderId: '1010246',
    products: '2 Product',
    status: 'Requested',
    amount: '$212.50',
    timestamp: '09:09 AM, 10-10-2024',
  },
  {
    orderId: '1010247',
    products: '3 Product',
    status: 'Cancelled',
    amount: '$312.50',
    timestamp: '10:10 AM, 11-11-2024',
  },
  {
    orderId: '1010248',
    products: '1 Product',
    status: 'Placed',
    amount: '$112.50',
    timestamp: '11:11 AM, 12-12-2024',
  },
  {
    orderId: '1010249',
    products: '4 Product',
    status: 'Delivered',
    amount: '$412.50',
    timestamp: '12:12 PM, 01-01-2025',
  },
  {
    orderId: '1010250',
    products: '5 Product',
    status: 'Complete',
    amount: '$512.50',
    timestamp: '01:01 PM, 02-02-2025',
  },
  {
    orderId: '1010251',
    products: '6 Product',
    status: 'Failed',
    amount: '$612.50',
    timestamp: '02:02 PM, 03-03-2025',
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
            {data.map((order, index) => (
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
