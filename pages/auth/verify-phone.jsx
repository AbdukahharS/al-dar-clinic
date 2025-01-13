import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Inter } from 'next/font/google'
import OtpInput from 'react-otp-input'

import Button from '@/components/Button'
import illustration from '@/public/images/login.svg'
import useAuth from '@/hooks/useAuth'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const VerifyPhone = () => {
  const { loading, resendPhone, user, verifyPhone } = useAuth()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length < 4) {
      setError('Enter full code')
    }
    await verifyPhone({ otp })
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
          {user?.phone && (
            <div
              className={`w-full lg:w-auto lg:flex-1 py-10 max-w-96 mx-auto ${inter.className}`}
            >
              <h2 className='text-2xl font-semibold text-center text-primary mb-5'>
                Verify Phone Number
              </h2>
              <form onSubmit={onSubmit} noValidate>
                <p className='text-[#403D4E] mb-5'>
                  OTP shared on{' '}
                  <b>
                    {user.phone.slice(0, 3) +
                      user.phone.slice(3, -3).replace(/\d/g, '*') +
                      user.phone.slice(-3)}
                  </b>
                </p>
                <div className='mb-4'>
                  <label className='text-[#403D4E] text-sm mb-2 block'>
                    OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    containerStyle={{ justifyContent: 'space-between' }}
                    renderInput={(props) => (
                      <input
                        inputMode='text'
                        maxLength={1}
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
                      onClick={resendPhone}
                      size='sm'
                      variant='ghost'
                      type='button'
                      className='text-xs text-[#949CAB]'
                    >
                      {loading?.resendPhone ? 'Resending OTP...' : 'Resend OTP'}
                    </Button>
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4'
                >
                  {loading?.verifyPhone ? 'Verifying...' : 'Verify'}
                  {loading?.verifyPhone && (
                    <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                  )}
                </Button>
              </form>

              <Link
                href='/auth/login-with-phone'
                className='text-sm font-semibold text-center mt-4 block text-black'
              >
                Back to Sign in
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default VerifyPhone
