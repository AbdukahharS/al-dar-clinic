'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FaUserLarge } from 'react-icons/fa6'

import useAuth from '@/hooks/useAuth'
import Button from '../Button'
import Logo from '@/public/images/logo-full.webp'
import Drawer from './Drawer'
import LoginButton from '../LoginButton'
import Cart from '../Cart'

const AnimatedLink = ({ href, children, ...props }) => {
  return (
    <Link href={'/' + href}>
      <motion.span
        className={`px-3 py-1 text-gray-600 ${
          props.path?.split('/')[1] === href && 'border-b border-primary'
        }`}
        whileHover={{ color: 'var(--primary)' }}
        transition={{ type: 'tween', stiffness: 300 }}
      >
        {children}
      </motion.span>
    </Link>
  )
}

const Navbar = () => {
  const path = usePathname()
  const { isAuthenticated, user, loading } = useAuth()

  return (
    <nav className='w-full bg-white shadow-md sticky top-0 z-50'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='w-full max-w-7xl mx-auto px-7 py-3 md:px-12 md:py-5 flex items-center justify-between'
      >
        <Link href='/' className='flex-1'>
          <Image
            src={Logo}
            alt='AL Dar Rehabilitation Clinic'
            width='auto'
            className='h-14 md:h-16 lg:h-20 w-fit'
            loading='lazy'
          />
        </Link>
        <div className='gap-4 xl:gap-10 items-center hidden lg:flex'>
          <AnimatedLink href='' path={path}>
            Home
          </AnimatedLink>
          <AnimatedLink href='about' path={path}>
            About
          </AnimatedLink>
          <AnimatedLink href='services' path={path}>
            Services
          </AnimatedLink>
          <AnimatedLink href='products' path={path}>
            Products
          </AnimatedLink>
          <Link href={isAuthenticated ? '/book' : '/auth'}>
            <Button variant='outline' className='!text-primary !border-primary'>
              Book now
            </Button>
          </Link>
          {isAuthenticated && !loading && (
            <>
              <Cart />
              <Link href='/profile/settings'>
                <Button size='icon' className=' bg-primary text-2xl text-white'>
                  {user?.profileImage ? (
                    <Image src={user.profileImage} alt='User Profile' />
                  ) : (
                    <FaUserLarge />
                  )}
                </Button>
              </Link>
            </>
          )}
          {!isAuthenticated && <LoginButton />}
        </div>
        {isAuthenticated && (
          <div className='lg:hidden mr-4'>
            <Cart />
          </div>
        )}
        <Drawer />
      </motion.div>
    </nav>
  )
}

export default Navbar
