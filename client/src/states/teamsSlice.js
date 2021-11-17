import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk } from '@reduxjs/toolkit'

const teamsAdapter = createEntityAdapter()
const initialState = teamsAdapter.getInitialState()

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        getTeams: teamsAdapter.addMany, 
        getData(state, action) {
            return [...action.payload]
        },
    },
})

export const teamsSelectors = teamsAdapter.getSelectors(state => state.teamsInfo)

export const { getTeams, getData, updateLatestMessage } = teamsSlice.actions
export default teamsSlice.reducer