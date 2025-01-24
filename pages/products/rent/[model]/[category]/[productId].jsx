import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import Button from '@/components/Button'
import ProductCarousel from '@/components/carousels/ProductCarousel'
import Animated from '@/components/Animated'
import axios from 'axios'

const ProductPage = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [type, setType] = useState(null)

  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/products/${params.productId}`)
        const onStock = res.data.weightInKg.find((w) => res.data.stock[w] > 0)
        if (!onStock) {
          toast.error('Product is out of stock')
        }
        setProduct(res.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.productId && axios.defaults.headers.common['Authorization']) {
      fetchProduct()
    }
  }, [params, axios.defaults.headers.common['Authorization']])

  const handleAddToCard = () => {
    router.push(`/order/rental?id=${params.productId}&w=${type}&q=${quantity}`)
  }

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
        {!loading && product && (
          <>
            <div className='flex flex-col md:flex-row gap-14 md:gap-24'>
              <Animated className='md:hidden'>
                <p>{product?.category.name.toUpperCase()}</p>
                <h1 className='text-4xl mt-3'>{product.name}</h1>
              </Animated>
              <Animated animationType='fadeInLeft'>
                <ProductCarousel
                  data={product.images?.map((img) => img.original) || []}
                />
              </Animated>
              <Animated className='flex-1'>
                <div className='hidden md:block'>
                  <p>{product?.category.name.toUpperCase()}</p>
                  <h1 className='text-4xl mt-3 mb-8'>{product.name}</h1>
                </div>
                <div>
                  <p className='text-2xl'>
                    Dhs{' '}
                    {type
                      ? product.buyPrice[type]
                      : product.buyPrice[Object.keys(product.buyPrice)[0]]}
                    /Day
                  </p>
                </div>
                <div className='h-[1px] w-full bg-gray-300 my-9'></div>
                <div className='flex flex-row gap-2 items-center'>
                  <span>Weight:</span>
                  {product.weightInKg
                    ?.filter((w) => product.stock[w] > 0)
                    .map((weight, i) => (
                      <span
                        key={i}
                        className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full ${
                          type === weight
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setType(weight)}
                      >
                        {weight} KG
                      </span>
                    ))}
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
                    quantity === 0 &&
                    '!bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  onClick={quantity === 0 ? () => {} : handleAddToCard}
                >
                  Rent Now
                </Button>
              </Animated>
            </div>
            <Animated className='border border-[#BDBDBD] rounded-3xl mt-16'>
              <h3 className='text-3xl m-8'>Product Details</h3>
              <div className='bg-[#BDBDBD] h-[1px] w-full mb-4'></div>
              <p className='text-xl m-8'>{product.description}</p>
            </Animated>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductPage
