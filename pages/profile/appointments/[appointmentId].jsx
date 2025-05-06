import Image from 'next/image'
import { FaWallet, FaUser, FaClock, FaLocationDot, FaCross, FaX } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import Header from '@/components/layout/Header'
import useAuth from '@/hooks/useAuth'
import asiaPay from '@/public/icons/asia-pay.svg'

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

const Appointments = () => {
  const params = useParams()
  const [appointment, setAppointment] = useState({})
  const [slot, setSlot] = useState({})
  const { isAuthenticated } = useAuth()

  console.log('appointment', appointment)
  

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get('/appointments/' + params?.appointmentId)
        setAppointment(res.data.data)
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong')
      }
    }
    if (params?.appointmentId && isAuthenticated) {
      fetchAppointment()
    }
  }, [params, isAuthenticated])

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
  }, [ appointment ])
  

  // console.log("appointment", appointment)

  return (
    <div>
      <Header pageTitle='Appointment Details' bg />
      {appointment?.id && (
        <div className='flex flex-col md:flex-row gap-5 z-10 relative'>
          <div className='w-full md:w-[calc(50%-10px)]'>
            <div className='border rounded-lg bg-white w-full'>
              <div className='flex items-center flex-row p-4 font-semibold gap-3 border-b'>
                <FaUser className='text-primary text-xl' />
                Patient Information
              </div>
              <table className='w-full border-collapse table-fixed'>
                <tbody>
                  <tr className='border-b'>
                    <td className='font-bold px-4 pt-3 pb-1 w-[120px]'>
                      NAME:
                    </td>
                    <td className='px-4 pt-3 pb-1 break-words'>
                      {appointment.fullname}
                    </td>
                  </tr>
                  <tr className='border-b'>
                    <td className='font-bold px-4 py-1 w-[120px]'>EMAIL:</td>
                    <td className='px-4 py-1 break-words'>
                      {appointment.email}
                    </td>
                  </tr>
                  <tr className='border-b'>
                    <td className='font-bold px-4 py-1 w-[120px]'>PHONE:</td>
                    <td className='px-4 py-1 break-words'>
                      {appointment.phone}
                    </td>
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
                 <td className='px-4 pt-3 pb-1'>
                   {appointment.paymentMethod}
                 </td>
               </tr>
               <tr className='border-b'>
                 <td className='font-bold px-4 pt-1 pb-3'>PAYABLE AMOUNT:</td>
                 <td className='px-4 pt-1 pb-3'>
                   {appointment.payableAmount}
                 </td>
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
                    <td className='font-bold px-4 py-1'>CLINIC LOCATION:</td>
                    <td className='px-4 py-1'>
                      {slot?.teamMember?.location.name ||
                        appointment.location?.name}
                    </td>
                  </tr>
                  <tr className='border-b'>
                    <td className='font-bold px-4 pt-1'>MEDIUM:</td>
                    <td className='px-4 pt-1'>{appointment.medium}</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='font-bold px-4 pt-1'>SLOT:</td>
                    <td className='px-4 pt-1'>
                      {slot.id
                        ? `${slot.startTime} - ${calculateEndTime(
                            slot.startTime,
                            slot.duration
                          )}`
                        : '-'}
                    </td>
                  </tr>
                  <tr className='border-b'>
                    <td className='font-bold px-4 pt-1 pb-3'>THERAPIST:</td>
                    <td className='px-4 pt-1 pb-3'>
                      {slot.teamMember ? slot.teamMember.name : '-'}
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
                    <td className='font-bold px-4 pt-1 pb-3'>AREA/CITY:</td>
                    <td className='px-4 pt-1 pb-3'>{appointment.postalCode}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) }
      
      {
        appointment?.isCancelled && (
          <div className='flex flex-col gap-5 justify-center items-center mt-8'>
            <div className='bg-red-600 rounded-full p-4'>
            <FaX className='text-white text-3xl' />
            </div>
            <p className='text-red-500 font-medium lg:text-xl text-center'>
              Your Appointment has been Cancelled
            </p>
          </div>
        )
      }
      <div className='mt-8'>
        <p className='md:text-lg xl:text-xl text-center md:pt-6 pb-12 tracking-wide'>
          We accept payment: Iraq / AsiaPay{' '}
          <Image
            src={asiaPay}
            height={44}
            weight={44}
            alt='Asia Pay Icon'
            className='inline w-11 h-11'
          />{' '}
          <span className='text-primary'>+964 775 776 6919</span> <br /> OMAN /
          MOBILE PAYMENT <span className='text-primary'>+968 9199 2031</span>
        </p>
      </div>
    </div>
  )
}

export default Appointments
