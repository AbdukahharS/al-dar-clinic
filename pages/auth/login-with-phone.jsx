import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Inter } from 'next/font/google'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import useAuth from '@/hooks/useAuth'
import Button from '@/components/Button'
import illustration from '@/public/images/login.svg'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const LoginWithPhone = () => {
  const { login, loading } = useAuth()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm() // Ensuring register is defined here

  const onSubmit = async (data) => {
    await login(data)
    onClose()
  }

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <motion.div
        className='flex-1 bg-gradient-to-b from-[#f9f9f9] from-0% to-white to-20% w-full flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className='max-w-5xl mx-4 bg-white flex flex-row shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)] rounded-2xl flex-1 items-center'>
          <div className='h-full w-[445px] m-8 rounded-2xl hidden lg:block shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)]'>
            <Image src={illustration} alt='Physio therapy' property='true' />
          </div>
          <div
            className={`w-full lg:w-auto lg:flex-1 px-2 py-10 max-w-96 mx-auto ${inter.className}`}
          >
            <h2 className='text-2xl font-semibold mb-2 text-center text-primary'>
              Sign in
            </h2>
            <p className='text-center text-primary mb-6'>Sign In to continue</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='mb-4'>
                <div className='flex flex-row justify-between'>
                  <label htmlFor='phone' className='text-primary'>
                    Phone*
                  </label>
                  <Link
                    href='/auth/login'
                    className='underline font-semibold text-[#2D3748]'
                  >
                    Use email Instead
                  </Link>
                </div>

                {/* PhoneInput with react-hook-form Controller */}
                <Controller
                  name='phone'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'Phone number is required',
                    validate: (value) =>
                      value?.length >= 10 ||
                      'Please enter a valid phone number',
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      id='phone'
                      defaultCountry='AE'
                      className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-0 ${
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

              <label htmlFor='password' className='text-primary'>
                Password*
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute text-xl top-1/2 right-3 -translate-y-1/2 text-black'
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.password ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.password?.message}
              </motion.p>

              <div className='mt-6 flex flex-row justify-between items-center'>
                <label className='inline-flex items-center'>
                  <input type='checkbox' className='form-checkbox h-5 w-5' />
                  <span className='ml-2 text-sm'>Remember Me</span>
                </label>

                <Link
                  href='/auth/forgot-password'
                  className='text-primary text-sm font-semibold'
                >
                  Forgot Password
                </Link>
              </div>

              <Button
                type='submit'
                className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4'
              >
                {loading ? 'Logging in...' : 'Sign In'}
                {loading && (
                  <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                )}
              </Button>
            </form>

            <p className='text-sm font-semibold text-center mt-4 text-black'>
              Don&apos;t have an account?{' '}
              <Link href='/auth/register' className='font-bold text-base ml-4'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default LoginWithPhone
