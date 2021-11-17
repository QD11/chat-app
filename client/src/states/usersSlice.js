import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUser(state, action) {
            return {...action.payload}
        },
        logOutUser(state, action) {
            return {}
        }
    },
})

export const { getUser, logOutUser } = usersSlice.actions
export default usersSlice.reducer