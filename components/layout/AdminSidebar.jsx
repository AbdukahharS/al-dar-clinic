import Image from 'next/image'
import { MdDashboard, MdAddHome, MdConnectWithoutContact } from 'react-icons/md'
import {
  FaUserClock,
  FaUser,
  FaWallet,
  FaChartSimple,
  FaGear,
} from 'react-icons/fa6'
import { TbCalendarUser } from 'react-icons/tb'

import logo from '@/public/icons/logo-short.svg'

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
    icon: FaUserClock,
  },
  {
    name: 'Home Services',
    href: '/admin/home-services',
    icon: MdAddHome,
  },
  {
    name: 'Fee and Charges',
    href: '/admin/fee-and-charges',
    icon: FaWallet,
  },
  {
    name: 'Manage Bookings',
    href: '/admin/bookings',
    icon: TbCalendarUser,
  },
  {
    name: 'Contact Us',
    href: '/admin/contact',
    icon: MdConnectWithoutContact,
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: FaChartSimple,
  },
  {
    name: 'Setup',
    href: '/admin/setup',
    icon: FaGear,
  },
  {
    name: 'View',
    href: '/admin/view',
    icon: FaGear,
  },
]

const AdminSidebar = () => {
  return (
    <div className='w-72'>
      <Image src={logo} alt='logo' height={91} className='my-7 px-6 mb-9' />
    </div>
  )
}

export default AdminSidebar
