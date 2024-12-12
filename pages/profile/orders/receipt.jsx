import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const Line = () => (
  <div className='text-center overflow-hidden whitespace-nowrap'>
    <span className='inline-block w-full font-bold'>
      ------------------------------------------------------------
    </span>
  </div>
)

const receipt = () => {
  return (
    <div className='aspect-[210/297] w-full shadow-lg bg-white py-10 md:py-16 px-4'>
      <div className={`max-w-[260px] mx-auto text-black ${roboto.className}`}>
        <div className='text-center'>
          <h2 className='font-semibold mb-1'>Al-Dar Rehabilitation Clinic</h2>
          <p className='text-sm'>
            House 25, Road no 2, Block A, Mirpur-1, Dhaka 1216
          </p>
          <p className='text-sm'>Tel: +880 13333846282</p>
        </div>
        <Line />
        <div className='font-semibold text-sm'>
          <p>Order ID #2310243</p>
          <div className='flex flex-row items-center justify-between'>
            <p>23-10-2024</p>
            <p>02:54 PM</p>
          </div>
        </div>
        <Line />
        <div>
          <div className='flex flex-row items-start gap-2 text-sm font-semibold'>
            <b>Sno</b>
            <div className='flex-1'>
              <p>Product Description</p>
            </div>
            <p>Price</p>
          </div>
          <Line />
          <div className='flex flex-row items-start gap-6 text-sm mb-3'>
            <b>1</b>
            <div className='flex-1'>
              <p>Dumbbell 6kg</p>
              <small>Quantity : 1</small>
            </div>
            <p>Dhs 100</p>
          </div>
        </div>
        <div>
          <div className='flex flex-row items-start gap-6 text-sm mb-3'>
            <b>2</b>
            <div className='flex-1'>
              <p>Sponge Dumbbell</p>
              <small>Quantity : 1</small>
            </div>
            <p>Dhs 250</p>
          </div>
          <Line />
          <div className='flex flex-row items-start gap-6 text-sm font-semibold'>
            <p className='text-white'>1</p>
            <div className='flex-1'>
              <p>Total</p>
            </div>
            <p>Dhs 350</p>
          </div>
        </div>
        <Line />
        <div className='flex flex-row items-center justify-between text-sm'>
          <b>Payment Type:</b>
          <p>Cash on Delivery</p>
        </div>
        <div className='flex flex-row items-center justify-between text-sm'>
          <b>Order Date Time:</b>
          <p>02:54PM, 23-20-2024</p>
        </div>
        <Line />
        <div className='flex flex-row items-center justify-between text-sm'>
          <b>Customer:</b>
          <p>Will Smith</p>
        </div>
        <div className='flex flex-row items-center justify-between text-sm'>
          <b>Phone:</b>
          <p>+880 13333846282</p>
        </div>
        <div className='flex flex-row items-start justify-between text-sm gap-4'>
          <b>Address:</b>
          <p className='text-right'>
            House 25, Road no 2, Block A, Mirpur-1, Dhaka 1216
          </p>
        </div>
        <Line />
        <p className='font-semibold text-center'>
          Thank You <br />
          Please Come Again
        </p>
      </div>
    </div>
  )
}

export default receipt
