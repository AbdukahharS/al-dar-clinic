import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Inter } from 'next/font/google'
import { useForm, Controller } from 'react-hook-form'
import OtpInput from 'react-otp-input'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import Button from '@/components/Button'
import illustration from '@/public/images/login.svg'
import useAuth from '@/hooks/useAuth'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const ForgotPasswordPhone = () => {
  const { loading, forgotPassword, resetPassword } = useAuth()
  const [sent, setSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (data.phone) {
      setPhone(data.phone)
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
      await resetPassword({ ...data, otp })
    }
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
            className={`w-full lg:w-auto lg:flex-1 py-10 max-w-96 mx-auto ${inter.className}`}
          >
            <div className='mb-5 relative'>
              <Link className='absolute' href='/auth/login'>
                <Button variant='ghost' size='iconSM'>
                  <FaArrowLeft className='text-primary' />
                </Button>
              </Link>
              <h2 className='text-2xl font-semibold text-center text-primary mx-8'>
                Forgot Password
              </h2>
            </div>
            {/* Phone number input form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className={sent ? 'hidden' : ''}
            >
              <div className='mb-4'>
                <label htmlFor='phone' className='text-primary'>
                  Phone Number*
                </label>
                <Controller
                  name='phone'
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                    validate: (value) =>
                      isValidPhoneNumber(value) || 'Invalid phone number',
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry='IN'
                      value={phone}
                      onChange={setPhone}
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
                  style={{ opacity: errors.phone ? 1 : 0 }}
                >
                  {errors.phone?.message}
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
            </form>
            {/* OTP verification form */}
            {sent && (
              <form onSubmit={handleSubmit(handleVerify)}>
                <p className='text-sm mb-5'>
                  OTP shared on <b>{phone}</b>
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
                    onClick={() => onSubmit({ phone })}
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
              </form>
            )}

            <Link
              href='/auth/login-with-phone'
              className='text-sm font-semibold text-center mt-4 block text-black'
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ForgotPasswordPhone
