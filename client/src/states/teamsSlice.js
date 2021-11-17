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
        },
        updateLatestMessage(state, action) {
            const oldData = [...action.payload].slice(0,-1)
            const payLoad = [...action.payload].at(-1)
            const numInt = oldData.findIndex(element => element.id === payLoad.team_id)
            const replacedData = [...oldData][numInt]
            oldData[numInt] = {
                ...replacedData,
                latest_message: payLoad
            }
            return oldData
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

export const { getData, updateLatestMessage } = teamsSlice.actions
export default teamsSlice.reducer