import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Button from '@/components/Button'
import { FaArrowLeft } from 'react-icons/fa6'
import Animated from '@/components/Animated'
import ProductCarousel from '@/components/carousels/ProductCarousel'

const ProductDetails = () => {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (params?.productId) {
      axios
        .get(`/products/${params.productId}`)
        .then((response) => {
          setProduct(response.data)
        })
        .catch((error) => {
          console.error('Error fetching product:', error)
        })
    }
  }, [params])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='h-[104px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <Button onClick={() => router.back()} variant='ghost' size='icon'>
          <FaArrowLeft className='text-2xl' />
        </Button>
        <h1 className='text-2xl font-medium'>Product Details</h1>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-14'>
        <div className='flex flex-col md:flex-row gap-14 md:gap-24'>
          <Animated className='md:hidden'>
            <p>{product.category.name}</p>
            <h1 className='text-4xl mt-3'>{product.name}</h1>
          </Animated>
          <Animated animationType='fadeInLeft'>
            <ProductCarousel data={product.images.map((img) => img.original)} />
          </Animated>
          <Animated className='flex-1'>
            <div className='hidden md:block'>
              <p>{product.category.name}</p>
              <h1 className='text-4xl mt-3 mb-8'>{product.name}</h1>
            </div>
            <div>
              <p className='text-2xl'>{product.price}</p>
            </div>
            <div className='h-[1px] w-full bg-gray-300 my-9'></div>

            <div className='flex flex-row gap-2 items-center'>
              <span>Variants:</span>
              {product.weightInKg.map((weight) => (
                <span
                  key={weight}
                  className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full bg-gray-200 text-black`}
                >
                  {weight}
                </span>
              ))}
            </div>
            <div className='flex flex-row gap-2 items-center mt-5'>
              <span>Stock Quantity:</span>
              <span className='text-black'>
                {Object.entries(product.stock)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')}
              </span>
            </div>
          </Animated>
        </div>
        <Animated className='border border-[#BDBDBD] rounded-3xl mt-16'>
          <h3 className='text-3xl m-8'>Product Details</h3>
          <div className='bg-[#BDBDBD] h-[1px] w-full mb-4'></div>
          <p className='text-xl m-8'>{product.description}</p>
        </Animated>
      </div>
    </div>
  )
}

export default ProductDetails
