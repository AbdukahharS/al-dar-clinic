import { FaCircleInfo } from 'react-icons/fa6'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

import Header from '@/components/layout/Header'

const Appointments = () => {
  const searchParams = useSearchParams()
  const limit = 10
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [appointments, setAppointments] = useState([])

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`/appointments/user-appointments`, {
        params: { page, limit },
      })

      setTotal(data.total)
      setAppointments(data.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          'Something went wrong. Please refresh the page!'
      )
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [page])

  useEffect(() => {
    const queryPage = parseInt(searchParams.get('page'), 10) || 1
    setPage(queryPage)
  }, [searchParams])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const showingFrom = (page - 1) * limit + 1
  const showingTo = Math.min(page * limit, total)

  return (
    <div>
      <Header pageTitle='Appointments' />
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
            {appointments.map((appointment, index) => (
              <tr key={index} className='border'>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.fullname}
                </td>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.medium}
                </td>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.email}
                </td>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {new Date(appointment.date).toLocaleString()}
                </td>
                <td className='px-4 py-6 text-primary whitespace-nowrap'>
                  <Link href={`/profile/appointments/${appointment.id}`}>
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
          Showing{' '}
          {appointments.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of{' '}
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
