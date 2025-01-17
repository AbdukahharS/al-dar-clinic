import { useEffect, useRef, useState } from 'react'
import { FaCircleInfo, FaRotateRight } from 'react-icons/fa6'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button'
import toast from 'react-hot-toast'
import axios from 'axios'

const orders = [
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

const Orders = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10
  const isInitialRender = useRef(true)

  const fetchOrders = async () => {
    try {
      const { data } = await axios.post('/order/filter', {
        page,
        limit,
        status: filter !== 'all' ? filter : undefined,
        sort,
      })

      setTotal(data.total)
      setData(data.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong. Please refresh the page!'
      )
    }
  }

  useEffect(() => {
    const storedFilter = sessionStorage.getItem('orderFilter')
    const storedSort = sessionStorage.getItem('orderSort')
    if (storedFilter) setFilter(storedFilter)
    if (storedSort) setSort(storedSort)
  }, [])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    fetchOrders()
    sessionStorage.setItem('orderFilter', filter)
    sessionStorage.setItem('orderSort', sort)
  }, [filter, sort, page])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Order Management</h1>
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
            {data.map((order, index) => (
              <tr key={index} className='border'>
                <td className='px-3 py-4 whitespace-nowrap text-center'>
                  {order.orderId}
                  <p className='text-xs'>{order.timestamp}</p>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.products}
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
                  <Link href={`/admin/orders/${order.orderId}`}>
                    <FaCircleInfo className='mx-auto text-xl' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-between my-7 md:px-4'>
        <p className='text-gray-400'>
          Showing{' '}
          {total === 0
            ? '0'
            : `${page * limit - 9} to ${page * limit - 10 + data.length}`}{' '}
          of {total} results
        </p>
        <div className='flex flex-row items-center gap-2'>
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
            .filter((pageNumber) => pageNumber !== page)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => router.push('/admin/orders/?page=' + pageNumber)}
                className={`w-7 h-7 flex items-center justify-center rounded-full ${
                  pageNumber === page
                    ? 'text-white bg-primary'
                    : 'text-primary border border-primary'
                } cursor-pointer`}
              >
                {pageNumber}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
