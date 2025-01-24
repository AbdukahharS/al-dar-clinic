import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaCircleInfo, FaRotateRight, FaUser } from 'react-icons/fa6'

import Button from '@/components/Button'
import axios from 'axios'
import toast from 'react-hot-toast'
import Image from 'next/image'

const Users = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [sort, setSort] = useState('asc')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10
  const searchParams = useSearchParams()

  const fetchUsers = async () => {
    try {
      const { data } = await axios.post('/users/filter', {
        page,
        limit,
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
    const storedSort = sessionStorage.getItem('userSort')
    if (storedSort) setSort(storedSort)
    setPage(Number(searchParams.get('page')) || 1)
  }, [searchParams])

  useEffect(() => {
    if (axios.defaults.headers.common['Authorization']) {
      fetchUsers()
    }
    sessionStorage.setItem('userSort', sort)
  }, [sort, page, axios.defaults.headers.common['Authorization']])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>User Management</h1>
        <div className='flex items-center gap-4'>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
            }}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
          <Button
            className='bg-white !text-primary rounded-lg flex items-center flex-row gap-2'
            onClick={() => router.refresh()}
          >
            <FaRotateRight />
            Refresh
          </Button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto text-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>No</th>
              {/* <th className='px-4 py-5 font-medium whitespace-nowrap'>DP</th> */}
              <th className='px-4 py-5 font-medium whitespace-nowrap'>ID</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Email</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Phone</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={index} className='border'>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {(page - 1) * 10 + index + 1}
                </td>
                {/* <td className='px-3 py-4 whitespace-nowrap'>
                  {order.image?.thumbnail ? (
                    <Image
                      src={order.image.thumbnail}
                      title={order.name}
                      loading='lazy'
                      width={40}
                      height={40}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  ) : (
                    <div className='flex items-center justify-center w-10 h-10 mx-auto bg-primary text-white rounded-full text-xl'>
                      <FaUser />
                    </div>
                  )}
                </td> */}
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.id}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.email}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.phone}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <Link href={`/admin/users/${order.id}`}>
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

export default Users
