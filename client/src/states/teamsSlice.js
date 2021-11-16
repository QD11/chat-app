import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('teams/fetchTeams', async () => {
    return ["jack", "john"]
})

const initialState = []

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        getData(state, action) {
            return [...action.payload]
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchData.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

export const { getData } = teamsSlice.actions
export default teamsSlice.reducer