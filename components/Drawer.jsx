import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaBars, FaUserLarge, FaX } from 'react-icons/fa6'
import Image from 'next/image'

import useAuth from '@/hooks/useAuth'
import Button from './Button'
import ADR from '@/public/images/ADR.webp'

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { stiffness: 20 },
  },
  closed: {
    x: '-100%',
    opacity: 0,
    transition: { stiffness: 20 },
  },
}

const links = [
  { name: 'Home Page', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Products', href: '/products' },
]

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()
  const { isAuthenticated, user, loading } = useAuth()

  return (
    <>
      <Button
        variant='ghost'
        size='iconSM'
        onClick={() => setIsOpen(true)}
        className=' lg:hidden'
      >
        <FaBars className='text-gray-600 text-2xl' />
      </Button>

      {/* Drawer */}
      <motion.div
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        className='fixed top-0 left-0 w-full h-full bg-[#F3F3F3] z-30 p-12 flex flex-col'
      >
        <div className='relative h-28'>
          {!loading && isAuthenticated && (
            <Link href='/#'>
              <Button
                variant='outline'
                size='icon'
                className='bg-primary text-6xl !w-28 !h-28 mx-auto z-50 relative'
              >
                {user?.profileImage ? (
                  <Image src={user.profileImage} alt='User profile' fill />
                ) : (
                  <FaUserLarge />
                )}
              </Button>
            </Link>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className='mb-8 text-black text-2xl absolute right-0 top-1/2 -translate-y-1/2'
          >
            <FaX />
          </button>
          <span className='w-full absolute bg-[#e2e2e2] h-[1px] top-[calc(50%+14px)]'></span>
        </div>

        <div className='flex flex-col gap-11 mt-14 items-center'>
          {links.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className={`text-2xl ${path === link.href && 'text-primary'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href='/book'>
            <Button variant='outline' className='!text-primary !border-primary'>
              Book now
            </Button>
          </Link>
          {!isAuthenticated && !loading && <Button>Login</Button>}
        </div>
        <div className='flex-1 flex items-end justify-center'>
          <Image src={ADR} alt='ADR' />
        </div>
      </motion.div>
    </>
  )
}
