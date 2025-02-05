import { useEffect, useState } from 'react'
import { FaPen, FaTrash, FaX } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import Button from '@/components/Button'
import confirm from '@/components/Confirm'
import axios from 'axios'
import toast from 'react-hot-toast'

const LocationManagement = () => {
  const [locations, setLocations] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const fetchLocations = async () => {
    try {
      const res = await axios.get('/location/all')
      setLocations(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization']
    ) {
      fetchLocations()
    }
  }, [axios.defaults.baseURL, axios.defaults.headers.common['Authorization']])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const handleAdd = async (data) => {
    try {
      const res = await axios.post('/location/create', {
        name: data.locationName,
      })
      setLocations([...locations, res.data.data])
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          'Something went wrong. Please try again!'
      )
    }
    setValue('locationName', null)
  }

  const handleDelete = (id) => {
    const removeFromList = async () => {
      try {
        await axios.delete(`/location/${id}`)
        setLocations((prev) => prev.filter((el) => el.id !== id))
      } catch (error) {
        console.log(error)
      }
    }
    confirm(
      'Delete Location',
      'Are you sure you want to delete this location?',
      'Delete',
      removeFromList
    )
  }

  const handleEdit = (index) => {
    if (index === null) {
      setEditIndex(null)
      setValue('locationName', null)
      return
    }
    setEditIndex(index)
    const location = locations[index]
    setValue('locationName', location.name)
  }

  const handleUpdate = async (data) => {
    const id = locations[editIndex].id
    try {
      await axios.put('/location/update/' + id, {
        name: data.locationName,
      })
      setLocations((prev) =>
        prev.map((el, i) =>
          i === editIndex ? { ...el, name: data.locationName } : el
        )
      )
    } catch (error) {
      console.log(error)
    } finally {
      setEditIndex(null)
      setValue('locationName', null)
    }
  }

  return (
    <div>
      <div className='h-[104px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
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
                  onClick={() => handleDelete(location.id)}
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
              validate: (value) =>
                value.length < 3
                  ? 'Location Name must be at least 3 characters'
                  : true,
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
