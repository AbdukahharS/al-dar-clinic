import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '@/components/Button'
import useAuth from '@/hooks/useAuth'

const convertTo24Hour = (time) => {
  let [timePart, period] = time.split(' ')
  let [hours, minutes] = timePart.split(':').map(Number)

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

const convertTo12Hour = (time) => {
  let [hours, minutes] = time.split(':').map(Number)
  let period = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12 || 12 // Convert 0 to 12 for 12-hour format
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )} ${period}`
}

const EditSlot = () => {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState()
  const [therapist, setTherapist] = useState()
  const { isAuthenticated } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const response = await axios.get(`/slots/${params.slotId}`)
        const data = response.data.data

        setDay(data.dayOfWeek)
        setTherapist(data.teamMember)
        setValue('duration', data.duration)
        setValue('startTime', convertTo24Hour(data.startTime))
      } catch (error) {
        console.error('Error fetching team member:', error)
      }
    }

    if (params?.slotId && isAuthenticated) {
      fetchSlot()
    }
  }, [params, setValue, isAuthenticated])

  const onUpdate = async (formData) => {
    if (loading) return
    setLoading(true)
    const data = {
      id: Number(params.slotId),
      dayOfWeek: day,
      startTime: convertTo12Hour(formData.startTime),
      duration: Number(formData.duration),
    }
    try {
      await axios.put('/slots/update', data)
      toast.success('Slots updated succesfully!')
      router.push('/admin/slot')
    } catch (error) {
      console.log(error)

      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
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
        <h1 className='text-2xl font-medium'>Update Slot</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onUpdate)}
          className='space-y-6 p-4 max-w-2xl'
        >
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Day of week: {day}
            </label>
            <label className='block text-lg font-medium text-gray-700 mt-2'>
              Name of the therapist: {therapist?.name}
            </label>

            {errors.day && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.day.message}
              </motion.p>
            )}
          </div>

          <div className='flex flex-row gap-8'>
            <div>
              <label className='block text-lg font-medium text-gray-700'>
                Slot starting time
              </label>
              <input
                type='time'
                {...register('startTime', {
                  required: 'Starting time is required',
                })}
                className={`mt-1 block w-full border p-2 ${
                  errors.startTime ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm sm:text-sm`}
              />
              {errors.startTime && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-red-500 text-sm mt-1'
                >
                  {errors.startTime.message}
                </motion.p>
              )}
            </div>
            <div>
              <label className='block text-lg font-medium text-gray-700'>
                Slot Duration (in minutes)
              </label>
              <input
                type='number'
                {...register('duration', {
                  required: 'Duration is required',
                  validate: (value) =>
                    value > 0 || 'Duration should be more that 0',
                })}
                className={`mt-1 block w-full border p-2 ${
                  errors.duration ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm sm:text-sm`}
              />
              {errors.duration && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-red-500 text-sm mt-1'
                >
                  {errors.duration.message}
                </motion.p>
              )}
            </div>
          </div>

          <Button type='submit' variant='primary' className='w-full'>
            {loading ? 'Updating Slot...' : 'Update Slot'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditSlot
