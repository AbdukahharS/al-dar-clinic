import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCircleXmark } from 'react-icons/fa6'
import Button from './Button'

const variants = {
  open: { opacity: 1, zIndex: 100 },
  closed: { opacity: 0, zIndex: -30 },
}

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
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-lg h-[80vh] p-8 bg-white rounded-lg shadow-xl flex flex-row'
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
        <div className='w-full md:w-auto md:flex-1'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Login</h2>
          <form>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                placeholder='Enter your password'
              />
            </div>
            <div className='flex justify-between items-center'>
              <button
                type='submit'
                className='w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none'
              >
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className='h-full w-[445px] bg-primary rounded-2xl'></div>
      </motion.div>
    </>
  )
}

export default Login
