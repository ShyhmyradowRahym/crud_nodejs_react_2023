import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import service from '../../api'

export const getAdmins = createAsyncThunk("get/getAdmins", async () => {
    const res = await service.get('/admin/admins')
    return res.data
})
export const deleteAdmins = createAsyncThunk("delete/deleteAdmins", async ({ id }) => {
    const res = await service.delete(`/admin/delete-operator/${id}`)
    return [...res.data]
})

export const createAdmins = createAsyncThunk("create/createAdmins", async ({ value }) => {
    const res = await service.post('/admin/create-operator', value)
    return [...res.data]
})

const adminsSlice = createSlice({
    name: "admins",
    initialState: {
        admins: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        [getAdmins.pending]: (state) => {
            state.loading = true
        },
        [getAdmins.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins = action.payload
        },
        [getAdmins.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        [deleteAdmins.pending]: (state) => {
            state.loading = true
        },
        [deleteAdmins.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins = action.payload
        },
        [deleteAdmins.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        [createAdmins.pending]: (state) => {
            state.loading = true
        },
        [createAdmins.fulfilled]: (state, action) => {
            state.loading = false;
            state.admins = action.payload
        },
        [createAdmins.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default adminsSlice.reducer