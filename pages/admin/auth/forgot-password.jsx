import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Poppins } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import OtpInput from 'react-otp-input'

import useAuth from '@/hooks/useAuth'
import Button from '@/components/Button'
import logo from '@/public/icons/final-logo.svg'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const ForgotPassword = () => {
  const { loading, forgotPassword, resetPassword } = useAuth()
  const [sent, setSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (data.email) {
      setEmail(data.email)
    }

    const res = await forgotPassword(data)
    if (res) {
      setSent(true)
    }
  }

  const handleVerify = async (data) => {
    setError('')
    if (otp.length < 6) {
      setError('Enter full code')
    } else {
      await resetPassword({ ...data, otp }, 'admin')
    }
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
        {/* OTP sending form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={
            sent
              ? 'hidden'
              : 'w-full sm:w-[440px] border-gray-300 border rounded py-5 px-6'
          }
        >
          <h1 className='text-lg text-gray-500 mb-2 font-medium'>
            Forgot password?
          </h1>
          <div className='mb-4'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Email Address'
              onChange={(e) => setEmail(e.target.value)}
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

          <Button
            type='submit'
            className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4'
          >
            {loading?.forgotPassword ? 'Sending OTP...' : 'Get OTP'}
            {loading?.forgotPassword && (
              <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
            )}
          </Button>
          <Button
            className='w-full mt-6 text-primary font-semibold'
            variant='ghost'
          >
            <Link href='/admin/auth/login'>Back</Link>
          </Button>
        </form>
        {/* OTP verifying form */}
        {sent && (
          <form
            onSubmit={handleSubmit(handleVerify)}
            className='w-full sm:w-[440px] border-gray-300 border rounded py-5 px-6'
          >
            <p className='text-sm mb-5'>
              OTP shared on <b>{email}</b>
            </p>
            <p className='text-sm font-medium mb-4'>OTP</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{ justifyContent: 'space-between' }}
              renderInput={(props) => (
                <input
                  {...props}
                  className={`!w-16 !h-14 rounded text-2xl text-black border ${
                    error && 'border-red-500'
                  }`}
                />
              )}
            />
            <div className='flex flex-row justify-between items-center mt-2'>
              <p className='text-xs text-red-500'>{error}</p>
              <Button
                size='sm'
                variant='ghost'
                className='text-xs text-[#949CAB]'
                onClick={() => onSubmit({ email })}
              >
                {loading?.forgotPassword ? 'Resending...' : 'Resend OTP'}
              </Button>
            </div>
            <label htmlFor='password' className='text-primary'>
              New Password*
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
                onClick={() => setShowPassword((prev) => !prev)}
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

            <Button
              type='submit'
              className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4'
            >
              {loading?.resetPassword
                ? 'Requesting reset...'
                : 'Reset Password'}
              {loading?.resetPassword && (
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
              )}
            </Button>
            <Button
              className='w-full mt-6 text-primary font-semibold'
              variant='ghost'
            >
              <Link href='/admin/auth/login'>Back</Link>
            </Button>
          </form>
        )}
      </motion.div>
      <motion.div
        animate={
          loading?.user
            ? { opacity: 1, zIndex: 100 }
            : { opacity: 0, zIndex: -1 }
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

export default ForgotPassword
