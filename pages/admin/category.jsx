import { useState } from 'react'
import Button from '@/components/Button'
import { FaPen, FaTrash } from 'react-icons/fa6'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    'Physiotherapy Tools',
    'Physiotherapy Equipment',
    'Physiotherapy Devices',
    'Accessories',
  ])
  const [newCategory, setNewCategory] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editCategory, setEditCategory] = useState('')

  const handleAdd = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory])
      setNewCategory('')
    }
  }

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setEditCategory(categories[index])
  }

  const handleUpdate = () => {
    if (editCategory.trim()) {
      const updatedCategories = categories.map((category, index) =>
        index === editIndex ? editCategory : category
      )
      setCategories(updatedCategories)
      setEditIndex(null)
      setEditCategory('')
    }
  }

  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Category Management</h1>
      </div>

      <table className='w-full max-w-lg table-auto mx-auto shadow-md mt-7'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='px-4 py-2 text-left'>Category</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className='border-b'>
              <td className='px-4 py-2'>{category}</td>
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
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className='border px-4 py-2 mr-4 rounded'
          />
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      ) : (
        <div className='mt-8 w-fit mx-auto '>
          <input
            type='text'
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className='border px-4 py-2 mr-4 rounded'
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
