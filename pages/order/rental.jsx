import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Controller, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import {
  FaCircleXmark,
  FaCircleCheck,
  FaArrowLeft,
  FaPencil,
  FaCirclePlus,
} from 'react-icons/fa6'
import DatePicker from 'react-datepicker'
import Link from 'next/link'
import 'react-phone-number-input/style.css'
import 'react-datepicker/dist/react-datepicker.css'

import Animated from '@/components/Animated'
import Button from '@/components/Button'
import axios from 'axios'
import Address from '@/components/Address'

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const Rental = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState()
  const searchParams = useSearchParams()
  // const [fileName, setFileName] = useState('Upload ID')
  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const fetchAdresses = async () => {
    try {
      const res = await axios.get('/address/all')

      setAddresses(res.data.data)
    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong. Please refresh the page!'
      )
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization']
    ) {
      fetchAdresses()
    }
  }, [axios.defaults.baseURL, axios.defaults.headers.common['Authorization']])

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/rent/create', {
        addressId: address.id,
        productId: Number(searchParams.get('id')),
        weightInKg: Number(searchParams.get('w')),
        quantity: Number(searchParams.get('q')),
        startDate: data.from,
        endDate: data.to,
      })
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
            className='fixed -top-4 -left-4 w-screen !h-screen bg-black/60 flex items-center justify-center p-5'
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
                <FaCircleXmark className='text-primary text-4xl' />
              </Button>
              <div>
                <FaCircleCheck className='text-primary text-[100px] md:text-[136px] lg:text-[180px] xl:text-[218px] mx-auto' />
              </div>
              <p className='text-xl font-medium md:text-2xl xl:text-4xl text-center py-12 md:mt-18 tracking-wide'>
                Your order requst has been received
              </p>
              <div className='flex flex-row items-center justify-center gap-4 md:hidden'>
                <Link href={`/profile/rental/${res.data.id}`}>
                  <Button
                    variant='outline'
                    className='text-primary border-primary'
                    size='sm'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Order details
                  </Button>
                </Link>
                <Button size='sm' onClick={() => toast.dismiss(t.id)}>
                  Continue
                </Button>
              </div>
              <div className='hidden flex-row items-center justify-center gap-8 md:flex'>
                <Link href={`/profile/rental/${res.data.id}`}>
                  <Button
                    variant='outline'
                    className='text-primary border-primary'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    Order details
                  </Button>
                </Link>
                <Button onClick={() => toast.dismiss(t.id)}>Continue</Button>
              </div>
            </motion.div>
          </motion.div>
        ),
        { duration: Infinity }
      )
    } catch (error) {
      console.log(error)

      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong. Please refresh the page!'
      )
    }
  }

  return (
    <>
      <Animated className='mt-12 lg:absolute lg:left-[5%] max-w-[800px] mx-auto w-[calc(100%-24px)]'>
        <Button
          variant='outline'
          size='icon'
          className='bg-white border-black'
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </Button>
      </Animated>
      <div
        className={`shadow-[0px_4px_21.6px_0px_rgba(0,0,0,0.08)] w-[calc(100%-24px)] max-w-[800px] mx-auto rounded-3xl bg-white  mt-8 md:mt-12 md:mb-16 px-5 py-7 ${inter.className}`}
      >
        <Animated animationType='fadeInLeft'>
          <h1 className='text-primary text-2xl font-semibold'>Rental</h1>
        </Animated>
        <form className='mt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='w-full border rounded-2xl'>
            <div className='flex flex-row items-center justify-between px-3 md:px-6 pt-7 pb-3 border-b'>
              <h3 className='font-medium'>Shipping Address</h3>
              <div className='flex flex-row items-center gap-2 md:gap-6'>
                {address && (
                  <button
                    onClick={() => {
                      setOpen(true)
                    }}
                    className='bg-green-200/30 text-green-500 text-xs md:text-base flex flex-row items-center gap-1 md:gap-2 rounded-lg py-1 px-[6px] transition-all duration-200 hover:scale-110'
                  >
                    <FaPencil /> Edit
                  </button>
                )}
                <button
                  onClick={() => setOpen(true)}
                  className='bg-blue-200/30 text-blue-500 text-xs md:text-base flex flex-row items-center gap-1 md:gap-2 rounded-lg py-1 px-[6px] transition-all duration-200 hover:scale-110'
                >
                  <FaCirclePlus /> Add New
                </button>
              </div>
            </div>
            <div className='px-[11.5px] py-7 md:px-6 flex flex-col md:flex-row md:flex-wrap'>
              {addresses.map((el, i) => (
                <div
                  key={i}
                  className={`w-1/2 py-4 px-5 cursor-pointer ${
                    address?.id === el.id &&
                    'border border-primary bg-primary/10 rounded-xl'
                  }`}
                  onClick={() => setAddress(el)}
                >
                  <p>{el.fullname}</p>
                  <p>{el.number}</p>
                  <p>{el.email}</p>
                  <p>{el.city},</p>
                  <p>{el.state},</p>
                  <p>{el.country},</p>
                  <p>{el.street},</p>
                  <p>{el.postalCode}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:flex-wrap md:gap-x-10 mt-6'>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='from'
                className='text-sm font-semibold text-black'
              >
                Rental period<span className='text-primary'>*</span>
                <br />
                From
              </label>
              <Controller
                name='from'
                control={control}
                defaultValue={null} // Default value for the date field
                rules={{
                  required: 'Starting date is required',
                  validate: (value) => {
                    if (!value) return 'Date is required'
                    const selectedDate = new Date(value)
                    const day = selectedDate.getDay()
                    if (day === 0 || day === 6)
                      return 'Weekends are not allowed'
                    return true
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    id='from'
                    wrapperClassName='w-full'
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()} // Disable past dates
                    placeholderText='Select a date'
                    className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.from ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.from ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.from?.message || ' '}
              </motion.p>
            </Animated>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label htmlFor='to' className='text-sm text-black font-semibold'>
                <br className='hidden md:block' />
                To
              </label>
              <Controller
                name='to'
                control={control}
                defaultValue={null} // Default value for the date field
                rules={{
                  required: 'Date is required',
                  validate: (value) => {
                    if (!value) return 'Date is required'
                    const selectedDate = new Date(value)
                    const day = selectedDate.getDay()
                    if (day === 0 || day === 6)
                      return 'Weekends are not allowed'
                    return true
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    id='to'
                    wrapperClassName='w-full'
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()} // Disable past dates
                    placeholderText='Select a date'
                    className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.to ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.to ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.to?.message || ' '}
              </motion.p>
            </Animated>
            {/* <Animated className='mb-4 w-full'>
              <label
                htmlFor='fileID'
                className='text-sm font-semibold text-black'
              >
                Upload ID<span className='text-primary'>*</span>
              </label>
              <div
                className={`flex items-center justify-between w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none space-x-4 focus:ring-primary ${
                  errors.fileID ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <span className='text-gray-500'>{fileName}</span>
                <label
                  htmlFor='fileID'
                  className='flex items-center justify-center px-8 md:px-10 py-1 bg-primary text-white rounded-xl cursor-pointer'
                >
                  Upload file
                </label>
                <input
                  {...register('fileID', {
                    required: 'ID picture is required',
                  })}
                  type='file'
                  id='fileID'
                  className='hidden'
                  onChange={handleFileChange}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.fileID ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.fileID?.message || ' '}
              </motion.p>
            </Animated> */}

            {/* <Animated className='relative w-full mb-4'>
              <label
                htmlFor='message'
                className={`absolute left-4 top-2 transition-all duration-200 ease-in-out ${
                  message ? 'hidden' : ''
                }`}
              >
                Message (<span className='text-primary'>Optional</span>)
              </label>
              <textarea
                name='message'
                id='message'
                // value={message}
                onChange={(e) => setMessage(e.target.innerText)}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary'
                rows={5}
                {...register('mesage')}
              ></textarea>
            </Animated> */}
            <Animated className='flex flex-row items-center gap-[25px]'>
              <Button
                type='submit'
                className={`font-semibold !py-3 !px-14 ${
                  !address?.id &&
                  '!bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                Submit
              </Button>
              <Button
                variant='outline'
                className=' text-red-500 border-red-500 font-semibold !py-3'
              >
                Cancel
              </Button>
            </Animated>
          </div>
        </form>
        <Address
          open={open}
          setOpen={setOpen}
          setAddresses={setAddresses}
          address={address}
          setAddress={setAddress}
        />
      </div>
    </>
  )
}

export default Rental

{
  /* <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='name'
                className='text-sm font-semibold text-black'
              >
                Full name<span className='text-primary'>*</span>
              </label>
              <input
                type='text'
                id='name'
                {...register('name', {
                  required: 'Name is required',
                })}
                placeholder='Your Name'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.name ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.name?.message || ' '}
              </motion.p>
            </Animated>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-black'
              >
                Email<span className='text-primary'>*</span>
              </label>
              <input
                type='text'
                id='email'
                placeholder='Your Email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter correct email id',
                  },
                })}
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.email ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.email?.message || ' '}
              </motion.p>
            </Animated>

            <Animated className='mb-4 md:w-[calc(50%-20px)] w-full'>
              <label
                htmlFor='phone'
                className='text-sm font-semibold text-black'
              >
                Phone<span className='text-primary'>*</span>
              </label>
              <Controller
                name='phone'
                control={control}
                placeholder='Your Number'
                rules={{
                  required: 'Phone number is required',
                  validate: (value) =>
                    isValidPhoneNumber(value) ||
                    'Please enter a valid phone number',
                }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    id='phone'
                    placeholder='Your Number'
                    defaultCountry='AE'
                    className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.phone ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.phone?.message}
              </motion.p>
            </Animated>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='address'
                className='text-sm font-semibold text-black'
              >
                Street Address<span className='text-primary'>*</span>
              </label>
              <input
                type='text'
                id='address'
                {...register('address', {
                  required: 'Address is required',
                })}
                placeholder='Your Address'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.address ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.address?.message || ' '}
              </motion.p>
            </Animated>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='postal'
                className='text-sm font-semibold text-black'
              >
                Postal Code<span className='text-primary'>*</span>
              </label>
              <input
                type='text'
                id='postal'
                {...register('postal', {
                  required: 'Postal code is required',
                })}
                placeholder='Postal Code'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.postal ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.postal ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.postal?.message || ' '}
              </motion.p>
            </Animated>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='location'
                className='text-sm font-semibold text-black'
              >
                Location<span className='text-primary'>*</span>
              </label>
              <select
                name='location'
                id='location'
                defaultValue='dubai'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
                {...register('location')}
              >
                <option value='dubai'>Dubai</option>
                <option value='oman'>Oman</option>
                <option value='Iraq'>Iraq</option>
              </select>
            </Animated> */
}
