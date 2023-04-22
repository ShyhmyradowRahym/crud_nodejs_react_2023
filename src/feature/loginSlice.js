import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    login: false
}

export const LoginShowSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        handleLoginShow: (state, action) => {
            state. login= action.payload
        }
    }
})

export const { handleLoginShow } = LoginShowSlice.actions

export default LoginShowSlice.reducer