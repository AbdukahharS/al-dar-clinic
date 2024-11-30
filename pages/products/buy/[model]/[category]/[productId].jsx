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

  const params = useParams()
  const router = useRouter()

  console.log(loading)

  useEffect(() => {
    if (params?.productId) {
      console.log(params.productId)

      setLoading(true)
      // Fetch product
      const res = products.find((p) => p.id == params.productId)
      console.log(res)

      if (res) {
        setProduct(res)
      } else {
        console.error('not found')
      }
      setLoading(false)
    }
  }, [params])

  return (
    <div className='flex-1  bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100%'>
      <div className='w-full max-w-7xl mx-auto px-7 py-11 md:py-12'>
        <Button
          onClick={() => router.back()}
          variant='outline'
          size='iconSM'
          className='border-black'
        >
          <FaArrowLeft className=' text-black' />
        </Button>
        {!loading && (
          <>
            <div>
              <p>PHYSIOTHERAPY {params.category.toUpperCase()}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductPage
