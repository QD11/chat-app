import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const messagesPerTeamSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        getMessagesPerTeam(state, action) {
            return [...action.payload]
        }
    },
})

export const { getMessagesPerTeam } = messagesPerTeamSlice.actions
export default messagesPerTeamSlice.reducer