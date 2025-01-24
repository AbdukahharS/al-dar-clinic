import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/Button'
import { FaPen, FaPlus, FaTrash, FaX } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import confirm from '@/components/Confirm'
import axios from 'axios'
import Image from 'next/image'
import toast from 'react-hot-toast'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [businessTypes, setBusinessTypes] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    control,
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
      toast.error(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          error.message ||
          'An error occurred'
      )
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
  const handleEdit = async (index) => {
    if (index === null) {
      setEditIndex(null)
      setValue('categoryName', null)
      setValue('businessType', '')
      setValue('picture', null)
      return
    }
    setEditIndex(index)
    const category = categories[index]
    setValue('categoryName', category.name)
    setValue('businessType', category.businessType.id)
    const imageFile = await fetch(category.image.original) // Fetch the image from the URL (if URL is used)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new File([blob], category.image.original.split('/').pop(), {
            type: blob.type,
          })
      )
    setValue('picture', [imageFile])
  }

  // Reset form
  const resetForm = () => {
    setEditIndex(null)
    setValue('categoryName', '')
    setValue('businessType', '')
    setValue('picture', null)
  }

  return (
    <div className='pb-20'>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Category Management</h1>
      </div>

      <table className='w-full max-w-3xl table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Category Name</th>
            <th className='px-4 py-2 text-left'>Type</th>
            <th className='px-4 py-2 text-center'>Business Type</th>
            <th className='px-4 py-2 text-center'>Picture</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{category.name}</td>
              <td className='px-4 py-2'>{category.businessType.orderType}</td>
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
                  {editIndex === index ? (
                    <button
                      onClick={() => handleEdit(null)}
                      className='text-red-500 hover:underline mr-2'
                    >
                      <FaX />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className='text-primary hover:underline mr-2'
                    >
                      <FaPen />
                    </button>
                  )}
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
              validate: (value) =>
                value.trim().length >= 3
                  ? true
                  : 'Name must be at least 3 characters',
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
                {type.name} - {type.orderType}
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
            Upload Picture
          </label>
          <Controller
            control={control}
            name='picture'
            rules={{
              required: 'Picture is required',
            }}
            render={({ field }) => (
              <>
                <div className='mt-2 flex flex-wrap gap-2'>
                  {field.value &&
                    Array.from(field.value).map((file, index) => {
                      if (file instanceof File) {
                        // Ensure the file is a valid File object
                        return (
                          <div
                            key={index}
                            className='relative w-20 h-20 border rounded-md overflow-hidden group'
                          >
                            <img
                              src={URL.createObjectURL(file)} // Create URL for the file
                              alt='Selected'
                              className='w-full h-full object-cover'
                            />
                            <button
                              type='button'
                              onClick={() => {
                                const newFiles = Array.from(field.value).filter(
                                  (_, i) => i !== index
                                )
                                field.onChange(newFiles) // Update the value after removing the file
                              }}
                              className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )
                      }
                      return null // Return nothing if it's not a valid file
                    })}
                  <label
                    htmlFor='picture'
                    className={`w-20 h-20 rounded-md flex justify-center items-center text-white cursor-pointer text-4xl ${
                      errors.picture ? 'bg-red-500' : 'bg-primary'
                    }`}
                  >
                    <FaPlus />
                    <input
                      type='file'
                      id='picture'
                      accept='image/*'
                      onChange={(e) => {
                        const newFiles = Array.from(e.target.files)
                        field.onChange(newFiles)
                      }}
                      className={`hidden `}
                    />
                  </label>
                </div>
              </>
            )}
          />
          {errors.picture && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.picture.message}
            </motion.p>
          )}
        </div>
        <Button type='submit' className='!rounded-lg !px-12 mx-auto block'>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  )
}

export default CategoryManagement
