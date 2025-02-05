import { FaWallet, FaUser, FaClock, FaLocationDot } from 'react-icons/fa6'

import Header from '@/components/layout/Header'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'

const Appointments = () => {
  const params = useParams()
  const [appointment, setAppointment] = useState({})
  const { isAuthenticated } = useAuth()

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

    if (params?.appointmentId && axios.defaults.baseURL && isAuthenticated) {
      fetchAppointment()
    }
  }, [params, axios.defaults.baseURL, isAuthenticated])

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
      )}
    </div>
  )
}

export default Appointments