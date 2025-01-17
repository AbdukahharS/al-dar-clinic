import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/Button'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import confirm from '@/components/Confirm'
import axios from 'axios'
import Image from 'next/image'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [businessTypes, setBusinessTypes] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  // Fetch business types and categories
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const response = await axios.get('/business')
        setBusinessTypes(response.data)
      } catch (error) {
        console.error('Failed to fetch business types:', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/category')
        setCategories(response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    if (axios.defaults.headers.common['Authorization']) {
      fetchBusinessTypes()
      fetchCategories()
    }
  }, [axios.defaults.headers.common['Authorization']])

  // Add or update a category
  const handleAddOrUpdate = async (data) => {
    const formData = new FormData()
    formData.append('name', data.categoryName)
    formData.append('businessId', data.businessType)
    if (data.picture[0]) formData.append('file', data.picture[0]) // Add picture if uploaded

    try {
      if (editIndex !== null) {
        const category = categories[editIndex]
        const response = await axios.put(`/category/${category.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setCategories((prev) =>
          prev.map((cat, i) => (i === editIndex ? response.data : cat))
        )
      } else {
        const response = await axios.post('/category/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        setCategories((prev) => [...prev, response.data])
      }
      resetForm()
    } catch (error) {
      console.error('Failed to save category:', error)
    }
  }

  // Delete a category
  const handleDelete = async (index) => {
    const removeFromList = async () => {
      try {
        const category = categories[index]
        await axios.delete(`/category/${category.id}`)
        setCategories(categories.filter((_, i) => i !== index))
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    }
    confirm(
      'Delete Category',
      'Are you sure you want to delete this category?',
      'Delete',
      removeFromList
    )
  }

  // Edit a category
  const handleEdit = (index) => {
    setEditIndex(index)
    const category = categories[index]
    setValue('categoryName', category.name)
    setValue('businessType', category.businessId)
  }

  // Reset form
  const resetForm = () => {
    setEditIndex(null)
    setValue('categoryName', '')
    setValue('businessType', '')
    setValue('picture', null)
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Category Management</h1>
      </div>

      <table className='w-full max-w-3xl table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Category Name</th>
            <th className='px-4 py-2 text-center'>Business Type</th>
            <th className='px-4 py-2 text-center'>Picture</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{category.name}</td>
              <td className='px-4 py-2 text-center'>
                {category.businessType.name}
              </td>
              <td className='px-4 py-2 text-center'>
                {category.image.thumbnail && (
                  <Image
                    src={category.image.thumbnail}
                    loading='lazy'
                    width={150}
                    height={180}
                    alt={category.name}
                    className='mx-auto rounded-md'
                  />
                )}
              </td>
              <td className='px-4 py-2'>
                <div className='flex gap-3 items-center justify-center'>
                  <button
                    onClick={() => handleEdit(index)}
                    className='text-primary hover:underline'
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className='text-primary hover:underline'
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        className='mt-8 w-fit mx-auto flex flex-col gap-4'
        onSubmit={handleSubmit(handleAddOrUpdate)}
      >
        <h3 className='text-center text-primary text-2xl font-medium'>
          {editIndex !== null ? 'Update Category' : 'Add New Category'}
        </h3>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Category Name
          </label>
          <input
            type='text'
            {...register('categoryName', {
              required: 'Category Name is required',
            })}
            className={`mt-1 block w-full border p-2 ${
              errors.categoryName ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-s sm:text-sm`}
          />
          {errors.categoryName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.categoryName.message}
            </motion.p>
          )}
        </div>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Business Type
          </label>
          <select
            {...register('businessType', {
              required: 'Business Type is required',
            })}
            className={`mt-1 block w-full border p-2 ${
              errors.businessType ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-s sm:text-sm`}
          >
            <option value='' disabled>
              Select a business type
            </option>
            {businessTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.businessType.message}
            </motion.p>
          )}
        </div>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Picture
          </label>
          <input
            type='file'
            {...register('picture')}
            className='mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-s sm:text-sm'
          />
        </div>
        <Button type='submit' className='!rounded-lg !px-12 mx-auto block'>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  )
}

export default CategoryManagement
