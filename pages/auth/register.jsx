import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import illustration from '@/public/images/login.svg'
import useAuth from '@/hooks/useAuth'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Register = () => {
  const { registerUser, loading } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <motion.div
        className='w-full mt-8 flex items-center justify-center'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='max-w-5xl mx-4 bg-white flex flex-row shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)] rounded-2xl flex-1 items-center'>
          <div className='h-full w-[445px] m-8 rounded-2xl hidden lg:block shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)]'>
            <Image src={illustration} alt='Physio therapy' property='true' />
          </div>
          <div
            className={`w-full lg:w-auto lg:flex-1 px-2 py-10 max-w-96 mx-auto ${inter.className}`}
          >
            <h2 className='text-2xl font-semibold mb-2 text-center text-primary'>
              Sign Up
            </h2>

            <form onSubmit={handleSubmit(registerUser)} noValidate>
              <div className='mb-4'>
                <div className='flex flex-row justify-between'>
                  <label htmlFor='name' className='text-primary'>
                    Name*
                  </label>
                </div>
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
                  animate={{ opacity: errors.email ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className='text-red-500 text-sm mt-1'
                  style={{ opacity: errors.email ? 1 : 0 }}
                >
                  {errors.name?.message}
                </motion.p>
              </div>
              <div className='mb-4'>
                <div className='flex flex-row justify-between'>
                  <label htmlFor='email' className='text-primary'>
                    Email*
                  </label>
                  <Link
                    href='/auth/register-with-phone'
                    className='underline font-semibold text-[#2D3748]'
                  >
                    Use Phone Instead
                  </Link>
                </div>
                <input
                  type='email'
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
                  style={{ opacity: errors.email ? 1 : 0 }}
                >
                  {errors.email?.message}
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
                    validate: (value) => {
                      return value.length < 6
                        ? 'Password must be at least 6 characters long'
                        : true
                    },
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
                style={{ opacity: errors.password ? 1 : 0 }}
              >
                {errors.password?.message}
              </motion.p>
              <div className='mt-6 flex flex-row justify-between items-center'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-5 w-5'
                    {...register('remember')}
                  />
                  <span className='ml-2 text-sm'>Remember Me</span>
                </label>
              </div>
              <Button
                type='submit'
                className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4'
              >
                {loading?.register ? 'Signing up...' : 'Sign Up'}
                {loading?.register && (
                  <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                )}
              </Button>
            </form>
            <p className='text-sm font-semibold text-center mt-4 text-black'>
              Already have an account?{' '}
              <Link href='/auth/login' className='font-bold text-base ml-4'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Register
