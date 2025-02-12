import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import Button from '@/components/Button'
import ProductCarousel from '@/components/carousels/ProductCarousel'
import Animated from '@/components/Animated'
import useCart from '@/hooks/useCart'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'

function format(num) {
  return num % 1 === 0
    ? num.toLocaleString('en-US')
    : num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
}

const ProductPage = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})
  const [type, setType] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(0)
  const { addToCart, open, items } = useCart()
  const { isAuthenticated } = useAuth()

  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const itemInCart = items.find(
      (item) => item.productId === product.id && item.weightInKg === type
    )
    if (itemInCart) {
      setCartQuantity(itemInCart.quantity)
    }
  }, [items, product, type])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/products/' + params.productId)
        setProduct(res.data)

        const onStock = res.data.weightInKg.find((w) => res.data.stock[w] > 0)
        if (!onStock) {
          toast.error('Product is out of stock')
        }
      } catch (error) {
        console.error(error)
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            'Something went wrong'
        )
      } finally {
        setLoading(false)
      }
    }
    if (params?.productId && axios.defaults.baseURL) {
      fetchProduct()
    }
  }, [axios.defaults.baseURL, params])

  useEffect(() => {
    if (type) {
      setQuantity(0)
    }
  }, [type])

  const handleAddToCard = async () => {
    if (!isAuthenticated) {
      toast('Please log in')
      router.push('/auth/login')
      return
    }
    if (quantity === 0) {
      toast('Quantity should be more than 0!')
      return
    }
    await addToCart({
      productId: product.id,
      quantity: quantity,
      weightInKg: type,
    })
    open()
  }

  const increment = () => {
    if (quantity + cartQuantity < product.stock[type]) {
      setQuantity((prev) => prev + 1)
    }
  }
  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1)
    }
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
        {!loading && (
          <>
            <div className='flex flex-col md:flex-row gap-14 md:gap-24'>
              <Animated className='md:hidden'>
                <p>{product.category.name.toUpperCase()}</p>
                <h1 className='text-4xl mt-3'>Dumbbell 6Kg</h1>
              </Animated>
              <Animated animationType='fadeInLeft'>
                <ProductCarousel
                  data={product.images?.map((img) => img.original) || []}
                />
              </Animated>
              <Animated className='flex-1'>
                <div className='hidden md:block'>
                  <p>{product.category.name.toUpperCase()}</p>
                  <h1 className='text-4xl mt-3 mb-8'>{product.name}</h1>
                </div>
                <div>
                  {type ? (
                    <p className='text-2xl'>
                      $ {format(product.buyPrice[type])} / OMR{' '}
                      {format(
                        product.buyPrice[type] * product.currency['Omání rial']
                      )}{' '}
                      / IQD{' '}
                      {format(
                        product.buyPrice[type] *
                          product.currency['Iraquí Dinar']
                      )}{' '}
                      / Dhs{' '}
                      {format(
                        product.buyPrice[type] * product.currency['Dirham']
                      )}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className='h-[1px] w-full bg-gray-300 my-9'></div>

                <div className='flex flex-row gap-2 items-center'>
                  <span>Variants:</span>
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
                        {weight.replace(/^"|"$/g, '')}
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
                      onClick={decrement}
                    >
                      -
                    </button>
                    <span className='text-black'>{quantity}</span>
                    <button
                      className={`text-xs inline-block py-[6px] px-3 cursor-pointer rounded-full ${
                        quantity + cartQuantity < product.stock[type]
                          ? 'text-white bg-black'
                          : 'bg-gray-400 text-gray-200'
                      }`}
                      onClick={increment}
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
                  Add to Cart
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
