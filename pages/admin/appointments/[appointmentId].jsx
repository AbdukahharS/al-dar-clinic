import { useRouter } from 'next/navigation'
import {
  FaArrowLeft,
  FaClock,
  FaLocationDot,
  FaUser,
  FaWallet,
} from 'react-icons/fa6'

import Button from '@/components/Button'

const AppointmentDetails = () => {
  const router = useRouter()
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
                  <td className='px-4 pt-3 pb-1'>Sam Jordan</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>EMAIL:</td>
                  <td className='px-4 py-1'>samjordan@gmail.com</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>PHONE:</td>
                  <td className='px-4 py-1'>4746565846</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>GENDER:</td>
                  <td className='px-4 py-1'>Male</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>TYPE:</td>
                  <td className='px-4 py-1'>Physio</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>MESSAGE:</td>
                  <td className='px-4 py-1'>-</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>AGE:</td>
                  <td className='px-4 pt-1 pb-3'>21</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='border rounded-lg bg-white mt-5'>
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
          </div>
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
                  <td className='px-4 pt-3 pb-1'>11-10-24, Mon</td>
                </tr>

                <tr className='border-b'>
                  <td className='font-bold px-4 py-1'>LOCATION:</td>
                  <td className='px-4 py-1'>Oman</td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>MEDIUM:</td>
                  <td className='px-4 pt-1 pb-3'>Online</td>
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
                  <td className='px-4 pt-3 pb-1'>
                    House 30, Road 1B, Block: A, Dubai - 25315
                  </td>
                </tr>
                <tr className='border-b'>
                  <td className='font-bold px-4 pt-1 pb-3'>POSTAL CODE:</td>
                  <td className='px-4 pt-1 pb-3'>25315</td>
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
