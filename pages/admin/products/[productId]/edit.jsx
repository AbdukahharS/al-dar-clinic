import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaArrowLeft, FaTrash } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'

import Button from '@/components/Button'
import dumbbell from '@/public/images/products/dumbbell.webp'

const EditProduct = () => {
  const router = useRouter()

  const product = {
    id: 1,
    productName: 'Dumbbell 6Kgs',
    img: dumbbell,
    price: 100,
    productType: 'Buy',
    productCategory: 'Physiotherapy Tools',
    stockQuantity: 26,
    productDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam',
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  // Pre-fill form fields with product details
  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch('/images/products/dumbbell.webp')
      const blob = await response.blob()
      const file = new File([blob], 'dumbbell.webp', { type: 'image/webp' })
      setValue('productImages', Array(3).fill(file) || [])
    }

    if (product) {
      setValue('productName', product.productName)
      setValue('productType', product.productType)
      setValue('productCategory', product.productCategory)
      setValue('stockQuantity', product.stockQuantity)
      setValue('price', product.price)
      setValue('productDescription', product.productDescription)
      fetchFile()
    }
  }, [product, setValue])

  const onSubmit = (data) => {
    console.log(data)
    // Handle update product logic here
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Edit Product</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-4 max-w-lg mx-auto'
        >
          {/* Product Name */}
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

          {/* Product Type */}
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

          {/* Product Category */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Category
            </label>
            <select
              {...register('productCategory', {
                required: 'Product Category is required',
              })}
              defaultValue={product?.productCategory || ''}
              className={`mt-1 block w-full border p-2 ${
                errors.productCategory ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            >
              <option value=''>Select a category</option>
              <option value='Physiotherapy Tools'>Physiotherapy Tools</option>
              {/* Add more options here */}
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

          {/* Product Images */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Images
            </label>
            <Controller
              control={control}
              name='productImages'
              render={({ field }) => (
                <>
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files)
                      field.onChange([...(field.value || []), ...newFiles])
                    }}
                    className={`mt-1 block w-full text-gray-700 border p-2 ${
                      errors.productImages
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md shadow-s sm:text-sm`}
                  />
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
                                  const newFiles = Array.from(
                                    field.value
                                  ).filter((_, i) => i !== index)
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

          {/* Stock Quantity */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Stock Quantity
            </label>
            <input
              type='number'
              {...register('stockQuantity', {
                required: 'Stock Quantity is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Minimum quantity is 1' },
              })}
              defaultValue={product?.stockQuantity || 1}
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

          {/* Price */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Price
            </label>
            <input
              type='number'
              step='0.01'
              {...register('price', {
                required: 'Price is required',
                valueAsNumber: true,
                min: { value: 0.01, message: 'Minimum price is 0.01' },
              })}
              defaultValue={product?.price || 0.01}
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

          {/* Product Description */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Description
            </label>
            <textarea
              {...register('productDescription', {
                required: 'Product Description is required',
              })}
              defaultValue={product?.productDescription || ''}
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
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
