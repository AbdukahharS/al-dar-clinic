import { useState } from 'react'
import Link from 'next/link'
import { FaPen, FaTrashCan } from 'react-icons/fa6'
import Image from 'next/image'
import Button from '@/components/Button'

import dubai from '@/public/images/dubai.webp'
import dubai1 from '@/public/images/dubai-1.webp'
import dubai2 from '@/public/images/dubai-2.webp'
import dubai3 from '@/public/images/dubai-3.webp'
import dubai4 from '@/public/images/dubai-4.webp'
import oman from '@/public/images/oman.webp'
import oman1 from '@/public/images/oman-1.webp'
import oman2 from '@/public/images/oman-2.webp'
import oman3 from '@/public/images/oman-3.webp'
import oman4 from '@/public/images/oman-4.webp'
import iraq from '@/public/images/iraq.webp'
import iraq1 from '@/public/images/iraq-1.webp'
import iraq2 from '@/public/images/iraq-2.webp'
import iraq3 from '@/public/images/iraq-3.webp'
import iraq4 from '@/public/images/iraq-4.webp'

const dummyLocations = [
  {
    id: 1,
    name: 'Dubai',
    mainPicture: dubai,
    pictures: [dubai1, dubai2, dubai3, dubai4],
    telephone: '+971 4 123 4567',
    email: 'dubai@example.com',
  },
  {
    id: 2,
    name: 'Oman',
    mainPicture: oman,
    pictures: [oman1, oman2, oman3, oman4],
    telephone: '+968 24 123 456',
    email: 'oman@example.com',
  },
  {
    id: 3,
    name: 'Iraq',
    mainPicture: iraq,
    pictures: [iraq1, iraq2, iraq3, iraq4],
    telephone: '+964 1 123 4567',
    email: 'iraq@example.com',
  },
]

const LocationManagement = () => {
  const [locations, setLocations] = useState(dummyLocations)

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Location Management</h1>
        <div className='flex items-center gap-4'>
          <Link href='/admin/location/create'>
            <Button className='bg-white !text-primary rounded-lg p-2'>
              Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto text-gray-700'>
          <thead>
            <tr>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Name</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Main Picture
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Other Pictures
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Telephone
              </th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>Email</th>
              <th className='px-4 py-5 font-medium whitespace-nowrap'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index} className='border'>
                <td className='px-3 py-4 whitespace-nowrap text-center'>
                  {location.name}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <Image
                    src={location.mainPicture}
                    alt={location.name}
                    loading='lazy'
                    className='w-32 h-24 rounded mx-auto'
                  />
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  <div className='flex justify-center gap-2'>
                    {location.pictures.map((pic, idx) => (
                      <Image
                        key={idx}
                        src={pic}
                        alt={`${location.name} ${idx + 1}`}
                        loading='lazy'
                        className='w-12 h-12 rounded-full'
                      />
                    ))}
                  </div>
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {location.telephone}
                </td>
                <td className='px-3 py-4 text-center whitespace-nowrap'>
                  {location.email}
                </td>
                <td className='px-3 py-4 text-primary whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-3'>
                    <Link href={`/admin/location/${location.id}`}>
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

export default LocationManagement
