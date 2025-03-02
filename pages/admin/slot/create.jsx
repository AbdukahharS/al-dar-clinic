import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaArrowLeft, FaTrashCan } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '@/components/Button'
import useAuth from '@/hooks/useAuth'

const weekdays = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

const CreateSlot = () => {
  const router = useRouter()
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [day, setDay] = useState()
  const [duration, setDuration] = useState()
  const { isAuthenticated } = useAuth()
  const [therapists, setTherapists] = useState([])
  const [teamMemberId, setTeamMemberId] = useState()

  console.log(therapists)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('/team-member/all')
        setTherapists(response.data.data)
      } catch (error) {
        console.error('Error fetching therapists:', error)
      }
    }

    if (isAuthenticated) {
      fetchTherapists()
    }
  }, [isAuthenticated])

  const onCreate = async (data) => {
    const { startTime, endTime, duration, buffer, day } = data
    setDay(day)
    setDuration(Number(duration))
    setTeamMemberId(data.therapist)

    // Convert time to minutes
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    // Convert minutes to 12-hour format with AM/PM
    const formatTime = (minutes) => {
      let hours = Math.floor(minutes / 60)
      let mins = minutes % 60
      let period = hours >= 12 ? 'PM' : 'AM'

      hours = hours % 12 || 12 // Convert 0 to 12 for 12-hour format
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(
        2,
        '0'
      )} ${period}`
    }

    let start = timeToMinutes(startTime)
    let end = timeToMinutes(endTime)
    let slotDuration = Number(duration)
    let bufferTime = Number(buffer)

    let newSlots = []

    while (start + slotDuration <= end) {
      let slotEnd = start + slotDuration

      newSlots.push({
        startTime: formatTime(start),
        endTime: formatTime(slotEnd),
      })

      start = slotEnd + bufferTime // Move start time forward
    }

    setSlots(newSlots)
  }

  const remove = (ind) => {
    setSlots((prev) => prev.filter((slot, i) => i !== ind))
  }

  const onSave = async () => {
    if (loading) return
    setLoading(true)
    const data = {
      dayOfWeek: day,
      startTime: slots.map((slot) => slot.startTime),
      duration,
      teamMemberId,
    }
    try {
      await axios.post('/slots/create', data)
      toast.success('Slots saved succesfully!')
      router.push('/admin/slot')
    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message === 'Invalid operation'
          ? 'Slot already exist'
          : error.message || 'Something went wrong'
      )
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
        <h1 className='text-2xl font-medium'>Create Slots</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onCreate)}
          className='space-y-6 p-4 max-w-2xl'
        >
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Day of week
            </label>
            <select
              {...register('day', {
                required: 'Day is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.day ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            >
              <option value=''>Select a day</option>
              {weekdays.map((day, i) => (
                <option key={i} value={day}>
                  {day}
                </option>
              ))}
            </select>

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
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Therapist
            </label>
            <select
              {...register('therapist', {
                required: 'Therapist is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.therapist ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            >
              <option value=''>Select a therapist</option>
              {therapists.map((therapist, i) => (
                <option key={i} value={therapist.id}>
                  {therapist.name}
                </option>
              ))}
            </select>

            {errors.therapist && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.therapist.message}
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
          <div>
            <label className='block text-lg font-medium text-gray-700'>
              Buffer time between slots (in minutes)
            </label>
            <input
              type='number'
              min={0}
              {...register('buffer', {
                required: 'Buffer time is required',
              })}
              className={`mt-1 block w-full border p-2 ${
                errors.buffer ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.buffer && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.buffer.message}
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
                Slot ending time
              </label>
              <input
                type='time'
                {...register('endTime', {
                  required: 'Ending time is required',
                })}
                className={`mt-1 block w-full border p-2 ${
                  errors.endTime ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm sm:text-sm`}
              />
              {errors.endTime && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-red-500 text-sm mt-1'
                >
                  {errors.endTime.message}
                </motion.p>
              )}
            </div>
          </div>

          <Button type='submit' variant='primary' className='w-full'>
            Generate Slots
          </Button>
        </form>
        {slots.length ? (
          <>
            <div className='flex flex-row flex-wrap gap-6 mt-2 border-t pt-4'>
              {slots.map((slot, i) => (
                <div key={i} className='p-3 border rounded-lg'>
                  <Button
                    variant='ghost'
                    size='iconSM'
                    className='text-red-500 ml-auto'
                    onClick={() => remove(i)}
                  >
                    <FaTrashCan />
                  </Button>
                  <p>
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>
            <Button className='w-72 mt-8' onClick={onSave}>
              {loading ? 'Saveing Slots...' : 'Save Slots'}
            </Button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default CreateSlot
