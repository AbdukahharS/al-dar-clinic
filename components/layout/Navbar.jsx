'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FaCartShopping, FaUserLarge } from 'react-icons/fa6'

import Login from '../Login'
import useAuth from '@/hooks/useAuth'
import Button from '../Button'
import Logo from '@/public/images/logo-full.webp'
import Drawer from '../Drawer'

const AnimatedLink = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <motion.span
        className={`px-3 py-1 text-gray-600 ${
          props.path === href && 'border-b border-primary'
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
  const [isOpen, setIsOpen] = useState(false)

  const path = usePathname()
  const { isAuthenticated, user, loading } = useAuth()

  const openLogin = () => setIsOpen(true)
  const closeLogin = () => setIsOpen(false)

  return (
    <nav className='w-full'>
      <div className='w-full max-w-7xl mx-auto p-7 md:px-12 md:py-8 flex items-center justify-between'>
        <Link href='/'>
          <Image
            src={Logo}
            alt='AL Dar Rehabilitation Clinic'
            width='auto'
            className='h-16 md:h-24 w-fit'
            loading='lazy'
          />
        </Link>
        <div className='gap-4 xl:gap-10 items-center hidden lg:flex'>
          <AnimatedLink href='/' path={path}>
            Home
          </AnimatedLink>
          <AnimatedLink href='/about' path={path}>
            About
          </AnimatedLink>
          <AnimatedLink href='/services' path={path}>
            Services
          </AnimatedLink>
          <AnimatedLink href='/products' path={path}>
            Products
          </AnimatedLink>
          {isAuthenticated && !loading && (
            <>
              <Link href='/book-now'>
                <Button>Book now</Button>
              </Link>
              <Link href='/cart' className=''>
                <Button
                  variant='outline'
                  size='icon'
                  className='!text-primary !text-2xl !border-black'
                >
                  <FaCartShopping />
                </Button>
              </Link>
              <Link href='/#'>
                <Button
                  variant='outline'
                  size='icon'
                  className=' bg-gray-100 text-primary text-2xl'
                >
                  {user?.profileImage ? (
                    <Image src={user.profileImage} alt='User Profile' />
                  ) : (
                    <FaUserLarge />
                  )}
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className='flex flex-row items-center gap-4'>
          {!isAuthenticated && (
            <Button className='hidden md:block' onClick={openLogin}>
              Login
            </Button>
          )}

          <Drawer />
        </div>
      </div>
      <Login isOpen={isOpen} onClose={closeLogin} />
    </nav>
  )
}

export default Navbar
