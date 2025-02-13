import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import { useSearchParams } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Rental = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10
  const searchParams = useSearchParams()

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1)
  }, [searchParams])

  const fetchRentals = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/rent/all', {
        page,
        limit,
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRentals()
  }, [page])

  return (
    <div>
      <Header pageTitle='Rental History' />
      <div className='overflow-x-auto max-w-full'>
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
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Price</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? ( // Show loader when loading
              <tr>
                <td colSpan='5' className='text-center py-6'>
                  <div className='flex justify-center items-center'>
                    <AiOutlineLoading3Quarters className='animate-spin h-10 w-10 text-primary' />
                  </div>
                </td>
              </tr>
            ) : data?.length ? (
              data.map((order, index) => (
                <tr key={index} className='border'>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    {order.id}
                    <p className='text-xs'>{order.timestamp}</p>
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-center'>
                    {order.product.name}
                  </td>
                  <td className='px-3 py-4 text-center whitespace-nowrap'>
                    {order.quantity}
                  </td>
                  <td className='px-3 py-4 text-center whitespace-nowrap'>
                    <div className='border mx-auto rounded-lg w-fit p-2 px-4 text-gray-500'>
                      {order.orderStatus.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </td>
                  <td className='px-3 py-4 text-center whitespace-nowrap'>
                    $ {order.product.rentPrice[order.weightInKg]}
                  </td>
                  <td className='px-3 py-4 text-primary whitespace-nowrap'>
                    <Link href={`/profile/rental/${order.id}`}>
                      <FaCircleInfo className='mx-auto text-xl' />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
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
                onClick={() =>
                  router.push('/profile/rental/?page=' + pageNumber)
                }
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

export default Rental
