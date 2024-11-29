import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCircleXmark } from 'react-icons/fa6'
import { Poppins } from 'next/font/google'

import Button from './Button'
import illustation from '@/public/images/login.svg'
import google from '@/public/icons/google.svg'
import phone from '@/public/icons/phone.svg'

const variants = {
  open: { opacity: 1, zIndex: 100 },
  closed: { opacity: 0, zIndex: -30 },
}

// Importing Poppins font using next/font
const poppins = Poppins({
  weight: ['400', '600'], // You can specify weights you need
  subsets: ['latin'],
  display: 'swap', // Optional: helps with font loading
})

const Login = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black opacity-50 z-40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3, stiffness: 20 }}
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
          <div className='bg-black rounded-full text-xs w-fit mx-auto mt-2 text-white py-[10px] px-6 mb-9'>
            Fields cannot be empty
          </div>
          <form>
            <div className='mb-4'>
              <input
                type='email'
                id='email'
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                placeholder='Email'
              />
            </div>
            <div className='mb-6'>
              <input
                type='password'
                id='password'
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                placeholder='Password'
              />
            </div>
            <Link href='#' className='text-[#313C66] text-sm text-right block'>
              Forgot Password?
            </Link>
            <Button type='submit' className='w-full mt-7 rounded-lg text-xl'>
              Login
            </Button>
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
          </form>
        </div>
        <div className='h-full w-[445px] bg-primary rounded-2xl hidden lg:block'>
          <Image src={illustation} alt='Physio therapy' />
        </div>
      </motion.div>
    </>
  )
}

export default Login
