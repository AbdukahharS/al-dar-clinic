import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPen, FaTrashCan } from 'react-icons/fa6'

import confirm from '@/components/Confirm'
import Button from '@/components/Button'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'

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

const SlotManagement = () => {
  const [data, setData] = useState(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/slots')

        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }

    if (isAuthenticated) {
      fetchTeamMembers()
    }
  }, [isAuthenticated])

  const handleDelete = async (id) => {
    const deleteMember = async () => {
      try {
        const res = await axios.delete('/slots/' + id)
        toast.success(res.data.message)

        // Filter out the deleted slot from state
        setData((prevData) => {
          if (!prevData) return prevData

          return Object.fromEntries(
            Object.entries(prevData)
              .map(([key, slots]) => [
                key,
                slots.filter((slot) => slot.id !== id),
              ])
              .filter(([, slots]) => slots.length > 0) // Remove empty categories
          )
        })
      } catch (error) {
        console.error('Error deleting slot:', error)
      }
    }

    confirm(
      'Delete a Slot',
      'Are you sure you want to delete this appointment slot?',
      'Delete',
      deleteMember
    )
  }

  return (
    <div>
      <div className='h-[104px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <h1 className='text-2xl font-medium'>Slot Management</h1>
        <div className='flex items-center gap-4'>
          <Link href='/admin/slot/create'>
            <Button className='bg-white !text-primary rounded-lg p-2'>
              Create Slots
            </Button>
          </Link>
        </div>
      </div>
      <div className=''>
        {data &&
          Object.entries(data).map(([key, value], i) => (
            <div key={i} className='py-4 px-8 border-b'>
              <h3 className='text-2xl font-medium'>{key}</h3>
              <div className='flex flex-row flex-wrap gap-6 mt-2 border-t pt-4'>
                {value
                  .slice() // Create a shallow copy to avoid mutating the original array
                  .sort((a, b) => {
                    const timeToMinutes = (time) => {
                      let [timePart, period] = time.split(' ')
                      let [hours, minutes] = timePart.split(':').map(Number)

                      if (period === 'PM' && hours !== 12) hours += 12
                      if (period === 'AM' && hours === 12) hours = 0

                      return hours * 60 + minutes
                    }

                    return (
                      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
                    )
                  })
                  .map((slot, i) => (
                    <div
                      key={i}
                      className='p-3 border rounded-lg flex flex-col'
                    >
                      <div className='flex justify-end mb-1'>
                        <Link href={`/admin/slot/${slot.id}`}>
                          <Button
                            variant='ghost'
                            size='iconSM'
                            className='text-blue-500'
                          >
                            <FaPen />
                          </Button>
                        </Link>
                        <Button
                          variant='ghost'
                          size='iconSM'
                          className='text-red-500'
                          onClick={() => handleDelete(slot.id)}
                        >
                          <FaTrashCan />
                        </Button>
                      </div>
                      <p>
                        {slot.startTime} -{' '}
                        {calculateEndTime(slot.startTime, slot.duration)}
                      </p>
                      <p>Duration: {slot.duration} mins</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SlotManagement
