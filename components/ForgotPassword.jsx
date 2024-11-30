import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCircleXmark, FaRegEnvelope, FaArrowLeft } from 'react-icons/fa6'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Poppins } from 'next/font/google'
import { useForm } from 'react-hook-form'

import Button from './Button'

const variants = {
  open: { opacity: 1, zIndex: 120 },
  closed: { opacity: 0, zIndex: -30 },
}

// Importing Poppins font using next/font
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const SuccessModal = ({ isOpen, onClose }) => {
  return (
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
        <div className='w-16 h-16 bg-primary text-white rounded-full text-2xl flex items-center justify-center border-[10px] mx-auto'>
          <FaRegEnvelope />
        </div>
        <h2 className='text-3xl font-semibold mb-2 text-center text-black my-5'>
          Check your email
        </h2>
        <p className='text-xl opacity-80 text-center'>
          We sent a password resent link to johndoe@gmail.com
        </p>
        <Button
          variant='ghost'
          className='text-primary flex flex-row items-center justify-center gap-3 mx-auto mt-7 text-lg'
          onClick={onClose}
        >
          <FaArrowLeft />
          Back to log in
        </Button>
      </div>
    </motion.div>
  )
}

const ForgotPassword = ({ isOpen, onClose }) => {
  const [isSent, setIsSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    // Handle sending reset email logic here
    setIsSent(true)
    setLoading(false)
  }

  const errorMessage = errors.email?.message || null

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black opacity-50 z-[110]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />
      )}

      <motion.div
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-48px)] max-w-screen-lg p-4 lg:p-8 bg-white rounded-lg shadow-xl flex flex-row items-center justify-between'
        initial='closed'
        animate={isOpen && !isSent ? 'open' : 'closed'}
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
          <h2 className='text-xl mb-2'>Forgot Password?</h2>

          <motion.div
            className='bg-black rounded-full text-xs w-fit mx-auto mt-3 text-white py-[10px] px-6 mb-6'
            initial={{ opacity: 0 }}
            animate={errorMessage ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-4'>
              <label htmlFor='recovery-email'>Email</label>
              <input
                type='email'
                id='recovery-email'
                {...register('recovery-email', {
                  required: 'Email is required',
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
            <Button
              type='submit'
              className='w-full mt-7 rounded-lg text-xl flex flex-row justify-center items-center gap-4'
            >
              {loading ? 'Sending...' : 'Continue'}
              {loading && (
                <AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />
              )}
            </Button>
            <Button variant='ghost' className='w-full mt-4 text-primary'>
              Back
            </Button>
          </form>
        </div>
      </motion.div>
      {/* Success Modal */}
      <SuccessModal
        isOpen={isSent}
        onClose={() => {
          setIsSent(false)
          onClose()
        }}
      />
    </>
  )
}

export default ForgotPassword
