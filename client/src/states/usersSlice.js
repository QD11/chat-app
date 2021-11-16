import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUser(state, action) {
            return {...action.payload}
        }
    },
})

export const { getUser } = usersSlice.actions
export default usersSlice.reducer