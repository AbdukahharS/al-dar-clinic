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

const Receipt = ({ order, refName }) => {
  return (
    <div className='absolute -z-50 -top-full -left-[5000px] min-w-[1024px]'>
      <div className=' w-full bg-white py-10 md:py-16 px-4' ref={refName}>
        <div
          className={`max-w-xl mx-auto text-black ${roboto.className}`}
          style={{ fontSize: '30px' }}
        >
          <div className='text-center'>
            <h2 className='font-semibold mb-1'>Al-Dar Rehabilitation Clinic</h2>
            <p className='text-2xl'>
              House 25, Road no 2, Block A, Mirpur-1, Dhaka 1216
            </p>
            <p className='text-2xl'>Tel: +880 13333846282</p>
          </div>
          <Line />
          <div className='font-semibold text-2xl'>
            <p>Order ID #{order.id}</p>
            <div className='flex flex-row items-center justify-between'>
              <p>{new Date(order.createdAt).toDateString()}</p>
              <p>{`${new Date(order.createdAt).getHours() % 12 || 12}:${String(
                new Date(order.createdAt).getMinutes()
              ).padStart(2, '0')} ${
                new Date(order.createdAt).getHours() >= 12 ? 'PM' : 'AM'
              }`}</p>
            </div>
          </div>
          <Line />
          <div>
            <div className='flex flex-row items-start gap-2 text-2xl font-semibold'>
              <b>Sno</b>
              <div className='flex-1'>
                <p>Product Description</p>
              </div>
              <p>Price</p>
            </div>
            <Line />
          </div>
          {order.quantity.map((item, i) => (
            <div
              className='flex flex-row items-start gap-6 text-2xl mb-3'
              key={i}
            >
              <b>{i + 1}</b>
              <div className='flex-1'>
                <p>{item.product.name}</p>
                <small>Quantity : {1}</small>
              </div>
              <p>$ {item.product.buyPrice[order.weightInKg]}</p>
            </div>
          ))}
          <div className='flex flex-row items-start gap-6 text-2xl mb-3'>
            <b>{order.quantity.length + 1}</b>
            <div className='flex-1'>
              <p>Delivery Fee</p>
            </div>
            <p>$ {order.deliveryCost}</p>
          </div>
          <div>
            <Line />
            <div className='flex flex-row items-start gap-6 text-2xl font-semibold'>
              <p className='text-white'>1</p>
              <div className='flex-1'>
                <p>Total</p>
              </div>
              <p>$ {order.total}</p>
            </div>
          </div>
          <Line />
          <div className='flex flex-row items-center justify-between text-2xl'>
            <b>Payment Type:</b>
            <p>
              {order.payment === 'COD' ? 'Cash On Delivery' : order.payment}
            </p>
          </div>
          <div className='flex flex-row items-center justify-between text-2xl'>
            <b>Order Date Time:</b>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <Line />
          <div className='flex flex-row items-center justify-between text-2xl'>
            <b>Customer:</b>
            <p>{order.address.fullname}</p>
          </div>

          <div className='flex flex-row items-center justify-between text-2xl'>
            <b>Phone:</b>
            <p>{order.address.phone}</p>
          </div>

          <div className='flex flex-row items-start justify-between text-2xl gap-4'>
            <b>Address:</b>
            <p className='text-right'>
              {order.address.street}, {order.address.city},{' '}
              {order.address.postalCode}
            </p>
          </div>
          <Line />
          <p className='font-semibold text-center'>
            Thank You <br />
            Please Come Again
          </p>
        </div>
      </div>
    </div>
  )
}

export default Receipt
