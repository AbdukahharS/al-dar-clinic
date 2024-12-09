import { Inter } from 'next/font/google'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import Animated from '@/components/Animated'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Book = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  return (
    <div
      className={`md:shadow-[0px_4px_21.6px_0px_rgba(0,0,0,0.08)] md:rounded-3xl bg-white max-w-[800px] mx-auto mt-4 md:mt-24 px-5 py-7 ${inter.className}`}
    >
      <Animated animationType='fadeInLeft'>
        <h1 className='text-primary text-2xl font-semibold'>Appointment</h1>
      </Animated>
      <form className='mt-10'>
        <div className='flex flex-col md:flex-row md:flex-wrap'>
          <div className='mb-4'>
            <label htmlFor='name' className='text-primary'>
              Name*
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
              {errors.name?.message}
            </motion.p>
          </div>

          <div className='mb-4'>
            <label htmlFor='phone' className='text-primary'>
              Phone*
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
          </div>
        </div>
      </form>
    </div>
  )
}

export default Book
