import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './feature/loginSlice'
import adminsReducer from './feature/admins/adminsSlice'
export const store = configureStore({
  reducer: {
    login: loginReducer,
    admins: adminsReducer,
  },
})
