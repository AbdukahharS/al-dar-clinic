import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

const VerifyEmail = () => {
  const { loading, resendEmail, user, verifyEmail } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
            <h2 className='text-2xl font-semibold text-center text-primary mb-5'>
              Verify Email
            </h2>
            <form onSubmit={handleSubmit(verifyEmail)} noValidate>
              <div className='mb-4'>
                <label htmlFor='code' className='text-[#1F1F39] text-sm'>
                  Enter the code sent to {user?.email}
                </label>
                <input
                  type='text'
                  id='code'
                  {...register('code', {
                    required: 'Code is required',
                  })}
                  className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.code ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: errors.code ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className='text-red-500 text-sm mt-1'
                >
                  {errors.code?.message}
                </motion.p>
              </div>
              <p className='text-sm text-center flex flex-row items-center gap-1 justify-center'>
                if you didn&apos;t receive a code
                <button
                  type='button'
                  onClick={resendEmail}
                  className='text-primary ml-1 font-semibold flex flex-row items-center gap-1'
                >
                  {loading.resendEmail ? (
                    <>
                      Resending...
                      <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                    </>
                  ) : (
                    'Resend Password'
                  )}
                </button>
              </p>

              <Button
                type='submit'
                className='w-full mt-7 text-lg flex flex-row justify-center items-center gap-4'
              >
                {loading?.verifyEmail ? 'Verifying...' : 'Verify'}
                {loading?.verifyEmail && (
                  <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
                )}
              </Button>
            </form>

            <Link
              href='/auth/login'
              className='text-sm font-semibold text-center mt-4 block text-primary'
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default VerifyEmail
