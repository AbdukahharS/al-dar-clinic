import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FaUser,
  FaUserLarge,
  FaCalendarDays,
  FaBasketShopping,
  FaToolbox,
  FaLocationDot,
  FaArrowRightFromBracket,
  FaCircleXmark,
} from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import useSidebarState from '@/hooks/useSidebar'
import Button from './Button'

const variants = {
  close: { x: '-150%' },
  open: { x: 0 },
}

const SideBar = () => {
  const path = usePathname()
  const { isOpen, close } = useSidebarState()
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleChange = (e) => {
      setShouldAnimate(e.matches)
    }

    setShouldAnimate(mediaQuery.matches) // Initial value
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <motion.div
      variants={variants}
      animate={isOpen || !shouldAnimate ? 'open' : 'close'}
      className='absolute z-50 md:z-0 top-0 right-0 md:static w-full md:w-72 bg-white px-4 py-12 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]'
    >
      <Button
        variant='ghost'
        size='iconSM'
        className='text-primary text-2xl float-right -mt-4 md:hidden'
        onClick={close}
      >
        <FaCircleXmark />
      </Button>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='relative w-[90px] h-[90px] bg-primary text-white text-5xl flex items-center justify-center rounded-full'>
          {false ? ( // Check if User have profile picture uploaded
            <Image src={user.profileImage} alt='User profile' fill />
          ) : (
            <FaUserLarge />
          )}
        </div>
        <h3 className='text-gray-700 font-medium'>Sam Jordan</h3>
      </div>
      <div className='text-gray-700 mt-14'>
        <Link
          href='/profile/settings'
          className={`w-full flex flex-row items-center gap-2 border-b p-[10px] font-medium transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-primary ${
            path?.startsWith('/profile/settings') && 'text-primary'
          }`}
        >
          <FaUser />
          <span>Profile settings</span>
        </Link>
        <Link
          href='/profile/appointments'
          className={`w-full flex flex-row items-center gap-2 border-b p-[10px] font-medium transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-primary ${
            path?.startsWith('/profile/appointments') && 'text-primary'
          }`}
        >
          <FaCalendarDays />
          <span>Appointments</span>
        </Link>
        <Link
          href='/profile/orders'
          className={`w-full flex flex-row items-center gap-2 border-b p-[10px] font-medium transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-primary ${
            path?.startsWith('/profile/orders') && 'text-primary'
          }`}
        >
          <FaBasketShopping />
          <span>Order History</span>
        </Link>
        <Link
          href='/profile/rental'
          className={`w-full flex flex-row items-center gap-2 border-b p-[10px] font-medium transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-primary ${
            path?.startsWith('/profile/rental') && 'text-primary'
          }`}
        >
          <FaToolbox />
          <span>Rental History</span>
        </Link>
        <Link
          href='/profile/addresses'
          className={`w-full flex flex-row items-center gap-2 border-b p-[10px] font-medium transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-primary ${
            path?.startsWith('/profile/addresses') && 'text-primary'
          }`}
        >
          <FaLocationDot />
          <span>Addresses</span>
        </Link>
        <button className='w-full flex flex-row items-center gap-2 border-b p-[10px] font-medium transform transition-all duration-300 ease-in-out hover:scale-105 hover:text-red-500'>
          <FaArrowRightFromBracket className='rotate-180 text-red-500' />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  )
}

export default SideBar
