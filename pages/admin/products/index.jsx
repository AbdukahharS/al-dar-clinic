import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { FaCircleInfo, FaPen, FaRotateRight, FaTrashCan } from 'react-icons/fa6'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'

const dummyData = [
  {
    id: 1,
    name: 'Foam Roller',
    quantity: 15,
    price: 25.99,
    category: 'Tool',
    createdAt: '2025-01-08T10:00:00Z',
    type: 'Buy',
  },
  {
    id: 2,
    name: 'Resistance Bands',
    quantity: 50,
    price: 12.49,
    category: 'Tool',
    createdAt: '2025-01-08T10:05:00Z',
    type: 'Buy',
  },
  {
    id: 3,
    name: 'Therapy Ball',
    quantity: 30,
    price: 18.75,
    category: 'Tool',
    createdAt: '2025-01-08T10:10:00Z',
    type: 'Rent',
  },
  {
    id: 4,
    name: 'Massage Stick',
    quantity: 20,
    price: 22.0,
    category: 'Tool',
    createdAt: '2025-01-08T10:15:00Z',
    type: 'Buy',
  },
  {
    id: 5,
    name: 'Stretch Strap',
    quantity: 40,
    price: 9.99,
    category: 'Tool',
    createdAt: '2025-01-08T10:20:00Z',
    type: 'Rent',
  },
  {
    id: 6,
    name: 'Balance Pad',
    quantity: 10,
    price: 45.5,
    category: 'Equipment',
    createdAt: '2025-01-08T10:25:00Z',
    type: 'Buy',
  },
  {
    id: 7,
    name: 'Wobble Board',
    quantity: 8,
    price: 55.0,
    category: 'Equipment',
    createdAt: '2025-01-08T10:30:00Z',
    type: 'Rent',
  },
  {
    id: 8,
    name: 'Hot/Cold Pack',
    quantity: 100,
    price: 7.25,
    category: 'Devices',
    createdAt: '2025-01-08T10:35:00Z',
    type: 'Buy',
  },
  {
    id: 9,
    name: 'Neck Traction Device',
    quantity: 12,
    price: 29.99,
    category: 'Device',
    createdAt: '2025-01-08T10:40:00Z',
    type: 'Rent',
  },
  {
    id: 10,
    name: 'Hand Therapy Putty',
    quantity: 60,
    price: 14.95,
    category: 'Tool',
    createdAt: '2025-01-08T10:45:00Z',
    type: 'Buy',
  },
]

const Products = () => {
  const router = useRouter()
  const [data, setData] = useState(dummyData)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')
  const isInitialRender = useRef(true) // Ref to track initial render

  useEffect(() => {
    const storedFilter = sessionStorage.getItem('productFilter')
    const storedSort = sessionStorage.getItem('productSort')

    if (storedFilter) setFilter(storedFilter)
    if (storedSort) setSort(storedSort)
  }, [])

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the effect on the initial render
      isInitialRender.current = false
      return
    }

    const filteredData = dummyData.filter((order) => {
      if (filter === 'all') {
        return true
      } else {
        return order.type.toLocaleLowerCase() === filter
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
    sessionStorage.setItem('productFilter', filter)
    sessionStorage.setItem('productSort', sort)
  }, [filter, sort])

  const handleDelete = async () => {
    confirm(
      'Delete Product',
      'Are you sure you want to delete the Product',
      'Delete'
    )
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Product Management</h1>
        <div className='flex items-center gap-4'>
          <Button
            className='bg-white !text-primary rounded-lg flex items-center flex-row gap-2'
            onClick={() => router.refresh()}
          >
            <FaRotateRight className='text-xl my-[2px]' />
            <span className='hidden xl:inline'>Refresh</span>
          </Button>
          <Link href='/admin/products/create'>
            <Button className='bg-white !text-primary rounded-lg p-2'>
              Add Product
            </Button>
          </Link>
          <select
            className='mr-4 p-2 rounded-lg text-primary'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='all'>No Filter</option>
            <option value='buy'>Buy</option>
            <option value='rent'>Rent</option>
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
                      <FaTrashCan
                        onClick={handleDelete}
                        className='mx-auto text-xl'
                      />
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
