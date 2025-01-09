import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Poppins } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import useAuth from '@/hooks/useAuth'
import Button from '@/components/Button'
import logo from '@/public/icons/final-logo.svg'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Login = () => {
  const { login, loading } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await login(data)
    router.push('/admin/dashboard')
  }

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
      <motion.div
        className={poppins.className}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={logo}
          alt='Logo'
          loading='lazy'
          height={90}
          className='mx-auto mb-10'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='w-full sm:w-[440px] border-gray-300 border rounded py-5 px-6'
        >
          <div className='mb-4'>
            <label htmlFor='email' className='text-gray-600'>
              Email
            </label>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter valid Email',
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
          </div>
          <label htmlFor='password' className='text-gray-600'>
            Password
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
              className='absolute text-xl top-1/2 right-3 -translate-y-1/2 text-primary'
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
            {errors.password?.message || ' '}
          </motion.p>

          <Link
            href='/admin/auth/forgot-password'
            className='text-primary text-sm text-right block mt-2'
          >
            Forgot Password?
          </Link>
          <Button
            type='submit'
            className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4 rounded-md'
          >
            Login
          </Button>
        </form>
      </motion.div>
      <motion.div
        animate={
          loading ? { opacity: 1, zIndex: 100 } : { opacity: 0, zIndex: -1 }
        }
        className='absolute top-0 left-0 h-screen w-screen bg-black/20 flex justify-center items-center'
      >
        <div className='bg-white py-5 px-11'>
          <span className='text-xl text-gray-500'>Loading...</span>
          <AiOutlineLoading3Quarters className='animate-spin h-14 w-14 mx-auto mt-4 text-primary' />
        </div>
      </motion.div>
    </div>
  )
}

export default Login
