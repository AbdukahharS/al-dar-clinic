import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import {
  addItem,
  removeItem,
  clearCart,
  decrementQuantity as decrementItemQuantity,
  openCart,
  closeCart,
  setCart,
} from '@/redux/slices/cartSlice'
import useAuth from './useAuth'

const useCart = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice, cartState } = useSelector(
    (state) => state.cart
  )
  const { isAuthenticated, user } = useAuth()

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/api/cart/${user.id}`)
      console.log(res)

      // dispatch(setCart(res.data))
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const updateCart = async (cart) => {
    try {
      await axios.put(`/api/cart/${user.id}`, cart)
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated])

  const addToCart = (item) => {
    dispatch(addItem(item))
    if (isAuthenticated) {
      updateCart({ items, totalQuantity, totalPrice })
    }
  }

  const removeFromCart = (id) => {
    dispatch(removeItem(id))
    if (isAuthenticated) {
      updateCart({ items, totalQuantity, totalPrice })
    }
  }

  const decrementQuantity = (id) => {
    dispatch(decrementItemQuantity(id))
    if (isAuthenticated) {
      updateCart({ items, totalQuantity, totalPrice })
    }
  }

  const clear = () => {
    dispatch(clearCart())
    if (isAuthenticated) {
      updateCart({ items: [], totalQuantity: 0, totalPrice: 0 })
    }
  }

  const open = () => dispatch(openCart())
  const close = () => dispatch(closeCart())

  return {
    items,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    decrementQuantity,
    clear,
    close,
    open,
    cartState,
  }
}

export default useCart
