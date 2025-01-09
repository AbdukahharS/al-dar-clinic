import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/Button'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import confirm from '@/components/Confirm'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { name: 'Physiotherapy Tools', type: 'B2C' },
    { name: 'Physiotherapy Equipment', type: 'B2B' },
    { name: 'Physiotherapy Devices', type: 'B2C' },
    { name: 'Accessories', type: 'B2B' },
  ])
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const handleAdd = (data) => {
    const newCategory = { name: data.categoryName, type: data.businessType }
    setCategories([...categories, newCategory])
    setValue('categoryName', '')
    setValue('businessType', '')
  }

  const handleDelete = async (index) => {
    const removeFromList = () =>
      setCategories(categories.filter((_, i) => i !== index))
    confirm(
       'Delete Category',
       'Are you sure you want to delete this category?',
       'Delete',
       removeFromList
     )
  }

  const handleEdit = (index) => {
    if (index === null) {
      setEditIndex(null)
      setValue('categoryName', '')
      setValue('businessType', '')
      return
    }
    setEditIndex(index)
    const category = categories[index]
    setValue('categoryName', category.name)
    setValue('businessType', category.type)
  }

  const handleUpdate = (data) => {
    const updatedCategory = {
      name: data.categoryName,
      type: data.businessType,
    }
    const updatedCategories = categories.map((category, index) =>
      index === editIndex ? updatedCategory : category
    )
    setCategories(updatedCategories)
    setEditIndex(null)
    setValue('categoryName', '')
    setValue('businessType', '')
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Category Management</h1>
      </div>

      <table className='w-full max-w-lg table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Category</th>
            <th className='px-4 py-2 text-center'>Business Type</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{category.name}</td>
              <td className='px-4 py-2 text-center'>{category.type}</td>
              <td className='px-4 py-2 flex gap-3 items-center justify-center'>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        className='mt-8 w-fit mx-auto flex flex-col gap-4'
        onSubmit={handleSubmit(editIndex !== null ? handleUpdate : handleAdd)}
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
            <option value=''>Select Business Type</option>
            <option value='B2C'>B2C</option>
            <option value='B2B'>B2B</option>
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
        <Button type='submit' className='!rounded-lg !px-12 mx-auto block'>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  )
}

export default CategoryManagement
