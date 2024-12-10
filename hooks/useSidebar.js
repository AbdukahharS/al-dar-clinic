import { useSelector, useDispatch } from 'react-redux'
import { openSidebar, closeSidebar } from '@/redux/actions'

const useSidebarState = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen)
  const dispatch = useDispatch()

  const open = () => dispatch(openSidebar())
  const close = () => dispatch(closeSidebar())

  return { isOpen, open, close }
}

export default useSidebarState
