import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'

import Button from '@/components/Button'
import illustration from '@/public/images/login.svg'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Auth = () => {
  return (
    <>
      <motion.div
        className='flex-1 bg-gradient-to-b from-[#f9f9f9] from-0% to-white to-20% w-full flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className='max-w-5xl mx-4 bg-white flex flex-row shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)] rounded-2xl flex-1 items-center'>
          <div className='h-full w-[445px] m-8 rounded-2xl hidden lg:block shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04)]'>
            <Image src={illustration} alt='Physio therapy' property='true' />
          </div>
          <div
            className={`w-full lg:w-auto lg:flex-1 px-2 py-10 max-w-96 mx-auto ${poppins.className}`}
          >
            <h2 className='text-3xl md:text-4xl font-semibold mb-3 text-center'>
              Sign in / Sign Up
            </h2>
            <p className='text-center text-sm mb-6 opacity-90'>
              Signin/Signup to continue to our website
            </p>
            <Link href='/auth/login'>
              <Button className='w-full'>Sign in</Button>
            </Link>
            <p className='text-center my-2'>or</p>
            <Link href='/auth/register'>
              <Button
                variant='outline'
                className='w-full border-primary text-primary'
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Auth
