import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
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
    setTimeout(() => {
      try {
        // Handle login logic here (API call, etc.)
        dispatch(loginSuccess(credentials))
        toast.success('Congrats! You have successfully logged In')
      } catch (error) {
        toast.error('Something went wrong with login. Please, try again!')
        dispatch(loginFailure())
      }
    }, 2000)
  }

  const logoutUser = () => {
    dispatch(logout())
    // Optionally, clear tokens or cookies here
  }
  const register = async (credentials) => {
    dispatch(loginStart())
    try {
      // Handle login logic here (API call, etc.)
      dispatch(loginSuccess(credentials))
      toast.success('Congrats! You have successfully registered')
    } catch (error) {
      toast.error('Something went wrong with sign up. Please, try again!')
      dispatch(loginFailure())
    }
  }

  return {
    isAuthenticated: true,
    user,
    loading,
    login,
    register,
    logoutUser,
  }
}

export default useAuth
