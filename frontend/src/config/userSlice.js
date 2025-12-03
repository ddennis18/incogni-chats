import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  accessToken: null,
  isLoggedIn: false,
  email: '',
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { username, accessToken, email, id } = action.payload
      state.isLoggedIn = true
      state.username = username
      state.accessToken = accessToken
      state.email = email
      state.id = id
    }
  }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
