import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { MdDashboard } from 'react-icons/md'
import {
  FaUser,
  FaLocationDot,
  FaUsersLine,
  FaBox,
  FaChalkboardUser,
  FaBagShopping,
  FaHourglassHalf,
  FaCalendarCheck,
  FaX,
  FaFolder,
  FaCheckToSlot,
  FaRegImages,
} from 'react-icons/fa6'
import { FaBars, FaHandHoldingUsd, FaSignOutAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

import logo from '@/public/icons/final-logo.svg'
import confirm from '../Confirm'
import useAuth from '@/hooks/useAuth'

const links = [
  {
    icon: MdDashboard,
    name: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: FaUser,
  },
  {
    name: 'Appointments',
    href: '/admin/appointments',
    icon: FaCalendarCheck,
  },
  {
    name: 'Product Management',
    href: '/admin/products',
    icon: FaBox,
  },
  {
    name: 'Manage Orders',
    href: '/admin/orders',
    icon: FaBagShopping,
  },
  {
    name: 'Rental Orders',
    href: '/admin/rentals',
    icon: FaHourglassHalf,
  },
  {
    name: 'Business Type',
    href: '/admin/business-type',
    icon: FaHandHoldingUsd,
  },
  {
    name: 'Category Management',
    href: '/admin/category',
    icon: FaFolder,
  },
  {
    name: 'Consulting Services',
    href: '/admin/consulting',
    icon: FaChalkboardUser,
  },
  {
    name: 'Slot Management',
    href: '/admin/slot',
    icon: FaCheckToSlot,
  },
  {
    name: 'Clinic Location',
    href: '/admin/location',
    icon: FaLocationDot,
  },
  {
    name: 'Team Management',
    href: '/admin/team',
    icon: FaUsersLine,
  },
  {
    name: 'Gallery Management',
    href: '/admin/gallery',
    icon: FaRegImages,
  },
]

const variants = {
  close: { x: '-150%' },
  open: { x: 0 },
}

const AdminSidebar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState()
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const router = useRouter()
  const { logoutUser } = useAuth()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const handleChange = (e) => {
      setShouldAnimate(e.matches)
    }

    setShouldAnimate(mediaQuery.matches) // Initial value
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const handleLogout = () => {
    const redirect = () => {
      logoutUser()
      router.push('/admin/auth/login')
    }
    confirm('Logout', 'Are you sure you want to log out?', 'Logout', redirect)
  }

  return (
    <>
      {/* Placeholder for the sidebar to maintain layout */}
      <div className='block min-h-[155px] md:w-72 md:min-w-72 md:min-h-screen'></div>

      {/* Fixed Sidebar */}
      <div className='flex flex-col fixed md:h-screen md:overflow-y-auto md:shadow-[0px_-1px_15px_1.28px_#E5E4E680] w-full md:w-72 md:min-w-72 md:top-0 md:left-0 bg-white z-20'>
        <div className='flex items-center justify-between pt-7 pb-9 px-6'>
          <Image src={logo} alt='logo' height={91} />
          <button
            onClick={() => setOpen(!open)}
            className='md:hidden text-[26px]'
          >
            {open ? <FaX /> : <FaBars />}
          </button>
        </div>
        <motion.div
          variants={variants}
          animate={open || !shouldAnimate ? 'open' : 'close'}
          className='border-b md:border-0 absolute md:static bg-white w-full top-full overflow-y-auto'
        >
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`${
                pathname.startsWith(link.href)
                  ? 'bg-primary text-white'
                  : 'text-primary hover:border-primary border-y'
              } flex items-center py-5 px-7 gap-5 transition-all border-white`}
            >
              <link.icon className='w-6 h-6' />
              <span>{link.name}</span>
            </Link>
          ))}
          <button
            className={`flex items-center w-full py-5 px-7 gap-5 transition-all border-white text-primary hover:border-primary border-y`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className='w-6 h-6' />
            <span>Logout</span>
          </button>
        </motion.div>
      </div>
    </>
  )
}

export default AdminSidebar
