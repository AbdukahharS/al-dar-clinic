import { useDispatch, useSelector } from 'react-redux'
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../redux/slices/authSlice'
import axios from 'axios'

const useAuth = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

  const login = async (credentials) => {
    dispatch(loginStart())
    try {
      const response = await axios.post('/api/login', credentials) // Replace with your API endpoint
      dispatch(loginSuccess(response.data.user))
    } catch (error) {
      console.error('Login failed:', error)
      dispatch(loginFailure())
    }
  }

  const logoutUser = () => {
    dispatch(logout())
    // Optionally, clear tokens or cookies here
  }

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logoutUser,
  }
}

export default useAuth
