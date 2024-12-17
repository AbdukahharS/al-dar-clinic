import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    {
      id: 1,
      name: 'Dumbbell 6Kgs',
      img: '/images/products/dumbbell.webp',
      price: 100,
      category: 'PHYSIOTHERAPY TOOLS',
      quantity: 1,
      total: 100,
    },
    {
      id: 2,
      name: 'Sponge Dumbbell',
      img: '/images/products/sponge.webp',
      price: 250,
      category: 'PHYSIOTHERAPY TOOLS',
      quantity: 1,
      total: 250,
    },
  ],
  totalQuantity: 2,
  totalPrice: 350,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload // { id, name, price, quantity, category }
      const existingItem = state.items.find((i) => i.id === item.id)

      if (existingItem) {
        existingItem.quantity += item.quantity
        existingItem.total = existingItem.quantity * existingItem.price
      } else {
        state.items.push({
          ...item,
          total: item.quantity * item.price,
        })
      }

      state.totalQuantity += item.quantity
      state.totalPrice += item.price * item.quantity
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload // item id
      const existingItem = state.items.find((i) => i.id === itemId)

      if (existingItem) {
        existingItem.quantity -= 1
        if (existingItem.quantity <= 0) {
          // Remove item if quantity is 0
          state.items = state.items.filter((i) => i.id !== itemId)
        } else {
          existingItem.total = existingItem.quantity * existingItem.price
        }
        state.totalQuantity -= 1
        state.totalPrice -= existingItem.price
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload // item id
      const itemIndex = state.items.findIndex((i) => i.id === itemId)

      if (itemIndex !== -1) {
        const item = state.items[itemIndex]
        state.totalQuantity -= item.quantity
        state.totalPrice -= item.total
        state.items.splice(itemIndex, 1)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const { addItem, decrementQuantity, removeItem, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
