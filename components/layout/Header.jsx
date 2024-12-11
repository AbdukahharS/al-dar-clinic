import { FaArrowLeft, FaBars } from 'react-icons/fa6'
import { usePathname, useRouter } from 'next/navigation'
import useSidebarState from '@/hooks/useSidebar'

import Button from '../Button'

const Header = ({ pageTitle, bg }) => {
  const path = usePathname()
  const router = useRouter()
  const { open } = useSidebarState()

  return (
    <div
      className={`w-full flex flex-row items-center pt-6 gap-4 mb-10 md:mb-8 ${
        bg &&
        'relative after:absolute after:top-0 after:-left-16 after:w-[150vw] after:h-[200%] after:bg-primary after:z-[-1] z-10'
      }`}
    >
      <Button
        variant='ghost'
        size='iconSM'
        className='md:hidden'
        onClick={open}
      >
        <FaBars
          className={`text-[26px] ${bg ? 'text-white' : 'text-gray-500'}`}
        />
      </Button>
      {path?.split('/').length > 3 && (
        <Button
          variant='outline'
          size='icon'
          className={`!w-[40px] !h-[40px] ${
            bg ? 'text-white border-white' : 'bg-white border-black'
          }`}
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </Button>
      )}
      <h1
        className={`text-2xl font-medium tracking-wide ${
          bg ? 'text-white' : 'text-primary'
        }`}
      >
        {pageTitle}
      </h1>
    </div>
  )
}

export default Header
