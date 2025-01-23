import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import Button from '@/components/Button'
import Image from 'next/image'
import useAuth from '@/hooks/useAuth'

const EditTeamMember = () => {
  const router = useRouter()
  const { memberId } = router.query
  const { isAuthenticated } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await axios.get(`/team-member/${memberId}`)
        const data = response.data.data

        setValue('name', data.name)
        setValue('position', data.position)
        const imageFile = await fetch(data.image.original) // Fetch the image from the URL (if URL is used)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new File([blob], data.image.original.split('/').pop(), {
                type: blob.type,
              })
          )
        console.log(imageFile)
        setValue('picture', imageFile)
      } catch (error) {
        console.error('Error fetching team member:', error)
      }
    }

    if (memberId && isAuthenticated) {
      fetchTeamMember()
    }
  }, [memberId, setValue, isAuthenticated])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('position', data.position)
      if (data.picture) {
        formData.append('file', data.picture)
      }

      await axios.put(`/team-member/update/${memberId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      router.push('/admin/team')
    } catch (error) {
      console.error('Error updating team member:', error)
    }
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Edit Team Member</h1>
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
              Position
            </label>
            <input
              type='text'
              {...register('position', {
                required: 'Position is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.position ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.position && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.position.message}
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
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditTeamMember
