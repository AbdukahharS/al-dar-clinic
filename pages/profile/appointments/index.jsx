import { FaCircleInfo } from 'react-icons/fa6'

import Header from '@/components/layout/Header'

const appointments = [
  {
    patientName: 'Sam Jordan',
    type: 'Physio',
    email: 'samjordan@gmail.com',
    schedule: '10-10-2024',
  },
  {
    patientName: 'Sparsh',
    type: 'Counselling',
    email: 'sparsh@gmail.com',
    schedule: '19-08-2024',
  },
  {
    patientName: 'Manisha',
    type: 'Physio',
    email: 'manisha@gmail.com',
    schedule: '11-07-2024',
  },
  {
    patientName: 'Altaf',
    type: 'Physio',
    email: 'altaf@gmail.com',
    schedule: '15-05-2024',
  },
]

const Appointments = () => {
  return (
    <div>
      <Header pageTitle='Appointments' />
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto text-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Patient Name
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Type</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Email</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Schedule
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className='border'>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.patientName}
                </td>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.type}
                </td>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.email}
                </td>
                <td className='px-4 py-6 text-center whitespace-nowrap'>
                  {appointment.schedule}
                </td>
                <td className='px-4 py-6 text-primary whitespace-nowrap'>
                  <FaCircleInfo className='mx-auto text-xl' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-between mt-7 md:px-4'>
        <p className='text-gray-400'>Showing 1 to 4 of 20 results</p>
        <div className='flex flex-row items-center gap-2'>
          <button className='w-7 h-7 flex items-center justify-center rounded-full text-white bg-primary cursor-pointer'>
            1
          </button>
          <button className='w-7 h-7 flex items-center justify-center rounded-full text-primary border border-primary cursor-pointer'>
            2
          </button>
          <span>....</span>
          <button className='w-7 h-7 flex items-center justify-center rounded-full text-primary border border-primary cursor-pointer'>
            5
          </button>
        </div>
      </div>
    </div>
  )
}

export default Appointments
