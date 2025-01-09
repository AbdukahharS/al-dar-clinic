import { useRouter } from 'next/router'
import { FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa6'
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
          className='space-y-6 p-4 max-w-2xl'
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
              rules={{
                required: 'Picture is required',
                validate: (value) =>
                  value.length === 1 ? true : 'Picture should be only 1',
              }}
              render={({ field }) => (
                <>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {field.value && (
                      <div className='relative w-40 h-52 border rounded-md overflow-hidden group'>
                        <Image
                          src={URL.createObjectURL(field.value)}
                          alt='Selected'
                          className='w-full h-full object-cover'
                          width={80}
                          height={80}
                        />
                        <button
                          type='button'
                          onClick={() => field.onChange(null)}
                          className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                    {!field.value && (
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
                          onChange={(e) => field.onChange(e.target.files[0])}
                          className='hidden'
                        />
                      </label>
                    )}
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

          <Button type='submit' variant='primary' className='w-full'>
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddTeamMember
