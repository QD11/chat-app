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
        updateTeam: teamsAdapter.setOne,
        // updateTeam(state, action) {
        //     teamsAdapter.removeAll(state)
        //     teamsAdapter.addOne(state, action.payload)
        // },
        getData(state, action) {
            return [...action.payload]
        },
    },
})

export const teamsSelectors = teamsAdapter.getSelectors(state => state.teamsInfo)

export const { getTeams, getData, updateLatestMessage, updateTeam, addTeam} = teamsSlice.actions
export default teamsSlice.reducer