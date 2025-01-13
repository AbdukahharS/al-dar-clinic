import Image from 'next/image'
import { FaUserLarge, FaUpload } from 'react-icons/fa6'

import Header from '@/components/layout/Header'
import Button from '@/components/Button'
import Animated from '@/components/Animated'
import useAuth from '@/hooks/useAuth'

const Settings = () => {
  const { loading, user } = useAuth()
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <Header pageTitle='Profile Settings' />
      {!loading.user && user?.id && (
        <>
          <div className='flex flex-row items-center gap-7'>
            <div className='relative w-[90px] h-[90px] bg-primary text-white text-5xl flex items-center justify-center rounded-full'>
              {false ? ( // Check if User have profile picture uploaded
                <Image src={user.profileImage} alt='User profile' fill />
              ) : (
                <FaUserLarge />
              )}
              <Button
                variant='ghost'
                size='iconSM'
                className='absolute bg-primary border border-white rounded-full text-sm right-0 bottom-0'
              >
                <FaUpload />
              </Button>
            </div>
            <h2 className='text-gray-700 font-semibold'>{user.name}</h2>
          </div>
          <form className='mt-10' onSubmit={handleSubmit} noValidate>
            <div className='flex flex-col md:flex-row md:flex-wrap md:gap-x-10'>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label
                  className='font-medium text-gray-500'
                  htmlFor='firstName'
                >
                  First Name*
                </label>
                <input
                  type='text'
                  id='firstName'
                  placeholder='Enter First Name...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='lastName'>
                  Last Name*
                </label>
                <input
                  type='text'
                  id='lastName'
                  placeholder='Enter Last Name...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='email'>
                  Email*
                </label>
                <input
                  type='text'
                  id='email'
                  placeholder='Enter Email...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='phone'>
                  Phone*
                </label>
                <input
                  type='text'
                  id='phone'
                  placeholder='Enter Phone Number...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='address'>
                  Address*
                </label>
                <input
                  type='text'
                  id='address'
                  placeholder='Enter Address...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='city'>
                  City*
                </label>
                <input
                  type='text'
                  id='city'
                  placeholder='Enter City...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='state'>
                  State*
                </label>
                <input
                  type='text'
                  id='state'
                  placeholder='Enter State...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label
                  className='font-medium text-gray-500'
                  htmlFor='postalCode'
                >
                  Postal Code*
                </label>
                <input
                  type='text'
                  id='postalCode'
                  placeholder='Enter Postal Code...'
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
            </div>
            <Button
              disabled={true}
              className='mt-6 md:mt-14 w-full md:w-fit md:!px-14'
            >
              Update
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default Settings
