import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { FaArrowLeft, FaClock, FaLocationDot, FaUser } from 'react-icons/fa6'

import Button from '@/components/Button'

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

const AppointmentDetails = () => {
  const router = useRouter()
  const [appointment, setAppointment] = useState({})
  const [slot, setSlot] = useState({})
  const params = useParams()

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
        setSlot(res.data.data)
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong')
      }
    }
    if (appointment.slotsId) {
      fetchSlot()
    }
  }, [appointment])

  return (
    <div>
      <div className='h-[104px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Appointment Details</h1>
      </div>
      <div className='flex flex-col md:flex-row gap-5 px-8 xl:px-20 py-7 md:py-14'>
        <div className='w-full md:w-[calc(50%-10px)]'>
          <div className='border rounded-lg bg-white'>
            <div className='flex items-center flex-row p-4 font-semibold gap-3 border-b'>
              <FaUser className='text-primary text-xl' />
              Patient Information
            </div>
            <table className='w-full border-collapse table-fixed'>
              <tbody>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-3 pb-1 w-[120px]'>NAME:</td>
                  <td className='px-4 pt-3 pb-1 break-words'>
                    {appointment.fullname}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1 w-[120px]'>EMAIL:</td>
                  <td className='px-4 py-1 break-words'>{appointment.email}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1 w-[120px]'>PHONE:</td>
                  <td className='px-4 py-1 break-words'>{appointment.phone}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1 w-[120px]'>GENDER:</td>
                  <td className='px-4 py-1 break-words'>
                    {appointment.gender}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1 w-[120px]'>TYPE:</td>
                  <td className='px-4 py-1 break-words'>
                    {appointment.serviceType?.name}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1 w-[120px]'>MESSAGE:</td>
                  <td className='px-4 py-1 break-words'>
                    {appointment.message}
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3 w-[120px]'>AGE:</td>
                  <td className='px-4 pt-1 pb-3 break-words'>
                    {appointment.age}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className='border rounded-lg bg-white mt-5'>
            <div className='flex items-center flex-row p-4 font-semibold gap-3 border-b'>
              <FaWallet className='text-primary text-xl' />
              Payment Information
            </div>
            <table className='table-auto w-full border-collapse'>
              <tbody>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-3 pb-1'>PAYMENT METHOD:</td>
                  <td className='px-4 pt-3 pb-1'>Online Payment</td>
                </tr>

                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>PAYABLE AMOUNT:</td>
                  <td className='px-4 pt-1 pb-3'>200 Aed</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
        <div className='w-full md:w-[calc(50%-10px)]'>
          <div className='border rounded-lg bg-white'>
            <div className='flex items-center flex-row p-4 font-semibold gap-3 border-b'>
              <FaClock className='text-primary text-xl' />
              Schedule Information
            </div>
            <table className='table-auto w-full border-collapse'>
              <tbody>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-3 pb-1'>DATE:</td>
                  <td className='px-4 pt-3 pb-1'>
                    {new Date(appointment.date)
                      .toLocaleDateString('en-IN', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                      })
                      .replace(/\//g, '-') +
                      ', ' +
                      new Date(appointment.date).toLocaleString('en-US', {
                        weekday: 'short',
                      })}
                  </td>
                </tr>

                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>LOCATION:</td>
                  <td className='px-4 py-1'>{appointment.location?.name}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1'>MEDIUM:</td>
                  <td className='px-4 pt-1'>{appointment.medium}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>SLOT:</td>
                  <td className='px-4 pt-1 pb-3'>
                    {slot.id
                      ? `${slot.startTime} - ${calculateEndTime(
                          slot.startTime,
                          slot.duration
                        )}`
                      : '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='border rounded-lg bg-white mt-5'>
            <div className='flex items-center flex-row p-4 font-semibold gap-3 border-b'>
              <FaLocationDot className='text-primary text-xl' />
              Address
            </div>
            <table className='table-auto w-full border-collapse'>
              <tbody>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-3 pb-1'>ADDRESS:</td>
                  <td className='px-4 pt-3 pb-1'>{appointment.address}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>POSTAL CODE:</td>
                  <td className='px-4 pt-1 pb-3'>{appointment.postalCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails
