import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'

import Button from '@/components/Button'
import Animated from '@/components/Animated'
import ProductCarousel from '@/components/carousels/ProductCarousel'
import dumbbell from '@/public/images/products/dumbbell.webp'

const ProductDetails = () => {
  const router = useRouter()
  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Product Details</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <div className='flex flex-col md:flex-row gap-14 md:gap-24'>
          <Animated className='md:hidden'>
            <p>PHYSIOTHERAPY TOOLS</p>
            <h1 className='text-4xl mt-3'>Dumbbell 6Kg</h1>
          </Animated>
          <Animated animationType='fadeInLeft'>
            <ProductCarousel data={Array(7).fill(dumbbell)} />
          </Animated>
          <Animated className='flex-1'>
            <div className='hidden md:block'>
              <p>PHYSIOTHERAPY TOOLS</p>
              <h1 className='text-4xl mt-3 mb-8'>Dumbbell</h1>
            </div>
            <div>
              <p className='text-2xl'>Dhs 200</p>
            </div>
            <div className='h-[1px] w-full bg-gray-300 my-9'></div>

            <div className='flex flex-row gap-2 items-center'>
              <span>Weight:</span>
              <span
                className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full bg-gray-200 text-black`}
              >
                6kg
              </span>
              <span
                className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full bg-gray-200 text-black`}
              >
                10kg
              </span>
            </div>
            <div className='flex flex-row gap-2 items-center mt-5'>
              <span>Stock Quantity:</span>
              <span className='text-black'>26</span>
            </div>
          </Animated>
        </div>
        <Animated className='border border-[#BDBDBD] rounded-3xl mt-16'>
          <h3 className='text-3xl m-8'>Product Details</h3>
          <div className='bg-[#BDBDBD] h-[1px] w-full mb-4'></div>
          <p className='text-xl m-8'>
            Al Dar Rehabilitation Clinic opened its doors in 2006 and is
            prevalent as a dedicated post-acute inpatient rehabilitation
            facility, offering a wide range of rehabilitation and homecare
            services in the region for more than 16 years of quality care. With
            a primary focus on providing excellent patient and family-centered
            care, we provide the entire continuum of post-acute rehabilitation
            and nursing services.
          </p>
        </Animated>
      </div>
    </div>
  )
}

export default ProductDetails
