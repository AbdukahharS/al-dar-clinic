import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'

const dummyData = [
  {
    id: 1,
    name: 'Emily Carter',
    type: "Doctor's Consultation",
    email: 'emily.carter@example.com',
    schedule: '08-01-2025',
    medium: 'online',
    createdAt: '2025-01-05T09:00:00Z',
  },
  {
    id: 2,
    name: 'John Smith',
    type: 'Counseling',
    email: 'john.smith@example.com',
    schedule: '10-01-2025',
    medium: 'offline',
    createdAt: '2025-01-06T11:30:00Z',
  },
  {
    id: 3,
    name: 'Sarah Brown',
    type: 'Physiotherapy',
    email: 'sarah.brown@example.com',
    schedule: '12-01-2025',
    medium: 'online',
    createdAt: '2025-01-07T13:45:00Z',
  },
  {
    id: 4,
    name: 'Anna White',
    type: 'Counseling',
    email: 'anna.white@example.com',
    schedule: '15-01-2025',
    medium: 'offline',
    createdAt: '2025-01-06T15:20:00Z',
  },
  {
    id: 5,
    name: 'Michael Green',
    type: "Doctor's Consultation",
    email: 'michael.green@example.com',
    schedule: '18-01-2025',
    medium: 'online',
    createdAt: '2025-01-07T17:10:00Z',
  },
  {
    id: 6,
    name: 'Laura Wilson',
    type: 'Physiotherapy',
    email: 'laura.wilson@example.com',
    schedule: '20-01-2025',
    medium: 'offline',
    createdAt: '2025-01-07T19:00:00Z',
  },
]

const Appointments = () => {
  const [data, setData] = useState(dummyData)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')

  useEffect(() => {
    const filteredData = dummyData.filter((order) => {
      if (filter === 'all') {
        return true
      } else if (filter === 'online') {
        return order.medium === 'online'
      } else {
        return order.medium === 'offline'
      }
    })

    const sortedData = [...filteredData].sort((a, b) => {
      if (sort === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    setData(sortedData)
  }, [filter, sort])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Appointment Management</h1>
        <div className='flex items-center gap-4'>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='all'>No Filter</option>
            <option value='online'>Online</option>
            <option value='offline'>Offline</option>
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
                  {order.name}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.type}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.email}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.schedule}
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
    </div>
  )
}

export default Appointments
