import { useSelector, useDispatch } from 'react-redux'
import {
  addItem,
  removeItem,
  clearCart,
  decrementQuantity as decrementItemQuantity,
  openCart,
  closeCart,
} from '@/redux/slices/cartSlice'

const useCart = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice, cartState } = useSelector(
    (state) => state.cart
  )

  const addToCart = (item) => dispatch(addItem(item)) // { id, name, price, quantity, category }
  const removeFromCart = (id) => dispatch(removeItem(id))
  const decrementQuantity = (id) => dispatch(decrementItemQuantity(id)) // Use renamed import here
  const clear = () => dispatch(clearCart())
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
