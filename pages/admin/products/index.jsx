import Button from '@/components/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaCircleInfo, FaPen, FaTrashCan } from 'react-icons/fa6'

const dummyData = [
  {
    id: 1,
    name: 'Foam Roller',
    quantity: 15,
    price: 25.99,
    category: 'Tool',
    createdAt: '2025-01-08T10:00:00Z',
  },
  {
    id: 2,
    name: 'Resistance Bands',
    quantity: 50,
    price: 12.49,
    category: 'Tool',
    createdAt: '2025-01-08T10:05:00Z',
  },
  {
    id: 3,
    name: 'Therapy Ball',
    quantity: 30,
    price: 18.75,
    category: 'Tool',
    createdAt: '2025-01-08T10:10:00Z',
  },
  {
    id: 4,
    name: 'Massage Stick',
    quantity: 20,
    price: 22.0,
    category: 'Tool',
    createdAt: '2025-01-08T10:15:00Z',
  },
  {
    id: 5,
    name: 'Stretch Strap',
    quantity: 40,
    price: 9.99,
    category: 'Tool',
    createdAt: '2025-01-08T10:20:00Z',
  },
  {
    id: 6,
    name: 'Balance Pad',
    quantity: 10,
    price: 45.5,
    category: 'Equipment',
    createdAt: '2025-01-08T10:25:00Z',
  },
  {
    id: 7,
    name: 'Wobble Board',
    quantity: 8,
    price: 55.0,
    category: 'Equipment',
    createdAt: '2025-01-08T10:30:00Z',
  },
  {
    id: 8,
    name: 'Hot/Cold Pack',
    quantity: 100,
    price: 7.25,
    category: 'Devices',
    createdAt: '2025-01-08T10:35:00Z',
  },
  {
    id: 9,
    name: 'Neck Traction Device',
    quantity: 12,
    price: 29.99,
    category: 'Device',
    createdAt: '2025-01-08T10:40:00Z',
  },
  {
    id: 10,
    name: 'Hand Therapy Putty',
    quantity: 60,
    price: 14.95,
    category: 'Tool',
    createdAt: '2025-01-08T10:45:00Z',
  },
]

const Products = () => {
  const [data, setData] = useState(dummyData)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')

  useEffect(() => {
    const filteredData = dummyData.filter((product) => {
      if (filter === 'all') {
        return true
      } else {
        return product.category === filter
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
        <h1 className='text-2xl font-medium'>Product Management</h1>
        <div className='flex items-center gap-4'>
          <Link href='/admin/products/create'>
            <Button className='bg-white !text-primary rounded-lg p-2'>
              Add Product
            </Button>
          </Link>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='all'>No Filter</option>
            <option value='Tool'>Tool</option>
            <option value='Equipment'>Equipment</option>
            <option value='Device'>Device</option>
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
                Prodduct Name
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Category
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Quantity
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Price</th>
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
                  {order.category}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.quantity}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.price}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-3'>
                    <Link href={`/admin/products/${order.id}/edit`}>
                      <FaPen className='mx-auto text-xl' />
                    </Link>
                    <button>
                      <FaTrashCan className='mx-auto text-xl' />
                    </button>
                    <Link href={`/admin/products/${order.id}`}>
                      <FaCircleInfo className='mx-auto text-xl' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
