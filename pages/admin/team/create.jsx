import { useRouter } from 'next/router'
import { FaArrowLeft, FaTrash } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import Image from 'next/image'

const AddTeamMember = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Add Team Member</h1>
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
              Role
            </label>
            <input
              type='text'
              {...register('role', {
                required: 'Role is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.role && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.role.message}
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
              Picture
            </label>
            <Controller
              control={control}
              name='picture'
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
                      errors.picture ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm sm:text-sm`}
                  />
                  {field.value && (
                    <div className='mt-2 relative w-52 h-52 mx-auto border rounded-md overflow-hidden'>
                      <Image
                        src={URL.createObjectURL(field.value)}
                        alt='Selected'
                        className='w-full h-full object-cover'
                        loading='lazy'
                        width={208}
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

          <Button type='submit' variant='primary' className='w-full'>
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddTeamMember
