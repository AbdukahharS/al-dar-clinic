import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: {
    user: true,
    register: false,
    verifyEmail: false,
    login: false,
    logout: false,
    resendEmail: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading[action.payload] = true
    },
    endLoading(state, action) {
      state.loading[action.payload] = false
    },
    register(state, action) {
      state.user = action.payload
    },
    verify(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
    },
    login(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout, startLoading, endLoading, register, verify } =
  authSlice.actions
export default authSlice.reducer
