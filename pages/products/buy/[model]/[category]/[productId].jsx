import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import Button from '@/components/Button'
import dumbbell from '@/public/images/products/dumbbell.webp'
import sponge from '@/public/images/products/sponge.webp'
import dumbbellCase from '@/public/images/products/case.webp'
import handle from '@/public/images/products/handle-ball.webp'
import weight from '@/public/images/products/weight-ball.webp'
import kettle from '@/public/images/products/kettle.webp'
import ProductCarousel from '@/components/carousels/ProductCarousel'

const products = [
  {
    id: 1,
    name: 'Dumbbell 6Kgs',
    img: dumbbell,
    price: 100,
  },
  {
    id: 2,
    name: 'Sponge Dumbbell',
    img: sponge,
    price: 250,
  },
  {
    id: 3,
    name: 'Portable Case 6 Dumbbells',
    img: dumbbellCase,
    price: 100,
  },
  {
    id: 4,
    name: 'Weight Ball with Handles',
    img: handle,
    price: 100,
  },
  {
    id: 5,
    name: 'Soft Weight Ball',
    img: weight,
    price: 100,
  },
  {
    id: 6,
    name: 'Kettle Dumbbel 2Kg',
    img: kettle,
    price: 100,
  },
]

const ProductPage = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [type, setType] = useState(null)
  const [quantity, setQuantity] = useState(0)

  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (params?.productId) {
      setLoading(true)
      // Fetch product
      const res = products.find((p) => p.id == params.productId)

      if (res) {
        setProduct(res)
      } else {
        console.error('not found')
      }
      setLoading(false)
    }
  }, [params])

  const handleAddToCard = () => {}

  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100%'>
      <div className='w-full max-w-7xl mx-auto px-7 py-11 md:py-12'>
        <Button
          onClick={() => router.back()}
          variant='outline'
          size='iconSM'
          className='border-black mb-8'
        >
          <FaArrowLeft className=' text-black' />
        </Button>
        {!loading && (
          <>
            <div className='flex flex-col md:flex-row gap-14 md:gap-24'>
              <div className='md:hidden'>
                <p>PHYSIOTHERAPY {params.category.toUpperCase()}</p>
                <h1 className='text-4xl mt-3'>Dumbbell 6Kg</h1>
              </div>
              <div>
                <ProductCarousel data={Array(7).fill(product.img)} />
              </div>
              <div className='flex-1'>
                <div className='hidden md:block'>
                  <p>PHYSIOTHERAPY {params.category.toUpperCase()}</p>
                  <h1 className='text-4xl mt-3 mb-8'>Dumbbell 6Kg</h1>
                </div>
                <div>
                  <p className='text-2xl'>Dhs {product.price}</p>
                </div>
                <div className='h-[1px] w-full bg-gray-300 my-9'></div>

                <div className='flex flex-row gap-2 items-center'>
                  <span>Weight:</span>
                  <span
                    className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full ${
                      type === '6kg'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                    onClick={() => setType('6kg')}
                  >
                    6kg
                  </span>
                  <span
                    className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full ${
                      type === '10kg'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                    onClick={() => setType('10kg')}
                  >
                    10kg
                  </span>
                </div>
                <div className='flex flex-row gap-2 items-center mt-5'>
                  <span>Quantity:</span>
                  <div className='rounded-full bg-gray-200 p-1 flex gap-2 flex-row'>
                    <button
                      className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full ${
                        quantity === 0
                          ? 'bg-gray-400 text-gray-200'
                          : 'text-white bg-black'
                      }`}
                      disable={quantity === 0 ? 'true' : 'false'}
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      -
                    </button>
                    <span className='text-black'>{quantity}</span>
                    <button
                      className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full bg-black text-white`}
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  className={`mt-6 ${
                    (!type || quantity === 0) &&
                    '!bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  onClick={handleAddToCard}
                >
                  Add to Card
                </Button>
              </div>
            </div>
            <div className='border border-[#BDBDBD] rounded-3xl mt-16'>
              <h3 className='text-3xl m-8'>Product Details</h3>
              <div className='bg-[#BDBDBD] h-[1px] w-full mb-4'></div>
              <p className='text-xl m-8'>
                Al Dar Rehabilitation Clinic opened its doors in 2006 and is
                prevalent as a dedicated post-acute inpatient rehabilitation
                facility, offering a wide range of rehabilitation and homecare
                services in the region for more than 16 years of quality care.
                With a primary focus on providing excellent patient and
                family-centered care, we provide the entire continuum of
                post-acute rehabilitation and nursing services.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductPage
