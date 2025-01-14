import { useState, useEffect } from 'react'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'
import Image from 'next/image'

const BusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    // Fetch business types from API
    const fetchBusinessTypes = async () => {
      try {
        const response = await axios.get('/business')
        console.log(response)

        setBusinessTypes(response.data)
      } catch (error) {
        console.error('Failed to fetch business types:', error)
      }
    }
    fetchBusinessTypes()
  }, [])

  const handleAdd = async (data) => {
    const formData = new FormData()
    formData.append('name', data.productName)
    formData.append('orderType', data.productType.toLocaleUpperCase())
    formData.append('file', data.picture[0])

    try {
      const response = await axios.post('/business/create', formData)
      setBusinessTypes([...businessTypes, response.data])
      setValue('productName', null)
      setValue('productType', '')
      setValue('picture', null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (index) => {
    const removeFromList = async () => {
      try {
        const type = businessTypes[index]
        await axios.delete(`/business/${type.id}`)
        setBusinessTypes(businessTypes.filter((_, i) => i !== index))
      } catch (error) {
        console.error('Failed to delete business type:', error)
      }
    }
    confirm(
      'Delete Business Type',
      'Are you sure you want to delete this business type?',
      'Delete',
      removeFromList
    )
  }

  const handleEdit = (index) => {
    if (index === null) {
      setEditIndex(null)
      setValue('productName', null)
      setValue('productType', '')
      setValue('picture', null)
      return
    }
    setEditIndex(index)
    const type = businessTypes[index]
    setValue('productName', type.name)
    setValue('productType', type.orderType)
  }

  const handleUpdate = async (data) => {
    const formData = new FormData()
    formData.append('name', data.productName)
    formData.append('orderType', data.productType.toLocaleUpperCase())
    if (data.picture[0]) {
      formData.append('file', data.picture[0])
    }

    try {
      const type = businessTypes[editIndex]
      const response = await axios.put(`/business/${type.id}`, formData)
      const updatedTypes = businessTypes.map((type, index) =>
        index === editIndex ? response.data : type
      )
      setBusinessTypes(updatedTypes)
      setEditIndex(null)
      setValue('productName', null)
      setValue('productType', '')
      setValue('picture', null)
    } catch (error) {
      console.error('Failed to update business type:', error)
    }
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Business Type</h1>
      </div>

      <table className='w-full max-w-2xl table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Business Type</th>
            <th className='px-4 py-2 text-center'>Model of Service</th>
            <th className='px-4 py-2 text-center'>picture</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businessTypes.map((type, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{type.name}</td>
              <td className='px-4 py-2 text-center'>{type.orderType}</td>
              <td className='px-4 py-2 text-center'>
                {type.image.thumbnail && (
                  <Image
                    src={type.image.thumbnail}
                    loading='lazy'
                    width={150}
                    height={180}
                    alt={type.name}
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
                value='BUY'
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
                value='RENT'
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
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Upload Picture
          </label>
          <input
            type='file'
            {...register('picture', {
              required: editIndex === null && 'Picture is required',
            })}
            className={`mt-1 block w-full border p-2 ${
              errors.picture ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-s sm:text-sm`}
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

export default BusinessType
