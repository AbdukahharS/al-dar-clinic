import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'

import Button from '@/components/Button'
import toast from 'react-hot-toast'

const CreateProduct = () => {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [type, setType] = useState(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/category')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const validateMultipleFields = (quantity, price, weight) => {
    const hasValidNumbers = (input) => {
      return input.split(',').every((val) => /^\d+(\.\d+)?$/.test(val.trim()))
    }

    if (!hasValidNumbers(quantity)) {
      return 'Each value in Stock Quantity must be a valid number.'
    }
    if (!hasValidNumbers(price)) {
      return 'Each value in Price must be a valid number.'
    }
    // if (!hasValidNumbers(weight)) {
    //   return 'Each value in Variant must be a valid number.'
    // }

    const qCount = quantity.split(',').length
    const pCount = price.split(',').length
    const wCount = weight.split(',').length

    if (qCount !== pCount || pCount !== wCount) {
      return 'Quantity, Price, and Weight must have the same number of values when separated by commas.'
    }
    return true
  }

  const onSubmit = async (data) => {
    const { stockQuantity, price, weight } = data

    const validationError = validateMultipleFields(stockQuantity, price, weight)
    if (validationError !== true) {
      toast.error(validationError)
      return
    }

    const stockQuantityArray = stockQuantity
      .split(',')
      .map((q) => Number(q.trim()))
    const priceArray = price.split(',').map((p) => Number(p.trim()))
    const weightArray = weight.split(',').map((w) => Number(w.trim()))
    console.log(data, priceArray)

    const formData = new FormData()
    formData.append('name', data.productName)
    formData.append('productType', data.productType.toLocaleUpperCase())
    formData.append('categoryId', data.productCategory)
    formData.append('stock', JSON.stringify(stockQuantityArray))
    formData.append(`rentPrice`, JSON.stringify(priceArray))
    formData.append(`buyPrice`, JSON.stringify(priceArray))
    formData.append('weightInKg', JSON.stringify(weightArray))
    formData.append('description', data.productDescription)
    Array.from(data.productImages).forEach((file) => {
      formData.append('images', file)
    })

    try {
      await axios.post('/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('New product added')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Error creating product')
    }
  }

  return (
    <div>
      <div className='h-[104px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Add Product</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-4 max-w-lg'
        >
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              {...register('productName', {
                required: 'Product Name is required',
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
              Product Type
            </label>
            <div className='mt-1 flex space-x-4'>
              <label className='flex items-center space-x-2 gap-10 border p-2 rounded-md'>
                <span>Buy</span>
                <input
                  type='radio'
                  value='Buy'
                  onClick={() => setType('BUY')}
                  {...register('productType', {
                    required: 'Product Type is required',
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
                  onClick={() => setType('RENT')}
                  {...register('productType', {
                    required: 'Product Type is required',
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
              Product Category
            </label>
            <select
              {...register('productCategory', {
                required: 'Product Category is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.productCategory ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            >
              <option value=''>Select a category</option>
              {categories
                .filter((category) =>
                  !type ? true : category.businessType.orderType === type
                )
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.productCategory && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.productCategory.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Images
            </label>
            <Controller
              control={control}
              name='productImages'
              rules={{
                required: 'Product Images are required',
                validate: (value) => {
                  if (value.length < 2) {
                    return 'Minimum 2 images are required'
                  }
                  return true
                },
              }}
              render={({ field }) => (
                <>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {field.value &&
                      Array.from(field.value).map((file, index) => (
                        <div
                          key={index}
                          className='relative w-20 h-20 border rounded-md overflow-hidden group'
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt='Selected'
                            className='w-full h-full object-cover'
                          />
                          <button
                            type='button'
                            onClick={() => {
                              const newFiles = Array.from(field.value).filter(
                                (_, i) => i !== index
                              )
                              field.onChange(newFiles)
                            }}
                            className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    <label
                      htmlFor='productImages'
                      className={`w-20 h-20 rounded-md flex justify-center items-center text-white cursor-pointer text-4xl ${
                        errors.productImages ? 'bg-red-500' : 'bg-primary'
                      }`}
                    >
                      <FaPlus />
                      <input
                        type='file'
                        multiple
                        id='productImages'
                        accept='image/*'
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files)
                          field.onChange([...(field.value || []), ...newFiles])
                        }}
                        className='hidden'
                      />
                    </label>
                  </div>
                </>
              )}
            />
            {errors.productImages && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.productImages.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Stock Quantity (Comma-separated for variants)
            </label>
            <input
              type='text'
              {...register('stockQuantity', {
                required: 'Stock Quantity is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.stockQuantity && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.stockQuantity.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Price (Comma-separated for variants)
            </label>
            <input
              type='text'
              {...register('price', {
                required: 'Price is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.price && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.price.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Variants (Comma-separated)
            </label>
            <input
              type='text'
              {...register('weight', {
                required: 'Weight is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.weight ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.weight && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.weight.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Description
            </label>
            <textarea
              {...register('productDescription', {
                required: 'Product Description is required',
                validate: (value) =>
                  value.length >= 10
                    ? true
                    : 'Description must be at least 10 characters long',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.productDescription ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            ></textarea>
            {errors.productDescription && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.productDescription.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <Button type='submit' variant='primary' className='w-72'>
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
