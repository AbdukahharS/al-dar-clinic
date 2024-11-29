import { useDispatch, useSelector } from 'react-redux'
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../redux/slices/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

  const login = async (credentials) => {
    dispatch(loginStart())
    try {
      // Handle login logic here (API call, etc.)
      dispatch(loginSuccess(credentials))
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
