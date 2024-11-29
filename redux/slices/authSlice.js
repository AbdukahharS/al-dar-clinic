import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
    },
    loginSuccess(state, action) {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure(state) {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions
export default authSlice.reducer
