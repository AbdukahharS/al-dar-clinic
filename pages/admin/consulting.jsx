import { useState } from 'react'
import Button from '@/components/Button'
import { FaPen, FaTrash } from 'react-icons/fa6'

const ConsultingServicesManagement = () => {
  const [services, setServices] = useState([
    'Doctor Consultation',
    'Physiotherapy',
  ])
  const [newService, setNewService] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editService, setEditService] = useState('')

  const handleAdd = () => {
    if (newService.trim()) {
      setServices([...services, newService])
      setNewService('')
    }
  }

  const handleDelete = (index) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setEditService(services[index])
  }

  const handleUpdate = () => {
    if (editService.trim()) {
      const updatedServices = services.map((service, index) =>
        index === editIndex ? editService : service
      )
      setServices(updatedServices)
      setEditIndex(null)
      setEditService('')
    }
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
                <button
                  onClick={() => handleEdit(index)}
                  className='text-primary hover:underline mr-2'
                >
                  <FaPen />
                </button>
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

      {editIndex !== null ? (
        <div className='mt-8 w-fit mx-auto'>
          <input
            type='text'
            value={editService}
            onChange={(e) => setEditService(e.target.value)}
            className='border px-4 py-2 mr-4 rounded'
          />
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      ) : (
        <div className='mt-8 w-fit mx-auto '>
          <input
            type='text'
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className='border px-4 py-2 mr-4 rounded'
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      )}
    </div>
  )
}

export default ConsultingServicesManagement
