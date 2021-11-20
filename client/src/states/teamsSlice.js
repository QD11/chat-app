import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk } from '@reduxjs/toolkit'
    
export const fetchTeams = createAsyncThunk(
    'teams/fetchTeams',
    async (API, {dispatch}) => {
        return (
        fetch(API)
        .then((resp) => resp.json())
        .then(data => dispatch(getTeams(data))))
    }
)


const teamsAdapter = createEntityAdapter()
const initialState = teamsAdapter.getInitialState({})

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        getTeams: teamsAdapter.addMany,
        addTeam: teamsAdapter.addOne,
        updateTeam: teamsAdapter.setOne,
        getData(state, action) {
            return [...action.payload]
        },
        removeTeams: teamsAdapter.removeAll,
    },
    // extraReducers: {
    //     [fetchTeams.pending]: (state) => {
    //         state.status = 'loading'
    //     },
    //     [fetchTeams.fulfilled]: (state, action) => {
    //         state.status = 'success'
    //         //state.entities = action.payload
    //     },
    //     [fetchTeams.rejected]: (state) => {
    //         state.status = 'failed'
    //     },
    // }
})

export const teamsSelectors = teamsAdapter.getSelectors(state => state.teamsInfo)

export const { getTeams, getData, updateLatestMessage, updateTeam, addTeam, removeTeams} = teamsSlice.actions
export default teamsSlice.reducer