import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import {
  register,
  login as loginUser,
  verify,
  logout,
  startLoading,
  endLoading,
} from '../redux/slices/authSlice'
import { clearCart } from '../redux/slices/cartSlice'

const useAuth = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

  // Check localStorage for userId and userToken
  const initializeAuth = async () => {
    const userId =
      localStorage.getItem('userId') || sessionStorage.getItem('userId')
    const userToken =
      localStorage.getItem('userToken') || sessionStorage.getItem('userToken')

    if (
      userId &&
      userToken &&
      userId !== 'undefined' &&
      userToken !== 'undefined'
    ) {
      dispatch(startLoading('user'))
      try {
        const res = await axios.get(`/users/${userId}`, {
          headers: {
            Authorization: userToken,
          },
        })

        axios.defaults.headers.common.Authorization = userToken
        dispatch(loginUser(res.data))
      } catch (error) {
        console.error('Error fetching user information:', error)
        dispatch(logout())
      } finally {
        dispatch(endLoading('user'))
      }
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL === process.env.NEXT_PUBLIC_API_URL &&
      !isAuthenticated
    ) {
      initializeAuth()
    }
    dispatch(endLoading('user'))
  }, [axios.defaults.baseURL, isAuthenticated])

  const login = async (credentials, path) => {
    dispatch(startLoading('login'))
    try {
      // API call to authenticate the user
      const res = await axios.post('/auth/login-email', credentials)

      // Extract user data and token from response
      const { id, token } = res.data

      if (credentials.remember) {
        // Save user data and token in localStorage
        localStorage.setItem('userId', id)
        localStorage.setItem('userToken', token)
      } else {
        // Save user data and token in sessionStorage
        sessionStorage.setItem('userId', id)
        sessionStorage.setItem('userToken', token)
      }

      axios.defaults.headers.common.Authorization = token
      // Update Redux store with user information
      dispatch(loginUser(res.data))

      // Show success message and redirect
      toast.success('Congrats! You have successfully logged in')
      router.push(path || '/')
    } catch (error) {
      console.error('Login error:', error)
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong with login. Please, try again!'
      )
    } finally {
      dispatch(endLoading('login'))
    }
  }

  const loginWithPhone = async (credentials) => {
    dispatch(startLoading('loginWithPhone'))
    try {
      // API call to authenticate the user using phone
      const res = await axios.post('/auth/login-phone', credentials)

      // Extract user data and token from response
      const { id, token } = res.data

      if (credentials.remember) {
        // Save user data and token in localStorage
        localStorage.setItem('userId', id)
        localStorage.setItem('userToken', token)
      } else {
        // Save user data and token in sessionStorage
        sessionStorage.setItem('userId', id)
        sessionStorage.setItem('userToken', token)
      }

      axios.defaults.headers.common.Authorization = token
      // Update Redux store with user information
      dispatch(loginUser(res.data))

      // Show success message and redirect
      toast.success(
        'Congrats! You have successfully logged in with your phone!'
      )
      router.push('/')
    } catch (error) {
      console.error('Login with phone error:', error)
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Something went wrong with login. Please, try again!'
      )
    } finally {
      dispatch(endLoading('loginWithPhone'))
    }
  }

  const logoutUser = () => {
    dispatch(logout())
    dispatch(clearCart())
    axios.defaults.headers.common.Authorization = ''
    localStorage.removeItem('userId')
    localStorage.removeItem('userToken')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userToken')
    toast.success('Logged out successfully.')
  }

  const resendEmail = async () => {
    dispatch(startLoading('resendEmail'))
    try {
      const res = await axios.post('/auth/resend-email-verification', {
        email: user.email,
      })
      toast.success(res.data.message)
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    } finally {
      dispatch(endLoading('resendEmail'))
    }
  }
  const resendPhone = async () => {
    dispatch(startLoading('resendPhone'))
    try {
      const res = await axios.post('/auth/resend-phone-verification', {
        phone: user.phone,
      })
      toast.success(res.data.message)
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    } finally {
      dispatch(endLoading('resendPhone'))
    }
  }

  const verifyEmail = async (data) => {
    dispatch(startLoading('verifyEmail'))
    try {
      const res = await axios.post('/auth/verify-email', {
        email: user.email,
        otp: data.code,
      })
      axios.defaults.headers.common.Authorization = res.data.token
      dispatch(verify(res.data))
      localStorage.setItem('userToken', res.data.token)
      localStorage.setItem('userId', res.data.id)
      toast.success('You have logged in successfully!')
      router.push('/')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    } finally {
      dispatch(endLoading('verifyEmail'))
    }
  }

  const verifyPhone = async (data) => {
    dispatch(startLoading('verifyPhone'))
    try {
      const res = await axios.post('/auth/verify-phone', {
        phone: user.phone,
        otp: data.otp,
      })
      axios.defaults.headers.common.Authorization = res.data.token
      dispatch(verify(res.data))
      localStorage.setItem('userToken', res.data.token)
      localStorage.setItem('userId', res.data.id)
      toast.success('You have logged in successfully!')
      router.push('/')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    } finally {
      dispatch(endLoading('verifyPhone'))
    }
  }

  const registerUser = async (credentials) => {
    dispatch(startLoading('register'))
    try {
      const newUser = {
        name: credentials.name,
        password: credentials.password,
      }
      if (credentials.email) {
        newUser.email = credentials.email
      } else {
        newUser.phone = credentials.phone
      }

      const res = await axios.post(
        `/auth/register-${credentials.email ? 'email' : 'phone'}`,
        newUser
      )

      // Handle user token and ID like in login
      const { id, token } = res.data

      if (credentials.remember) {
        localStorage.setItem('userId', id)
        localStorage.setItem('userToken', token)
      } else {
        sessionStorage.setItem('userId', id)
        sessionStorage.setItem('userToken', token)
      }

      // Update Redux store with user information
      dispatch(register(credentials))
      router.push(`/auth/verify-${credentials.email ? 'email' : 'phone'}`)

      toast.success(res.data.message)
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    } finally {
      dispatch(endLoading('register'))
    }
  }

  const forgotPassword = async (data) => {
    let didSucced = false
    dispatch(startLoading('forgotPassword'))
    try {
      const res = await axios.post('/auth/forgot-password', { ...data })
      toast.success(res.data.message)
      didSucced = true
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    }
    dispatch(endLoading('forgotPassword'))
    return didSucced
  }

  const resetPassword = async (data, link) => {
    dispatch(startLoading('resetPassword'))
    try {
      const res = await axios.post('/auth/reset-password', { ...data })
      toast.success(res.data.message)
      router.push(link === 'admin' ? '/admin/auth/login' : '/auth/login')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error')
    }
    dispatch(endLoading('resetPassword'))
  }

  const updateUser = async (updatedData) => {
    dispatch(startLoading('updateUser'))
    try {
      // Make the PUT request to update user data
      const res = await axios.put(`/users/${user.id}`, updatedData, {
        headers: {
          Authorization:
            localStorage.getItem('userToken') ||
            sessionStorage.getItem('userToken'),
        },
      })

      // Update Redux store with the new user data
      dispatch(loginUser(res.data))

      // Show success message
      toast.success('Your details have been successfully updated!')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error updating user data')
    } finally {
      dispatch(endLoading('updateUser'))
    }
  }

  const addPFP = (data) => {
    dispatch(loginUser(data))
  }

  return {
    isAuthenticated,
    user,
    loading,
    login,
    registerUser,
    resendEmail,
    logoutUser,
    resetPassword,
    verifyEmail,
    initializeAuth,
    resendPhone,
    verifyPhone,
    forgotPassword,
    loginWithPhone,
    updateUser,
    addPFP,
  }
}

export default useAuth
