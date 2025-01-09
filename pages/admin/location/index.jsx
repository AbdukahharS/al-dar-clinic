import { useState } from 'react'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'

const dummyLocations = [{ name: 'Dubai' }, { name: 'Oman' }, { name: 'Iraq' }]

const LocationManagement = () => {
  const [locations, setLocations] = useState(dummyLocations)
  const [editIndex, setEditIndex] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const handleAdd = (data) => {
    const newLocation = { name: data.locationName }
    setLocations([...locations, newLocation])
    setValue('locationName', null)
  }

  const handleDelete = async (index) => {
    const removeFromList = () =>
      setLocations(locations.filter((_, i) => i !== index))
    confirm(
      'Delete Location',
      'Are you sure you want to delete this location?',
      'Delete',
      removeFromList
    )
  }

  const handleEdit = (index) => {
    if (!index) {
      setEditIndex(null)
      setValue('locationName', null)
      return
    }
    setEditIndex(index)
    const location = locations[index]
    setValue('locationName', location.name)
  }

  const handleUpdate = (data) => {
    const updatedLocation = { name: data.locationName }
    const updatedLocations = locations.map((location, index) =>
      index === editIndex ? updatedLocation : location
    )
    setLocations(updatedLocations)
    setEditIndex(null)
    setValue('locationName', null)
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Location Management</h1>
      </div>

      <table className='w-full max-w-lg table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Location Name</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{location.name}</td>
              <td className='px-4 py-2 flex gap-3 items-center justify-center'>
                {editIndex === index ? (
                  <button
                    onClick={() => handleEdit()}
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
          {editIndex !== null ? 'Update Location' : 'Add New Location'}
        </h3>
        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Location Name
          </label>
          <input
            type='text'
            {...register('locationName', {
              required: 'Location Name is required',
            })}
            className={`mt-1 block w-full border p-2 ${
              errors.locationName ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-s sm:text-sm`}
          />
          {errors.locationName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-500 text-sm mt-1'
            >
              {errors.locationName.message}
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

export default LocationManagement
