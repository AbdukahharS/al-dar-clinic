import { useState } from 'react'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import Button from '@/components/Button'

const BusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState([
    { name: 'B2C', format: 'Buy' },
    { name: 'B2C', format: 'Rent' },
    { name: 'B2B', format: 'Buy' },
    { name: 'B2B', format: 'Rent' },
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
    const newType = { name: data.productName, format: data.productType }
    setBusinessTypes([...businessTypes, newType])
    setValue('productName', null)
    setValue('productType', '')
  }

  const handleDelete = (index) => {
    setBusinessTypes(businessTypes.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    if (!index) {
      setEditIndex(null)
      setValue('productName', null)
      setValue('productType', '')
      return
    }
    setEditIndex(index)
    const type = businessTypes[index]
    setValue('productName', type.name)
    setValue('productType', type.format)
  }

  const handleUpdate = (data) => {
    const updatedType = {
      name: data.productName,
      format: data.productType,
    }
    const updatedTypes = businessTypes.map((type, index) =>
      index === editIndex ? updatedType : type
    )
    setBusinessTypes(updatedTypes)
    setEditIndex(null)
    setValue('productName', null)
    setValue('productType', '')
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Business Type</h1>
      </div>

      <table className='w-full max-w-lg table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Business Type</th>
            <th className='px-4 py-2 text-center'>Model of Service</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businessTypes.map((type, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{type.name}</td>
              <td className='px-4 py-2 text-center'>{type.format}</td>
              <td className='px-4 py-2 flex gap-3 items-center justify-center'>
                {editIndex === index ? (
                  <button
                    onClick={() => handleEdit()}
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
          {editIndex !== null
            ? 'Update Business Type'
            : 'Add New Business Type'}
        </h3>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            What is this business type for?
          </label>
          <div className='mt-1 flex space-x-4'>
            <label className='flex items-center space-x-2 gap-10 border p-2 rounded-md'>
              <span>Buy</span>
              <input
                type='radio'
                value='Buy'
                {...register('productType', {
                  required: 'Mode of service is required',
                })}
                className={`${
                  errors.productType ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-s sm:text-sm`}
              />
            </label>
            <label className='flex items-center space-x-2 gap-10 border p-2 rounded-md'>
              <span>Rent</span>
              <input
                type='radio'
                value='Rent'
                {...register('productType', {
                  required: 'Mode of service is required',
                })}
                className={`${
                  errors.productType ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-s sm:text-sm`}
              />
            </label>
          </div>
          {errors.productType && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.productType.message}
            </motion.p>
          )}
        </div>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Business Type Name
          </label>
          <input
            type='text'
            {...register('productName', {
              required: 'Business Type Name is required',
            })}
            className={`mt-1 block w-full border p-2 ${
              errors.productName ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-s sm:text-sm`}
          />
          {errors.productName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.productName.message}
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

export default BusinessType
