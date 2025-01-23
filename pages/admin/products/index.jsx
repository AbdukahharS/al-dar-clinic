import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { FaCircleInfo, FaPen, FaRotateRight, FaTrashCan } from 'react-icons/fa6'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'
import useAuth from '@/hooks/useAuth'

const Products = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('asc')
  const searchParams = useSearchParams()
  const [total, setTotal] = useState(0)
  const limit = 12
  const isInitialRender = useRef(true) // Ref to track initial render

  const fetchProducts = async () => {
    try {
      const { data } = await axios.post('/products/filter', {
        page: searchParams.get('page') || 1,
        limit,
        productType: filter !== 'all' ? filter.toUpperCase() : undefined,
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
    if (axios.defaults.headers.common['Authorization'] && isAuthenticated) {
      fetchProducts()
    }
  }, [searchParams, filter, sort, isAuthenticated])

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

    sessionStorage.setItem('productFilter', filter)
    sessionStorage.setItem('productSort', sort)
  }, [filter, sort])

  const handleDelete = async (id) => {
    const removeItem = async () => {
      try {
        await axios.delete('/products/' + id)
        toast.success('Product deleted')
        setData((prev) => prev.filter((item) => item.id !== id))
      } catch (error) {
        toast.error(error.message || 'Something went wrong')
      }
    }
    confirm(
      'Delete Product',
      'Are you sure you want to delete the Product',
      'Delete',
      removeItem
    )
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const showingFrom = ((searchParams.get('page') || 1) - 1) * limit + 1
  const showingTo = Math.min((searchParams.get('page') || 1) * limit, total)

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
                Product Name
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Type</th>
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
                <td className='px-3 py-4 whitespace-nowrap text-center max-w-xs overflow-hidden'>
                  {order.name}
                </td>
                <td className='px-3 py-4 whitespace-nowrap text-center'>
                  {order.productType}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {order.category.name}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {Object.entries(order.stock)
                    .map(([key, value]) => `${key}KG: ${value}`)
                    .join(', ')}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {Object.entries(order.buyPrice)
                    .map(([key, value]) => `${key}KG: ${value}`)
                    .join(', ')}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-3'>
                    <Link href={`/admin/products/${order.id}/edit`}>
                      <FaPen className='mx-auto text-xl' />
                    </Link>
                    <button>
                      <FaTrashCan
                        onClick={() => handleDelete(order.id)}
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
      <div className='flex flex-row items-center justify-between mt-7 md:px-4'>
        <p className='text-gray-400'>
          Showing {data.length > 0 ? `${showingFrom} to ${showingTo}` : 0} of{' '}
          {total} results
        </p>
        <div className='flex flex-row items-center gap-2'>
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1)
            .filter(
              (pageNumber) => pageNumber !== (searchParams.get('page') || 1)
            )
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

export default Products
