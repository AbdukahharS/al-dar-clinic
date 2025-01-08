import { useState } from 'react'
import Button from '@/components/Button'
import { FaPen, FaTrash } from 'react-icons/fa6'

const BusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState(['B2C', 'B2B'])
  const [newType, setNewType] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editType, setEditType] = useState('')

  const handleAdd = () => {
    if (newType.trim()) {
      setBusinessTypes([...businessTypes, newType])
      setNewType('')
    }
  }

  const handleDelete = (index) => {
    setBusinessTypes(businessTypes.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setEditType(businessTypes[index])
  }

  const handleUpdate = () => {
    if (editType.trim()) {
      const updatedTypes = businessTypes.map((type, index) =>
        index === editIndex ? editType : type
      )
      setBusinessTypes(updatedTypes)
      setEditIndex(null)
      setEditType('')
    }
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Business Type</h1>
      </div>

      <table className='w-full max-w-lg table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Business Type</th>
            <th className='px-4 py-2 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businessTypes.map((type, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{type}</td>
              <td className='px-4 py-2'>
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
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            className='border px-4 py-2 mr-4 rounded'
          />
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      ) : (
        <div className='mt-8 w-fit mx-auto '>
          <input
            type='text'
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className='border px-4 py-2 mr-4 rounded'
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      )}
    </div>
  )
}

export default BusinessType
