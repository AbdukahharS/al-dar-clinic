import { useState } from 'react'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'

const ConsultingServicesManagement = () => {
  const [services, setServices] = useState([
    'Doctor Consultation',
    'Physiotherapy',
  ])
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const handleAdd = (data) => {
    const newService = data.serviceName
    setServices([...services, newService])
    setValue('serviceName', null)
  }

  const handleDelete = async (index) => {
    const removeFromList = () =>
      setServices(services.filter((_, i) => i !== index))
    confirm(
      'Delete Service',
      'Are you sure you want to delete this service?',
      'Delete',
      removeFromList
    )
  }

  const handleEdit = (index) => {
    if (index === null) {
      setEditIndex(null)
      setValue('serviceName', null)
      return
    }
    setEditIndex(index)
    const service = services[index]
    setValue('serviceName', service)
  }

  const handleUpdate = (data) => {
    const updatedService = data.serviceName
    const updatedServices = services.map((service, index) =>
      index === editIndex ? updatedService : service
    )
    setServices(updatedServices)
    setEditIndex(null)
    setValue('serviceName', null)
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Consulting Services Management</h1>
      </div>

      <table className='w-full max-w-lg table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Service</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{service}</td>
              <td className='px-4 py-2 flex gap-3 items-center justify-center'>
                {editIndex === index ? (
                  <button
                    onClick={() => handleEdit(null)}
                    className='text-red-500 hover:underline mr-2'
                  >
                    <FaX />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className='text-primary hover:underline mr-2'
                  >
                    <FaPen />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className='text-primary hover:underline'
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        className='mt-8 w-fit mx-auto flex flex-col gap-4'
        onSubmit={handleSubmit(editIndex !== null ? handleUpdate : handleAdd)}
      >
        <h3 className='text-center text-primary text-2xl font-medium'>
          {editIndex !== null ? 'Update Service' : 'Add New Service'}
        </h3>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Service Name
          </label>
          <input
            type='text'
            {...register('serviceName', {
              required: 'Service Name is required',
            })}
            className={`mt-1 block w-full border p-2 ${
              errors.serviceName ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-s sm:text-sm`}
          />
          {errors.serviceName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.serviceName.message}
            </motion.p>
          )}
        </div>
        <Button type='submit' className='!rounded-lg !px-12 mx-auto block'>
          {editIndex !== null ? 'Update' : 'Add'}
        </Button>
      </form>
    </div>
  )
}

export default ConsultingServicesManagement
