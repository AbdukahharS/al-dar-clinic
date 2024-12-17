import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import sidebarReducer from './slices/sidebarReducer'
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    cart: cartReducer,
  },
})

export default store
