import { useState } from 'react'
import { Inter } from 'next/font/google'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-number-input'
import { FaCircleXmark, FaCircleCheck } from 'react-icons/fa6'
import 'react-phone-number-input/style.css'

import Animated from '@/components/Animated'
import Button from '@/components/Button'
import Link from 'next/link'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Book = () => {
  const [message, setMessage] = useState()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ z: -20, opacity: 0 }}
          animate={t.visible ? { z: 100, opacity: 1 } : { z: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute -top-4 -left-4 w-screen !h-screen bg-black/60 flex items-center justify-center p-5'
        >
          <motion.div
            initial={{ y: 15 }}
            animate={t.visible ? { y: 0 } : { y: 15 }}
            className='w-[100%] max-w-5xl md:mx-auto bg-white rounded-2xl p-3 pb-12 md:p-8 md:pb-20'
          >
            <Button
              size='icon'
              variant='ghost'
              onClick={() => toast.dismiss(t.id)}
              className='ml-auto'
            >
              <FaCircleXmark className='text-primary text-4xl' />
            </Button>
            <div>
              <FaCircleCheck className='text-primary text-[156px] md:text-[238px] mx-auto' />
            </div>
            <p className='text-xl font-medium md:text-4xl text-center py-12 md:mt-18 tracking-wide'>
              Your Appointment is Confirmed
            </p>
            <div className='flex flex-row items-center justify-center gap-4 md:hidden'>
              <Link href='/profile/appointments/1'>
                <Button
                  variant='outline'
                  className='text-primary border-primary'
                  size='sm'
                >
                  Appointment details
                </Button>
              </Link>
              <Button size='sm' onClick={() => toast.dismiss(t.id)}>
                Continue
              </Button>
            </div>
            <div className='hidden flex-row items-center justify-center gap-8 md:flex'>
              <Link href='/profile/appointments/1'>
                <Button
                  variant='outline'
                  className='text-primary border-primary'
                >
                  Appointment details
                </Button>
              </Link>
              <Button onClick={() => toast.dismiss(t.id)}>Continue</Button>
            </div>
          </motion.div>
        </motion.div>
      ),
      { duration: Infinity }
    )
  }

  return (
    <div
      className={`md:shadow-[0px_4px_21.6px_0px_rgba(0,0,0,0.08)] md:rounded-3xl md:bg-white max-w-[800px] mx-auto mt-4 md:mb-16 md:mt-24 px-5 py-7 ${inter.className}`}
    >
      <Animated animationType='fadeInLeft'>
        <h1 className='text-primary text-2xl font-semibold'>Appointment</h1>
      </Animated>
      <form className='mt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='flex flex-col md:flex-row md:flex-wrap md:gap-x-10'>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label htmlFor='name' className='text-sm font-semibold text-black'>
              Full name<span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              id='name'
              {...register('name', {
                required: 'Name is required',
              })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.name ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.name?.message || ' '}
            </motion.p>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label htmlFor='email' className='text-sm font-semibold text-black'>
              Email<span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter correct email id',
                },
              })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.email ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.email?.message || ' '}
            </motion.p>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label htmlFor='age' className='text-sm font-semibold text-black'>
              Age in years<span className='text-primary'>*</span>
            </label>
            <input
              type='number'
              id='age'
              {...register('age', {
                required: 'Age is required',
                validate: (value) => value > 0 || 'Enter proper age',
              })}
              min={0}
              className={`w-full no-spinner mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.age ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.age?.message || ' '}
            </motion.p>
          </Animated>

          <Animated className='mb-4 md:w-[calc(50%-20px)] w-full'>
            <label htmlFor='phone' className='text-sm font-semibold text-black'>
              Phone<span className='text-primary'>*</span>
            </label>
            <Controller
              name='phone'
              control={control}
              defaultValue=''
              rules={{
                required: 'Phone number is required',
                validate: (value) =>
                  value?.length >= 10 || 'Please enter a valid phone number',
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  id='phone'
                  defaultCountry='AE'
                  className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.phone ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.phone?.message}
            </motion.p>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label htmlFor='date' className='text-sm font-semibold text-black'>
              Appointment Date<span className='text-primary'>*</span>
            </label>
            <input
              type='date'
              id='date'
              {...register('date', {
                required: 'Date is required',
                validate: (value) => {
                  const selectedDate = new Date(value)
                  const day = selectedDate.getDay()
                  return (day !== 0 && day !== 6) || 'Weekends are not allowed'
                },
              })}
              min={new Date().toISOString().split('T')[0]} // Disallow past dates
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.date ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.date?.message || ' '}
            </motion.p>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='address'
              className='text-sm font-semibold text-black'
            >
              Street Address<span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              id='address'
              {...register('address', {
                required: 'Address is required',
              })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.address ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.address?.message || ' '}
            </motion.p>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='postal'
              className='text-sm font-semibold text-black'
            >
              Postal Code<span className='text-primary'>*</span>
            </label>
            <input
              type='text'
              id='postal'
              {...register('postal', {
                required: 'Postal code is required',
              })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.postal ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: errors.postal ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.postal?.message || ' '}
            </motion.p>
          </Animated>
          <div className='mb-4 hidden md:block w-[calc(50%-20px)]'></div>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='serviceType'
              className='text-sm font-semibold text-black'
            >
              Type of Service<span className='text-primary'>*</span>
            </label>
            <select
              name='serviceType'
              id='serviceType'
              defaultValue='consultation'
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
              {...register('serviceType')}
            >
              <option value='consultation'>Doctor&apos;s Consultation</option>
              <option value='counseling'>Counseling</option>
              <option value='physio'>Physio</option>
            </select>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='gender'
              className='text-sm font-semibold text-black'
            >
              Gender<span className='text-primary'>*</span>
            </label>
            <select
              name='gender'
              id='gender'
              defaultValue='male'
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
              {...register('gender')}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='location'
              className='text-sm font-semibold text-black'
            >
              Location<span className='text-primary'>*</span>
            </label>
            <select
              name='location'
              id='location'
              defaultValue='dubai'
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
              {...register('location')}
            >
              <option value='dubai'>Dubai</option>
              <option value='oman'>Oman</option>
              <option value='Iraq'>Iraq</option>
            </select>
          </Animated>
          <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
            <label
              htmlFor='medium'
              className='text-sm font-semibold text-black'
            >
              Consultation medium<span className='text-primary'>*</span>
            </label>
            <select
              name='medium'
              id='medium'
              defaultValue='offline'
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
              {...register('medium')}
            >
              <option value='offline'>Offline</option>
              <option value='online'>Online</option>
            </select>
          </Animated>
          <Animated className='relative w-full mb-4'>
            <label
              htmlFor='message'
              className={`absolute left-4 top-2 transition-all duration-200 ease-in-out ${
                message && 'hidden'
              }`}
            >
              Message (<span className='text-primary'>Optional</span>)
            </label>
            <textarea
              name='message'
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary'
              rows={5}
              {...register('mesage')}
            ></textarea>
          </Animated>
          <Animated className='flex flex-row items-center gap-[25px]'>
            <Button type='submit' className='font-semibold !py-3 !px-14'>
              Submit
            </Button>
            <Button
              variant='outline'
              className=' text-red-500 border-red-500 font-semibold !py-3'
            >
              Cancel
            </Button>
          </Animated>
        </div>
      </form>
    </div>
  )
}

export default Book
