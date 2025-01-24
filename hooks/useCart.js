import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import {
  clearCart,
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
  const { isAuthenticated } = useAuth()

  const fetchCart = async () => {
    try {
      const res = await axios.get(`/cart`)
      const cart = await res.data

      dispatch(
        setCart({
          items: cart.quantity,
          totalPrice: cart.total,
          totalQuantity: cart.quantity.length,
        })
      )
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated])

  const addToCart = async (item) => {
    try {
      const res = await axios.post('/cart/add', item)
      const cart = await res.data

      dispatch(
        setCart({
          items: cart.quantity,
          totalPrice: cart.total,
          totalQuantity: cart.quantity.length,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete('/cart/remove', { data: { id: id } })
      const cart = await res.data

      dispatch(
        setCart({
          items: cart.quantity,
          totalPrice: cart.total,
          totalQuantity: cart.quantity.length,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const increment = async (id) => {
    try {
      const item = items.find((el) => el.id === id)
      if (!item) throw new Error('This product is not in the cart')
      const res = await axios.post('/cart/add', {
        productId: item.productId,
        weightInKg: item.weightInKg,
        quantity: 1,
      })
      const cart = await res.data

      dispatch(
        setCart({
          items: cart.quantity,
          totalPrice: cart.total,
          totalQuantity: cart.quantity.length,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const clear = () => {
    dispatch(clearCart())
  }

  const open = () => dispatch(openCart())
  const close = () => dispatch(closeCart())

  return {
    items,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    increment,
    clear,
    close,
    open,
    cartState,
  }
}

export default useCart
