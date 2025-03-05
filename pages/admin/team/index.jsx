import Button from '@/components/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPen, FaTrashCan } from 'react-icons/fa6'
import Image from 'next/image'
import confirm from '@/components/Confirm'

import axios from 'axios'

const TeamManagement = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/team-member/all')
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }

    fetchTeamMembers()
  }, [])

  const handleDelete = async (id) => {
    const deleteMember = async () => {
      try {
        await axios.delete('/team-member/' + id)
        setData((prev) => prev.filter((el) => el.id !== id))
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }

    confirm(
      'Delete Team Member',
      'Are you sure you want to delete this team member?',
      'Delete',
      deleteMember
    )
  }

  return (
    <div>
      <div className='h-[96px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
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
              <th className='px-4 py-5 font-medium whitespace-nowrap'>No</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Name</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Position
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Clinic Location
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Specialty
              </th>
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
                  {index + 1}
                </td>
                <td className='px-3 py-4 whitespace-nowrap text-center'>
                  {member.name}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {member.position}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {member.location?.name}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {member.specialty}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <Image
                    src={member.image.thumbnail}
                    alt={member.name}
                    width={96}
                    height={96}
                    loading='lazy'
                    className='w-24 h-24 rounded-full mx-auto'
                  />
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-3'>
                    <Link href={`/admin/team/${member.id}`}>
                      <FaPen className='mx-auto text-xl' />
                    </Link>
                    <button onClick={() => handleDelete(member.id)}>
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
