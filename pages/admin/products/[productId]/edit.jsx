import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '@/components/Button'

const EditProduct = () => {
  const [defaultCategory, setDefaultCategory] = useState(null)
  const router = useRouter()
  const params = useParams()
  const [categories, setCategories] = useState([])
  const [type, setType] = useState('BUY')

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/category`)
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      }
    }
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${params.productId}`)
        const product = response.data

        // Set the product's field values
        setValue('productName', product.name)
        setValue('productType', product.productType)
        setType(product.productType)
        // setValue('productCategory', product.category.id)
        setDefaultCategory(product.category.id)
        setValue(
          'stockQuantity',
          Object.entries(product.stock)
            .map(([_, value]) => value)
            .join(',')
        )
        setValue(
          'price',
          Object.entries(product.buyPrice)
            .map(([_, value]) => value)
            .join(',')
        )
        setValue('weightInKg', product.weightInKg.join(','))
        setValue('productDescription', product.description)

        if (product.images && product.images.length > 0) {
          const imageFiles = product.images.map((image) => {
            return fetch(image.original) // Fetch the image from the URL (if URL is used)
              .then((res) => res.blob())
              .then(
                (blob) =>
                  new File([blob], image.original.split('/').pop(), {
                    type: blob.type,
                  })
              )
          })

          Promise.all(imageFiles)
            .then((files) => {
              setValue('productImages', files)
            })
            .catch((err) => {
              console.error('Error fetching images:', err)
              toast.error('Failed to load product images')
            })
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product details')
      }
    }

    if (
      // isInitialRender.current &&
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization'] &&
      params.productId
    ) {
      fetchCategories()
      fetchProduct()
      // isInitialRender.current = false
    }
  }, [
    setValue,
    axios.defaults.baseURL,
    axios.defaults.headers.common['Authorization'],
    params,
  ])

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
    //   return 'Each value in Weight must be a valid number.'
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
    const { stockQuantity, price, weightInKg } = data

    const validationError = validateMultipleFields(
      stockQuantity,
      price,
      weightInKg
    )
    if (validationError !== true) {
      toast.error(validationError)
      return
    }

    const stockQuantityArray = stockQuantity
      .split(',')
      .map((q) => Number(q.trim()))
    const priceArray = price.split(',').map((p) => Number(p.trim()))
    const weightArray = weightInKg.split(',').map((w) => Number(w.trim()))

    const formData = new FormData()
    formData.append('name', data.productName)
    formData.append('productType', data.productType)
    formData.append('categoryId', data.productCategory)
    formData.append('stock', JSON.stringify(stockQuantityArray))
    formData.append('buyPrice', JSON.stringify(priceArray))
    formData.append('rentPrice', JSON.stringify(priceArray))
    formData.append('weightInKg', JSON.stringify(weightArray))
    formData.append('description', data.productDescription)
    if (data.productImages) {
      Array.from(data.productImages).forEach((file) => {
        formData.append('images', file)
      })
    }

    try {
      await axios.put(`/products/${params.productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success('Product updated successfully')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error(
        error?.response?.data?.errors?.[0].message ||
          error.message ||
          'Failed to update product'
      )
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
        <h1 className='text-2xl font-medium'>Edit Product</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-4 max-w-lg'
        >
          {/* Add similar input fields as in CreateProduct */}
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
                  value='BUY'
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
                  value='RENT'
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

          {/* Product Category */}
          {defaultCategory ? (
            <div>
              <label className='block text-lg font-medium text-gray-700'>
                Product Category
              </label>
              <select
                {...register('productCategory', {
                  required: 'Product Category is required',
                })}
                defaultValue={defaultCategory}
                className={`mt-1 block w-full border p-2 ${
                  errors.productCategory ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm sm:text-sm`}
              >
                <option value=''>Select a category</option>
                {categories
                  .filter((c) =>
                    !type ? true : c.businessType.orderType === type
                  )
                  .map((el) => (
                    <option value={el.id} key={el.id}>
                      {el.name}
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
          ) : (
            ''
          )}

          {/* Product Images */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Product Images
            </label>
            <Controller
              control={control}
              name='productImages'
              rules={{
                required: 'Images are required',
                validate: (value) =>
                  value.length >= 2 ? true : 'Choose at least 2 pictures',
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
                        className={`hidden `}
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

          {/* Weight Quantity */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Variants (Comma-seperated)
            </label>
            <input
              type='text'
              {...register('weightInKg', {
                required: 'Weight is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.weightInKg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.weightInKg.message}
              </motion.p>
            )}
          </div>

          {/* Stock Quantity */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Stock Quantity
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

          {/* Price */}
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Price
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

          {/* Product Description */}
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

          <Button type='submit' variant='primary' className='w-72'>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
