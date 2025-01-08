import Button from '@/components/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPen, FaTrashCan } from 'react-icons/fa6'
import Image from 'next/image'

import Mohammed from '@/public/images/dr-mohamad.webp'
import Alex from '@/public/images/dr-alex.webp'
import Nauf from '@/public/images/dr-nauf.webp'
import Abdul from '@/public/images/dr-abdul.webp'
import Othman from '@/public/images/dr-dillibabu.webp'

const dummyData = [
  {
    id: 1,
    name: 'Mohammed',
    role: 'Project Manager',
    email: 'mohammed@example.com',
    picture: Mohammed,
  },
  {
    id: 2,
    name: 'Alex',
    role: 'Developer',
    email: 'alex@example.com',
    picture: Alex,
  },
  {
    id: 3,
    name: 'Nauf',
    role: 'Designer',
    email: 'nauf@example.com',
    picture: Nauf,
  },
  {
    id: 4,
    name: 'Abdul',
    role: 'Marketing',
    email: 'abdul@example.com',
    picture: Abdul,
  },
  {
    id: 5,
    name: 'Othman',
    role: 'QA Engineer',
    email: 'othman@example.com',
    picture: Othman,
  },
]

const TeamManagement = () => {
  const [data, setData] = useState(dummyData)

  useEffect(() => {
    setData(dummyData)
  }, [])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Team Management</h1>
        <div className='flex items-center gap-4'>
          <Link href='/admin/team/create'>
            <Button className='bg-white !text-primary rounded-lg p-2'>
              Add Team Member
            </Button>
          </Link>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto text-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Name</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Role</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Email</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Picture
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((member, index) => (
              <tr key={index} className='border'>
                <td className='px-3 py-4 whitespace-nowrap text-center'>
                  {member.name}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {member.role}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {member.email}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <Image
                    src={member.picture}
                    alt={member.name}
                    loading='lazy'
                    className='w-24 h-24 rounded-full mx-auto'
                  />
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-3'>
                    <Link href={`/admin/team/${member.id}`}>
                      <FaPen className='mx-auto text-xl' />
                    </Link>
                    <button>
                      <FaTrashCan className='mx-auto text-xl' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamManagement
