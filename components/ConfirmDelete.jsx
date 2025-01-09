import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FaCircleXmark } from 'react-icons/fa6'

import Button from './Button'

const confirmDelete = (item, onConfirm = () => {}, onCancel = () => {}) => {
  const handleCancel = (id) => {
    onCancel()
    toast.dismiss(id)
  }
  const handleConfirm = (id) => {
    onConfirm()
    toast.dismiss(id)
  }
  toast.custom(
    (t) => (
      <motion.div
        initial={{ zIndex: -20, opacity: 0 }}
        animate={
          t.visible ? { zIndex: 100, opacity: 1 } : { zIndex: -20, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className='absolute -top-4 -left-4 w-screen !h-screen bg-black/60 flex items-center justify-center p-5'
      >
        <motion.div
          initial={{ y: 15 }}
          animate={t.visible ? { y: 0 } : { y: 15 }}
          className='w-fit xl:w-full max-w-xl md:mx-auto bg-white rounded-2xl p-3 md:p-8 relative'
        >
          <Button
            size='icon'
            variant='ghost'
            onClick={() => handleCancel(t.id)}
            className='absolute right-3 top-3'
          >
            <FaCircleXmark className='text-primary text-2xl md:text-3xl' />
          </Button>
          <p className='text-xl font-semibold md:text-2xl xl:text-3xl text-center mb-4 tracking-wide text-primary'>
            Delete {item}
          </p>
          <p className='text-center mt-2 mb-6 text-xl font-semibold'>
            Are you sure you want to delete the {item}?
          </p>

          <div className='flex flex-row items-center justify-center gap-4'>
            <Button
              className='bg-red-500 !rounded-lg'
              size='lg'
              onClick={() => handleConfirm(t.id)}
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </motion.div>
    ),
    { duration: Infinity }
  )
}

export default confirmDelete
