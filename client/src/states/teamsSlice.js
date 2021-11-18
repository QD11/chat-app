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
        addTeam: teamsAdapter.addOne,
        updateTeam(state, action) {
            const data = action.payload
            teamsAdapter.removeOne(state, data[0])
            teamsAdapter.addOne(state, data[1])
        },
        getData(state, action) {
            return [...action.payload]
        },
    },
})

export const teamsSelectors = teamsAdapter.getSelectors(state => state.teamsInfo)

export const { getTeams, getData, updateLatestMessage, updateTeam, addTeam } = teamsSlice.actions
export default teamsSlice.reducer