import { useState, useEffect } from 'react'
import { FaPen, FaPlus, FaTrash, FaX } from 'react-icons/fa6'
import { Controller, set, useForm } from 'react-hook-form'
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
    control,
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
    if (axios.defaults.headers.common['Authorization']) {
      fetchBusinessTypes()
    }
  }, [axios.defaults.headers.common['Authorization']])

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

  const handleEdit = async (index) => {
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
    const imageFile = await fetch(type.image.original) // Fetch the image from the URL (if URL is used)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new File([blob], type.image.original.split('/').pop(), {
            type: blob.type,
          })
      )
    setValue('picture', [imageFile])
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
    <div className='pb-20'>
      <div className='h-[96px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
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
              validate: (value) =>
                value.trim().length >= 3
                  ? true
                  : 'Name must be at least 3 characters',
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

export default BusinessType
