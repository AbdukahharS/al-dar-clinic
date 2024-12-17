import { useSelector, useDispatch } from 'react-redux'
import {
  addItem,
  removeItem,
  clearCart,
  decrementQuantity as decrementItemQuantity,
} from '@/redux/slices/cartSlice'

const useCart = () => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  )

  const addToCart = (item) => dispatch(addItem(item)) // { id, name, price, quantity, category }
  const removeFromCart = (id) => dispatch(removeItem(id))
  const decrementQuantity = (id) => dispatch(decrementItemQuantity(id)) // Use renamed import here
  const clear = () => dispatch(clearCart())

  return {
    items,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    decrementQuantity,
    clear,
  }
}

export default useCart
