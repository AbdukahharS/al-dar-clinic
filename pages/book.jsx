import Animated from '@/components/Animated'

const Book = () => {
  return (
    <div className='bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100% py-10'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>Book Now page</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
    </div>
  )
}

export default Book
