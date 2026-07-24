import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"



const projectSlice = createSlice({
    name: 'projectSlice',
    initialState: {
        modal: false
    },
    reducers: {
        toggleModal: state => {
            state.modal = !state.modal
        },
    }
})

export const {toggleModal} = projectSlice.actions

export default projectSlice.reducer