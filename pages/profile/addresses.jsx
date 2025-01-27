import axios from 'axios'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaCirclePlus,
  FaCircleXmark,
  FaEllipsis,
  FaExclamation,
} from 'react-icons/fa6'
import toast from 'react-hot-toast'

import Animated from '@/components/Animated'
import Header from '@/components/layout/Header'
import Button from '@/components/Button'
import Address from '@/components/Address'

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

const Adresses = () => {
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const openEdit = (address) => {
    setOpen(true)
    setAddress(address)
  }

  const fetchAdresses = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/address/all', {
        headers: {
          Authorization:
            localStorage.getItem('userToken') ||
            sessionStorage.getItem('userToken'),
        },
      })

      setAddresses(res.data.data)
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          'Something went wrong. Please, reload the page!'
      )
    }
  }

  useEffect(() => {
    if (axios.defaults.baseURL) {
      fetchAdresses()
    }
  }, [axios.defaults])

  const handleDelete = (id) => {
    const onDelete = async (tId) => {
      setLoading(true)
      try {
        await axios.put(`/address/${id}`)

        toast.success('Address is Deleted!')
        setAddresses((prev) => {
          if (prev) {
            return prev.filter((el) => el.id !== id)
          } else {
            return []
          }
        })
      } catch (error) {
        toast.error(
          error?.response?.data?.errors?.[0]?.message ||
            error?.response?.data?.message ||
            'Something went wrong. Please, try again later!'
        )
      } finally {
        toast.dismiss(tId)
        setLoading(false)
      }
    }
    toast.custom(
      (t) => (
        <motion.div
          initial={{ zIndex: -20, opacity: 0 }}
          animate={
            t.visible
              ? { zIndex: 100, opacity: 1 }
              : { zIndex: -20, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className='absolute -top-4 -left-4 w-screen !h-screen bg-black/60 flex items-center justify-center p-5'
        >
          <motion.div
            initial={{ y: 15 }}
            animate={t.visible ? { y: 0 } : { y: 15 }}
            className='w-fit xl:w-full max-w-2xl md:mx-auto bg-white rounded-2xl p-3 pb-12 md:p-8 md:pb-20'
          >
            <Button
              size='icon'
              variant='ghost'
              onClick={() => toast.dismiss(t.id)}
              className='ml-auto'
            >
              <FaCircleXmark className='text-primary text-4xl mx-auto' />
            </Button>
            <div className='border-8 border-yellow-500 rounded-full w-fit mx-auto'>
              <FaExclamation className='text-yellow-500 text-[100px] md:text-[136px] lg:text-[180px] xl:text-[218px]' />
            </div>
            <p className='text-xl font-medium md:text-2xl xl:text-4xl text-center mt-12 md:mt-18 tracking-wide'>
              Are you sure?
            </p>
            <p className='text-center my-4 lg:my-8'>
              You will not be able to recover the deleted record!
            </p>
            <div className='flex flex-row items-center justify-center gap-4 md:hidden'>
              <Button size='sm' onClick={() => onDelete(t.id)}>
                Yes, Delete it!
              </Button>
              <Button
                size='sm'
                variant='secondary'
                onClick={() => toast.dismiss(t.id)}
              >
                No, Cancel
              </Button>
            </div>
            <div className='hidden flex-row items-center justify-center gap-8 md:flex'>
              <Button onClick={() => onDelete(t.id)}>Yes, Delete it!</Button>
              <Button variant='secondary' onClick={() => toast.dismiss(t.id)}>
                No, Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ),
      { duration: Infinity }
    )
  }

  return (
    <div className='text-gray-700'>
      <Header pageTitle='Addresses' />
      <div className='bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] rounded-xl py-7 px-4 md:px-7 flex flex-col md:flex-row md:flex-wrap gap-6'>
        {addresses.map((address, i) => (
          <Animated
            key={i}
            className='w-full md:w-[calc(50%-12px)] h-36 bg-[#F7F7F7] rounded-xl p-4'
          >
            <div className='flex flex-row items-center justify-between relative'>
              <p>{address.name}</p>
              <button
                className='border border-primary text-primary rounded-full p-1'
                onClick={() => setFocusedIndex(i === focusedIndex ? null : i)}
                onBlur={() => setFocusedIndex(null)}
              >
                <FaEllipsis />
              </button>
              <motion.div
                className='absolute top-7 right-0 bg-white shadow-lg rounded-md flex flex-col w-20'
                initial='hidden'
                animate={focusedIndex === i ? 'visible' : 'hidden'}
                exit='hidden'
                variants={menuVariants}
              >
                <button
                  onClick={() => openEdit(address)}
                  className='py-1 px-2 border-b hover:bg-gray-100 cursor-pointer'
                >
                  Edit
                </button>
                <button
                  className='p-1 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </button>
              </motion.div>
            </div>
            <br />
            <p className='max-w-full break-words'>
              {address.number && `${address.number},`}
              {address.email},{address.city},{address.state},{address.country},
              {address.street},{address.postal}
            </p>
          </Animated>
        ))}
        <div
          onClick={() => setOpen(true)}
          className='w-full md:w-[calc(50%-12px)] h-36 bg-primary/10 rounded-xl border cursor-pointer border-primary flex items-center justify-center gap-4 text-lg font-bold text-primary'
        >
          <FaCirclePlus />
          Add New Address
        </div>
      </div>
      <Address
        open={open}
        setOpen={setOpen}
        setAddresses={setAddresses}
        address={address}
        setAddress={setAddress}
      />
    </div>
  )
}

export default Adresses
