import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import Link from 'next/link'

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='relative inline-block text-left'>
      <Button className='hidden md:block' onClick={toggleDropdown}>
        Login
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='absolute -right-2/3 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-[0px_4px_30.9px_0px_rgba(0,0,0,0.08)] origin-top z-50 flex flex-col items-center py-7 gap-3'
          >
            <Link href='/auth/register'>
              <Button variant='secondary' onClick={() => setIsOpen(false)}>
                Register your account
              </Button>
            </Link>
            <p>OR</p>
            <Link href='/auth/login'>
              <Button onClick={() => setIsOpen(false)}>
                Login to your account
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoginButton
