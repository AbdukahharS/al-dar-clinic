import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

const Orders = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const searchParams = useSearchParams()
  const limit = 10

  const fetchOrders = async () => {
    try {
      const { data } = await axios.post('/order/all', {
        page,
        limit,
      })

      console.log(data.data)

      setTotal(data.total)
      setData(data.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong!'
      )
      console.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong!'
      )
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page])

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1)
  }, [searchParams])

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
            {data?.length ? (
              data.map((order, index) => (
                <tr key={index} className='border'>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    {order.id}
                    <p className='text-xs'>{order.timestamp}</p>
                  </td>
                  <td className='px-3 py-4 text-center whitespace-nowrap'>
                    {order.quantity?.length}
                  </td>
                  <td className='px-3 py-4 text-center whitespace-nowrap'>
                    <div className='border mx-auto rounded-lg w-fit p-2 px-4 text-gray-500'>
                      {order.orderStatus.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </td>
                  <td className='px-3 py-4 text-center whitespace-nowrap'>
                    {order.total}
                  </td>
                  <td className='px-3 py-4 text-primary whitespace-nowrap'>
                    <Link href={`/profile/orders/${order.id}`}>
                      <FaCircleInfo className='mx-auto text-xl' />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center py-4'>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-between my-7 md:px-4'>
        <p className='text-gray-400'>
          Showing{' '}
          {total === 0
            ? '0'
            : `${(page - 1) * limit + 1} to ${Math.min(
                page * limit,
                total
              )}`}{' '}
          of {total} results
        </p>
        <div className='flex flex-row items-center gap-2'>
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
            .filter((pageNumber) => pageNumber !== page)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => router.push('/admin/users/?page=' + pageNumber)}
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
