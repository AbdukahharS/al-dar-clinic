import { useParams, useRouter } from 'next/navigation'
import {
  FaArrowLeft,
  FaClock,
  FaLocationDot,
  FaUser,
  FaWallet,
} from 'react-icons/fa6'

import Button from '@/components/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AppointmentDetails = () => {
  const router = useRouter()
  const [appointment, setAppointment] = useState({})
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
    if (params?.appointmentId && axios.defaults.baseURL) {
      fetchAppointment()
    }
  }, [axios, params])
  console.log(appointment)

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
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
            <table className='table-auto w-full border-collapse'>
              <tbody>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-3 pb-1'>NAME:</td>
                  <td className='px-4 pt-3 pb-1'>{appointment.fullname}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>EMAIL:</td>
                  <td className='px-4 py-1'>{appointment.email}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>PHONE:</td>
                  <td className='px-4 py-1'>{appointment.phone}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>GENDER:</td>
                  <td className='px-4 py-1'>{appointment.gender}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>TYPE:</td>
                  <td className='px-4 py-1'>{appointment.serviceType?.name}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>MESSAGE:</td>
                  <td className='px-4 py-1'>{appointment.message}</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>AGE:</td>
                  <td className='px-4 pt-1 pb-3'>{appointment.age}</td>
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
                  <td className='font-bold px-4 pt-1 pb-3'>MEDIUM:</td>
                  <td className='px-4 pt-1 pb-3'>{appointment.medium}</td>
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
