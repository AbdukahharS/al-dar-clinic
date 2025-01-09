import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaCircleInfo, FaRotateRight, FaUser } from 'react-icons/fa6'

import Button from '@/components/Button'

const dummyData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    createdAt: '2025-01-01T10:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    createdAt: '2025-01-02T11:30:00Z',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1234567892',
    createdAt: '2025-01-03T15:45:00Z',
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    phone: '+1234567893',
    createdAt: '2025-01-04T09:20:00Z',
  },
  {
    id: 5,
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1234567894',
    createdAt: '2025-01-05T17:10:00Z',
  },
]

const Users = () => {
  const router = useRouter()
  const [data, setData] = useState(dummyData)
  const [sortOrder, setSortOrder] = useState()

  useEffect(() => {
    const storedSortOrder = sessionStorage.getItem('userSort')
    if (storedSortOrder) {
      setSortOrder(storedSortOrder)
      sortData(storedSortOrder)
    }
  }, [])

  const sortData = (order) => {
    const sortedData = [...dummyData].sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
    setData(sortedData)
    sessionStorage.setItem('userSort', order)
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>User Management</h1>
        <div className='flex items-center gap-4'>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value)
              sortData(e.target.value)
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
              <th className='px-4 py-5 font-medium whitespace-nowrap'>DP</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Name</th>
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
                <td className='px-3 py-4 whitespace-nowrap'>
                  <div className='flex items-center justify-center w-10 h-10 mx-auto bg-primary text-white rounded-full text-xl'>
                    <FaUser />
                  </div>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.name}
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
    </div>
  )
}

export default Users
