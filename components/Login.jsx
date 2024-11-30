import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCircleXmark, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Poppins } from 'next/font/google'
import { useForm } from 'react-hook-form'

import useAuth from '@/hooks/useAuth'
import Button from './Button'
import illustration from '@/public/images/login.svg'
import google from '@/public/icons/google.svg'
import phone from '@/public/icons/phone.svg'
import ForgotPassword from './ForgotPassword'

const variants = {
  open: { opacity: 1, zIndex: 100 },
  closed: { opacity: 0, zIndex: -30 },
}

// Importing Poppins font using next/font
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Login = ({ isOpen, onClose }) => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const { login, loading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await login(data)
    onClose()
  }

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const onForgotPassword = (e) => {
    e.preventDefault()
    setIsForgotPasswordOpen(true)
  }

  const errorMessage = errors.email?.message || errors.password?.message || null

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black opacity-50 z-40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />
      )}

      {/* Login Modal */}
      <motion.div
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-48px)] max-w-screen-lg p-4 lg:p-8 bg-white rounded-lg shadow-xl flex flex-row items-center justify-between'
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant='ghost'
          className='absolute top-4 left-4 text-xl'
          size='iconSM'
          onClick={onClose}
        >
          <FaCircleXmark />
        </Button>
        <div
          className={`w-full lg:w-auto lg:flex-1 py-10 max-w-96 mx-auto ${poppins.className}`}
        >
          <h2 className='text-4xl font-semibold mb-2 text-center'>Login</h2>
          <p className='text-center text-sm opacity-80 tracking-wide'>
            Login to continue to our website
          </p>

          <motion.div
            className='bg-black rounded-full text-xs w-fit mx-auto mt-2 text-white py-[10px] px-6 mb-9'
            initial={{ opacity: 0 }}
            animate={errorMessage ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-4'>
              <input
                type='email'
                id='email'
                {...register('email', {
                  required: 'Fields cannot be empty',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Email'
              />
            </div>
            <div className='mb-6 relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                {...register('password', {
                  required: 'Fields cannot be empty',
                })}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Password'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={onForgotPassword}
              className='text-[#313C66] text-sm ml-auto block'
            >
              Forgot Password?
            </button>
            <Button
              type='submit'
              className='w-full mt-7 rounded-lg text-xl flex flex-row justify-center items-center gap-4'
            >
              {loading ? 'Logging in...' : 'Login'}
              {loading && (
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
              )}
            </Button>
          </form>
          <p className='text-sm text-center mt-5'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='text-primary'>
              Sign up
            </Link>
          </p>
          <div className='flex flex-row justify-center gap-4 mt-5'>
            <Button variant='ghost' size='iconSM'>
              <Image src={phone} alt='Phone' loading='lazy' />
            </Button>
            <Button variant='ghost' size='iconSM'>
              <Image src={google} alt='Google' loading='lazy' />
            </Button>
          </div>
        </div>
        <div className='h-full w-[445px] bg-primary rounded-2xl hidden lg:block'>
          <Image src={illustration} alt='Physio therapy' />
        </div>
      </motion.div>
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  )
}

export default Login
