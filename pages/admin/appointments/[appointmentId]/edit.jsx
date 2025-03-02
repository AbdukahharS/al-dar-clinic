import { use, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { FaArrowLeft, FaClock, FaLocationDot, FaUser } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Button from '@/components/Button'
import Animated from '@/components/Animated'
import useAuth from '@/hooks/useAuth'

const toLocalISO = (date) => {
    const dateObj = new Date(date)
    const now = new Date()
  
    if (now.toLocaleDateString() === dateObj.toLocaleDateString()) {
      // Set current local time on the given date
      dateObj.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      )
    }
  
    // Convert to UTC without shifting time
    return new Date(
      Date.UTC(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
        dateObj.getHours(),
        dateObj.getMinutes(),
        dateObj.getSeconds(),
        dateObj.getMilliseconds()
      )
    ).toISOString()
  }

const calculateEndTime = (startTime, duration) => {
  // Convert 12-hour format to minutes
  const timeToMinutes = (time) => {
    let [timePart, period] = time.split(' ')
    let [hours, minutes] = timePart.split(':').map(Number)

    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0

    return hours * 60 + minutes
  }

  // Convert minutes to 12-hour format with AM/PM
  const formatTime = (minutes) => {
    let hours = Math.floor(minutes / 60) % 24
    let mins = minutes % 60
    let period = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12 || 12 // Convert 0 to 12 for 12-hour format
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(
      2,
      '0'
    )} ${period}`
  }

  let startMinutes = timeToMinutes(startTime)
  let endMinutes = startMinutes + Number(duration)

  return formatTime(endMinutes)
}

const ChangeAppointmentSlot = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [appointment, setAppointment] = useState({})
  const [slot, setSlot] = useState({})
  const [locations, setLocations] = useState([])
  const [therapists, setTherapists] = useState([])
  const [loading, setLoading] = useState({
    book: false,
    serviceType: false,
    location: false,
    slot: false,
    therapist: false,
    update: false,
  })
  const [slots, setSlots] = useState(null)
  const params = useParams()
  const [therapist, setTherapist] = useState()
  const [date, setDate] = useState()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get('/appointments/' + params.appointmentId)
        setAppointment(res.data.data)
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong')
      }
    }
    if (
      params?.appointmentId &&
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization']
    ) {
      fetchAppointment()
    }
  }, [axios, params, axios.defaults.headers.common['Authorization']])

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const res = await axios.get('/slots/' + appointment.slotsId)
        setValue('date', new Date(appointment.date))
        setValue('therapistId', res.data.data.teamMember.id)
        setTherapist(res.data.data.teamMember.id)
        setDate(new Date(appointment.date))
        setValue('slot', res.data.data.id)

        // If the slot data contains location information, set it here
        if (res.data.data.teamMember?.location?.id) {
          setValue(
            'locationId',
            res.data.data.teamMember.location.id
          )
        }

        setSlot(res.data.data)
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong')
      }
    }
    if (appointment.slotsId) {
      fetchSlot()
    }
  }, [appointment, setValue])

  useEffect(() => {
    if (locations.length > 0 && watch('locationId')) {
      fetchTherapists({ target: { value: watch('locationId') } })
    }
  }, [locations, watch('locationId')])

  const fetchLocations = async () => {
    setLoading((prev) => {
      return { ...prev, location: true }
    })
    try {
      const res = await axios.get('/location/all', {
        headers: {
          Authorization:
            localStorage.getItem('userToken') ||
            sessionStorage.getItem('userToken'),
        },
      })

      setLocations(res.data.data)
      console.log(slot)

      //   setValue('locationId', slot.teamMember.location.id)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong while fetching locations. Please, reload the page!'
      )
    } finally {
      setLoading((prev) => {
        return { ...prev, location: false }
      })
    }
  }

  useEffect(() => {
    if (axios.defaults.baseURL && isAuthenticated ) {
      fetchLocations()
    }
  }, [axios.defaults, isAuthenticated])

  const fetchTherapists = async (locationId) => {
    setLoading((prev) => {
      return { ...prev, therapist: true }
    })
    try {
      const res = await axios.post('/team-member/location', {
        locationId: locationId.target.value,
      })

      setTherapists(res.data.data)
    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.message ||
          'Something went wrong while fetching therapists. Please, try again!'
      )
    } finally {
      setLoading((prev) => {
        return { ...prev, therapist: false }
      })
    }
  }

  const onSubmit = async (formData) => {
    if (loading.update) return
    setLoading(prev => ({ ...prev, update: true }))
    const data = {
      id: params.appointmentId,
      date: toLocalISO(formData.date),
      slotsId: Number(formData.slot),
    }
    try {
      await axios.put('/appointments/update', data)
      toast.success('Appointment slot updated succesfully!')
      router.push('/admin/appointments/'+ params.appointmentId)
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message ||error.message || 'Something went wrong')
    } finally {
      setLoading(prev => ({ ...prev, update: false }))
    }
  }

  const fetchSlots = async () => {
    setLoading((prev) => ({ ...prev, slot: true }))
    try {
      const isoString = toLocalISO(date)
      console.log(isoString)

      const res = await axios.post('/slots/date', {
        date: isoString,
        teamMemberId: therapist,
      })

      setSlots(res.data.data)
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading((prev) => ({ ...prev, slot: false }))
    }
  }

  useEffect(() => {
    if (date && therapist) {
      fetchSlots()
    } else {
      setSlots(null)
    }
  }, [date, therapist])

  return (
    <div>
      <div className='h-[104px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Change Appointment Slot</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-4 max-w-2xl'
        >
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label htmlFor='date' className='text-sm font-semibold text-black'>
              Appointment Date<span className='text-primary'>*</span>
            </label>
            <Controller
              name='date'
              control={control}
              defaultValue={null} // Default value for the date field
              rules={{
                required: 'Date is required',
                validate: (value) => {
                  if (!value) return 'Date is required'
                  return true
                },
              }}
              render={({ field }) => (
                <DatePicker
                  wrapperClassName='w-full'
                  selected={field.value}
                  onChange={(date) => {
                    field.onChange(date)
                    setDate(date)
                  }}
                  minDate={new Date()} // Disable past dates
                  placeholderText='Select a date'
                  className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.date ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.date?.message || ' '}
            </motion.p>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='location'
              className='text-sm font-semibold text-black'
            >
              Clinic Location
              <span className='text-primary'>*</span>
            </label>
            <Controller
              name='locationId'
              control={control}
              rules={{
                required: 'Clinic location is required',
              }}
              render={({ field }) => (
                <select
                  name='location'
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    fetchTherapists(e)
                  }}
                  id='location'
                  className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.locationId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {loading.location ? (
                    <option>Loading...</option>
                  ) : locations?.length > 0 ? (
                    <>
                      <option value=''>Select a location</option>
                      {locations.map((el) => (
                        <option key={el.id} value={el.id.toString()}>
                          {el.name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value=''>No locations available</option>
                  )}
                </select>
              )}
            />
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='therapist'
              className='text-sm font-semibold text-black'
            >
              Therapist
              <span className='text-primary'>*</span>
            </label>
            <Controller
              name='therapistId'
              control={control}
              rules={{
                required: 'Therapist is required',
              }}
              render={({ field }) => (
                <select
                  name='therapistId'
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    setTherapist(e.target.value) // Make sure setTherapist takes a string, not an event
                  }}
                  id='therapistId'
                  className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.therapistId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {loading.therapist ? (
                    <option>Loading...</option>
                  ) : therapists?.length > 0 ? (
                    <>
                      <option value=''>Select a therapist</option>
                      {therapists.map((el) => (
                        <option key={el.id} value={el.id.toString()}>
                          {el.name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value=''>No therapists available</option>
                  )}
                </select>
              )}
            />
          </Animated>
          <Animated className='mb-4 w-full'>
            <label htmlFor='slot' className='text-sm font-semibold text-black'>
              Slots<span className='text-primary'>*</span>
            </label>
            {loading.slot ? (
              <div className='flex justify-center items-center py-4'>
                <div className='w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin'></div>
              </div>
            ) : slots === null ? (
              <p className='text-gray-500'>
                Choose a date, a clinic location and a therapist.
              </p>
            ) : slots?.length > 0 ? (
              <div className='flex flex-wrap gap-4 mt-1'>
                {slots
                  .sort((a, b) => {
                    const [aTime, aPeriod] = a.startTime.split(' ')
                    let [aHour, aMinute] = aTime.split(':').map(Number)

                    const [bTime, bPeriod] = b.startTime.split(' ')
                    let [bHour, bMinute] = bTime.split(':').map(Number)

                    // Convert to 24-hour format
                    if (aPeriod.toLowerCase() === 'pm' && aHour !== 12) {
                      aHour += 12
                    } else if (aPeriod.toLowerCase() === 'am' && aHour === 12) {
                      aHour = 0
                    }

                    if (bPeriod.toLowerCase() === 'pm' && bHour !== 12) {
                      bHour += 12
                    } else if (bPeriod.toLowerCase() === 'am' && bHour === 12) {
                      bHour = 0
                    }

                    return aHour * 60 + aMinute - (bHour * 60 + bMinute)
                  })
                  .map((slot) => (
                    <label key={slot.id} className='relative cursor-pointer'>
                      <input
                        type='radio'
                        name='slot'
                        value={slot.id}
                        {...register('slot', {
                          required: 'Please select a slot',
                        })}
                        className='hidden'
                      />
                      <div
                        className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                          watch('slot') == slot.id
                            ? 'border-primary bg-primary/20'
                            : ''
                        } `}
                      >
                        {slot.startTime}
                      </div>
                    </label>
                  ))}
              </div>
            ) : (
              <p className='text-gray-500'>No slots available.</p>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.slot ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.slot?.message || ' '}
            </motion.p>
          </Animated>

          <Button type='submit' variant='primary' className='w-full'>
            {loading.update ? 'Updating Slot...' : 'Update Slot'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChangeAppointmentSlot
