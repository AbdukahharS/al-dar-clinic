import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { FaCircleInfo, FaRotateRight } from 'react-icons/fa6'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '@/components/Button'

const Appointments = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.post('/appointments/filter', {
        page,
        limit,
        medium: filter !== 'all' ? filter.toUpperCase() : undefined,
        sort,
      })

      setTotal(data.total)
      setData(data.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          'Something went wrong. Please refresh the page!'
      )
    }
  }

  useEffect(() => {
    const storedFilter = sessionStorage.getItem('appointmentFilter')
    const storedSort = sessionStorage.getItem('appointmentSort')
    if (storedFilter) setFilter(storedFilter)
    if (storedSort) setSort(storedSort)
  }, [])

  useEffect(() => {
    fetchAppointments()
    sessionStorage.setItem('appointmentFilter', filter)
    sessionStorage.setItem('appointmentSort', sort)
  }, [filter, sort, page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const showingFrom = (page - 1) * limit + 1
  const showingTo = Math.min(page * limit, total)

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Appointment Management</h1>
        <div className='flex items-center gap-4'>
          <Button
            className='bg-white !text-primary rounded-lg flex items-center flex-row gap-2'
            onClick={() => router.refresh()}
          >
            <FaRotateRight />
            Refresh
          </Button>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='all'>No Filter</option>
            <option value='online'>Online</option>
            <option value='offline'>Offline</option>
          </select>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            value={sort}
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
                Patient Name
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Type</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Email</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Schedule
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
                  {order.fullname}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.medium}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.email}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <Link href={`/admin/appointments/${order.id}`}>
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
          Showing {data.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of{' '}
          {total} results
        </p>
        <div className='flex flex-row items-center gap-2'>
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
            .filter((pageNumber) => pageNumber !== page)
            .map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
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

export default Appointments
