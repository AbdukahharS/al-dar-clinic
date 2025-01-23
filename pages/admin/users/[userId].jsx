import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'

import Button from '@/components/Button'
import Animated from '@/components/Animated'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'

const User = () => {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState({})
  const { isAuthenticated } = useAuth()

  const fetchUser = async () => {
    try {
      const res = await axios.get('/users/' + params.userId)
      setUser(res.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong. Please refresh the page!'
      )
    }
  }

  useEffect(() => {
    if (params?.userId && axios.defaults.baseURL && isAuthenticated) {
      fetchUser()
    }
  }, [params, axios.defaults.baseURL, isAuthenticated])

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>User Information</h1>
      </div>
      {user.id && (
        <div className='px-8 xl:px-20 py-7 md:py-14'>
          {user.image?.original ? (
            <Animated
              animationType='fadeIn'
              className='rounded-full overflow-hidden w-[185px] h-[185px] relative'
            >
              <Image
                src={user.image?.original}
                alt='User DP'
                fill
                loading='lazy'
                className='object-cover'
              />
            </Animated>
          ) : (
            ''
          )}
          <Animated className='mt-8'>
            <table className='table-auto w-full max-w-[512px]'>
              <tbody>
                <tr>
                  <td className='font-semibold px-4 pt-4 pb-2'>Name:</td>
                  <td className='px-4 pt-4 pb-2'>{user.name}</td>
                </tr>
                <tr>
                  <td className='font-semibold px-4 py-2'>Email ID:</td>
                  <td className='px-4 py-2'>{user.email || 'Not available'}</td>
                </tr>
                <tr>
                  <td className='font-semibold px-4 py-2'>Phone Number:</td>
                  <td className='px-4 py-2'>{user.phone || 'Not available'}</td>
                </tr>
                {/* <tr>
                  <td className='font-semibold px-4 py-2'>Address:</td>
                  <td className='px-4 py-2'>{user.street}</td>
                </tr>
                <tr>
                  <td className='font-semibold px-4 py-2'>City:</td>
                  <td className='px-4 py-2'>{user.city}</td>
                </tr>
                <tr>
                  <td className='font-semibold px-4 py-2'>State:</td>
                  <td className='px-4 py-2'>{user.state}</td>
                </tr>
                <tr>
                  <td className='font-semibold px-4 py-2'>Postal Code:</td>
                  <td className='px-4 py-2'>{user.postalCode}</td>
                </tr> */}
              </tbody>
            </table>
          </Animated>
        </div>
      )}
    </div>
  )
}

export default User
