import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartState: false,
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { items, totalQuantity, totalPrice } = action.payload
      state.items = items
      state.totalPrice = totalPrice
      state.totalQuantity = totalQuantity
    },
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
    openCart: (state) => {
      state.cartState = true
    },
    closeCart: (state) => {
      state.cartState = false
    },
  },
})

export const {
  addItem,
  decrementQuantity,
  removeItem,
  clearCart,
  openCart,
  closeCart,
  setCart,
} = cartSlice.actions
export default cartSlice.reducer
