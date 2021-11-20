import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk } from '@reduxjs/toolkit'

    export const fetchAllUsers = createAsyncThunk(
        'allusers/fetchAllUsers',
        async (API, {dispatch}) => {
            return (
            fetch(API)
            .then((resp) => resp.json())
            .then(data => dispatch(setAllUsers(data))))
        }
    )

const allUsersAdapter = createEntityAdapter()
const initialState = allUsersAdapter.getInitialState()

const allUsersSlice = createSlice({
    name: 'allusers',
    initialState,
    reducers: {
        getAllUsers: allUsersAdapter.addMany,
        setAllUsers: allUsersAdapter.setMany,
        removeAllUsers: allUsersAdapter.removeAll,
    },
})

export const allUsersSelectors = allUsersAdapter.getSelectors(state => state.allUsersInfo)

export const {getAllUsers, setAllUsers, removeAllUsers} = allUsersSlice.actions
export default allUsersSlice.reducer