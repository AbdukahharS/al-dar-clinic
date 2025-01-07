import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'

import Button from '@/components/Button'
import dp from '@/public/images/man.jpg'
import Animated from '@/components/Animated'

const User = () => {
  const router = useRouter()
  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>User Information</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <Animated
          animationType='fadeIn'
          className='rounded-full overflow-hidden w-[185px] h-[185px] relative'
        >
          <Image
            src={dp}
            alt='User DP'
            fill
            loading='lazy'
            className='object-cover'
          />
        </Animated>
        <Animated className='mt-8'>
          <table className='table-auto w-full max-w-[512px]'>
            <tbody>
              <tr>
                <td className='font-semibold px-4 pt-4 pb-2'>Name:</td>
                <td className='px-4 pt-4 pb-2'>Sparsh Jaiswal</td>
              </tr>
              <tr>
                <td className='font-semibold px-4 py-2'>Email ID:</td>
                <td className='px-4 py-2'>sparsh.jas07@gmail.com</td>
              </tr>
              <tr>
                <td className='font-semibold px-4 py-2'>Phone Number:</td>
                <td className='px-4 py-2'>+91 76982 97862</td>
              </tr>
              <tr>
                <td className='font-semibold px-4 py-2'>Gender:</td>
                <td className='px-4 py-2'>Male</td>
              </tr>
              <tr>
                <td className='font-semibold px-4 py-2'>Type:</td>
                <td className='px-4 py-2'>Blood Count, Cholesterol Test</td>
              </tr>
              <tr>
                <td className='font-semibold px-4 py-2'>Schedule:</td>
                <td className='px-4 py-2'>Friday, 13 September 2024</td>
              </tr>
            </tbody>
          </table>
        </Animated>
      </div>
    </div>
  )
}

export default User
