import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaArrowLeft, FaTrash } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import Image from 'next/image'

const EditLocation = () => {
  const router = useRouter()
  const { locationId } = router.query

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    // Use dummy data to pre-fill form fields
    const fetchLocation = async () => {
      const data = {
        name: 'Sample Location',
        telephone: '123-456-7890',
        email: 'location@example.com',
        mainPicture: '/images/dubai.webp',
        pictures: [
          '/images/dubai-1.webp',
          '/images/dubai-2.webp',
          '/images/dubai-3.webp',
          '/images/dubai-4.webp',
        ],
      }

      setValue('name', data.name)
      setValue('telephone', data.telephone)
      setValue('email', data.email)
      if (data.mainPicture) {
        const response = await fetch(data.mainPicture).catch((err) =>
          console.error(err)
        )
        const blob = await response.blob()
        const file = new File([blob], 'mainPicture.jpg', { type: 'image/jpeg' })
        setValue('mainPicture', file)
      }
      if (data.pictures) {
        const files = await Promise.all(
          data.pictures.map(async (url) => {
            const response = await fetch(url).catch((err) => console.error(err))
            const blob = await response.blob()
            return new File([blob], 'picture.jpg', { type: 'image/jpeg' })
          })
        )
        setValue('pictures', files)
      }
    }

    if (locationId) {
      fetchLocation()
    }
  }, [locationId, setValue])

  const onSubmit = (data) => {
    console.log(data)
    // Handle update location logic here
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Edit Location</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-4 max-w-2xl mx-auto'
        >
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              {...register('name', {
                required: 'Name is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Telephone
            </label>
            <input
              type='text'
              {...register('telephone', {
                required: 'Telephone is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.telephone ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.telephone && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.telephone.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              {...register('email', {
                required: 'Email is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Main Picture
            </label>
            <Controller
              control={control}
              name='mainPicture'
              render={({ field }) => (
                <>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const newFile = e.target.files[0]
                      field.onChange(newFile)
                    }}
                    className={`mt-1 block w-full text-gray-700 border p-2 ${
                      errors.mainPicture ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm sm:text-sm`}
                  />
                  {field.value && (
                    <div className='mt-2 relative w-80 h-52 mx-auto border rounded-md overflow-hidden'>
                      <Image
                        src={URL.createObjectURL(field.value)}
                        alt='Selected'
                        className='w-full h-full object-cover'
                        loading='lazy'
                        width={320}
                        height={208}
                      />
                      <button
                        type='button'
                        onClick={() => field.onChange(null)}
                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </>
              )}
            />
            {errors.mainPicture && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.mainPicture.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Other Pictures
            </label>
            <Controller
              control={control}
              name='pictures'
              render={({ field }) => (
                <>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files)
                      field.onChange(files)
                    }}
                    className={`mt-1 block w-full text-gray-700 border p-2 ${
                      errors.pictures ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm sm:text-sm`}
                  />
                  {field.value && field.value.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value.map((file, idx) => (
                        <div
                          key={idx}
                          className='relative w-24 h-24 border rounded-md overflow-hidden'
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Selected ${idx + 1}`}
                            className='w-full h-full object-cover'
                            loading='lazy'
                            width={96}
                            height={96}
                          />
                          <button
                            type='button'
                            onClick={() => {
                              const newFiles = field.value.filter(
                                (_, index) => index !== idx
                              )
                              field.onChange(newFiles)
                            }}
                            className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            />
            {errors.pictures && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.pictures.message}
              </motion.p>
            )}
          </div>

          <Button type='submit' variant='primary' className='w-full'>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditLocation
