import { FaBars } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import useSidebarState from '@/hooks/useSidebar'

import Button from '../Button'

const Header = ({ pageTitle }) => {
  const path = usePathname()
  const { open } = useSidebarState()

  return (
    <div className='w-full flex flex-row items-center gap-4 mb-10 md:mb-8'>
      <Button
        variant='ghost'
        size='iconSM'
        className='md:hidden'
        onClick={open}
      >
        <FaBars className='text-[26px] text-gray-500' />
      </Button>
      {path.split('/').length > 3 && (
        <Button
          variant='outline'
          size='icon'
          className='bg-white border-black !w-[40px] !h-[40px]'
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </Button>
      )}
      <h1 className='text-primary text-2xl font-medium tracking-wide'>
        {pageTitle}
      </h1>
    </div>
  )
}

export default Header
