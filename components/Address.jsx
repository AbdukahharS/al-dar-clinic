import { motion } from 'framer-motion'
import { FaCircleXmark } from 'react-icons/fa6'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import Button from './Button'
import Animated from './Animated'

const Address = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {
    setOpen(false)
  }

  return (
    <motion.div
      initial={{ zIndex: -20, opacity: 0 }}
      animate={open ? { zIndex: 100, opacity: 1 } : { zIndex: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='fixed top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center p-5'
    >
      <motion.div
        initial={{ y: 15 }}
        animate={open ? { y: 0 } : { y: 15 }}
        className='w-[100%] max-w-5xl md:mx-auto bg-white rounded-2xl p-3 pb-12 md:p-8 md:pb-20 max-h-full overflow-y-auto'
      >
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-semibold text-primary'>Address</h2>
          <Button
            size='iconSM'
            variant='ghost'
            onClick={() => setOpen(false)}
            className='ml-auto'
          >
            <FaCircleXmark className='text-primary text-2xl' />
          </Button>
        </div>
        <form className='mt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='flex flex-col md:flex-row md:flex-wrap md:gap-x-10'>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
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
                defaultValue=''
                rules={{
                  required: 'Phone number is required',
                  validate: (value) =>
                    value?.length >= 10 || 'Please enter a valid phone number',
                }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    id='phone'
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
                htmlFor='country'
                className='text-sm font-semibold text-black'
              >
                Country<span className='text-primary'>*</span>
              </label>
              <select
                name='country'
                id='country'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('country', { required: 'Select a country' })}
              >
                <option value='india'>India</option>
                <option value='indonesia'>Indonesia</option>
                <option value='jamaica'>Jamaica</option>
              </select>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.country ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.country?.message || ' '}
              </motion.p>
            </Animated>

            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='state'
                className='text-sm font-semibold text-black'
              >
                State<span className='text-primary'>*</span>
              </label>
              <select
                name='state'
                id='state'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
                {...register('state', { required: 'Select a state' })}
              >
                <option value='tamilnadu'>TamilNadu</option>
                <option value='kerala'>Kerala</option>
                <option value='karnataka'>Karnataka</option>
              </select>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.state ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.state?.message || ' '}
              </motion.p>
            </Animated>
            <Animated className='mb-4 w-full md:w-[calc(50%-20px)]'>
              <label
                htmlFor='city'
                className='text-sm font-semibold text-black'
              >
                Consultation medium<span className='text-primary'>*</span>
              </label>
              <select
                name='city'
                id='city'
                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-primary`}
                {...register('city', { required: 'Select a city' })}
              >
                <option value='chennai'>Chennai</option>
                <option value='kanchipuram'>Kanchipuram</option>
                <option value='chengalpattu'>Chengalpattu</option>
              </select>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: errors.city ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='text-red-500 text-sm mt-1'
              >
                {errors.city?.message || ' '}
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
            <Animated className='flex flex-row items-center gap-[25px]'>
              <Button type='submit' className='font-semibold !py-3 md:!px-14'>
                Save Address
              </Button>
              <Button
                variant='outline'
                className=' text-red-500 border-red-500 font-semibold !py-3'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Animated>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Address
