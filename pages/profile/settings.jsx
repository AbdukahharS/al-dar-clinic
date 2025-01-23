import { useEffect } from 'react'
import Image from 'next/image'
import { FaUserLarge, FaUpload } from 'react-icons/fa6'

import Header from '@/components/layout/Header'
import Button from '@/components/Button'
import Animated from '@/components/Animated'
import useAuth from '@/hooks/useAuth'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Settings = () => {
  const { loading, user, updateUser, addPFP } = useAuth()
  const { register, handleSubmit, reset } = useForm()

  // Check if the form has any changes
  useEffect(() => {
    if (user) {
      // Set default values from the user data
      reset({
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        postalCode: user.postal,
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    // Construct the full name from first and last name
    const fullName = `${data.firstName} ${data.lastName}`

    // Only send email and phone if they have changed
    const updates = {
      name: fullName,
      address: data.address,
      city: data.city,
      state: data.state,
      postal: data.postalCode,
    }

    if (data.email !== user.email) {
      updates.email = data.email
    }

    if (data.phone !== user.phone) {
      updates.phone = data.phone
    }

    await updateUser(updates)
  }

  const handleProfilePicture = async (e) => {
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const res = await axios.post('/users/upload', formData)
      addPFP(res.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong'
      )
    }
  }

  return (
    <div>
      <Header pageTitle='Profile Settings' />
      {!loading.user && user?.id && (
        <>
          <div className='flex flex-row items-center gap-7'>
            <div className='relative w-[90px] h-[90px] bg-primary text-white text-5xl flex items-center justify-center rounded-full'>
              {user?.image?.original ? (
                <Image
                  src={user.image.original}
                  alt='User Profile'
                  fill
                  loading='lazy'
                  className='w-full h-full object-cover rounded-full'
                />
              ) : (
                <FaUserLarge />
              )}

              <label htmlFor='PFP'>
                <Button
                  variant='ghost'
                  size='iconSM'
                  className='absolute bg-primary border border-white rounded-full text-sm right-0 bottom-0'
                  onClick={() => document.getElementById('PFP')?.click()}
                >
                  <FaUpload />
                </Button>
                <input
                  type='file'
                  accept='image/*'
                  id='PFP'
                  name='PFP'
                  className='hidden'
                  onChange={handleProfilePicture}
                />
              </label>
            </div>
            <h2 className='text-gray-700 font-semibold'>{user.name}</h2>
          </div>
          <form className='mt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  defaultValue={user.name.split(' ')[0]}
                  {...register('firstName')}
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
                  defaultValue={user.name.split(' ')[1]}
                  {...register('lastName')}
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
                  defaultValue={user.email}
                  placeholder='Enter Email...'
                  {...register('email')}
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
                  defaultValue={user.phone}
                  placeholder='Enter Phone Number...'
                  {...register('phone')}
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated>
              {/* <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
                <label className='font-medium text-gray-500' htmlFor='address'>
                  Address*
                </label>
                <input
                  type='text'
                  id='address'
                  placeholder='Enter Address...'
                  defaultValue={user.address}
                  {...register('address')}
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
                  defaultValue={user.city}
                  placeholder='Enter City...'
                  {...register('city')}
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
                  defaultValue={user.state}
                  placeholder='Enter State...'
                  {...register('state')}
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
                  defaultValue={user.postal}
                  placeholder='Enter Postal Code...'
                  {...register('postalCode')}
                  className='w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 border-gray-300'
                />
              </Animated> */}
            </div>
            <Button
              type='submit'
              className={`mt-6 md:mt-14 w-full md:w-fit md:!px-14`}
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
