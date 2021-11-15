import {
    createEntityAdapter,
    createSlice,
    createSelector,} from '@reduxjs/toolkit'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messageReceived(state, action) {
            const data = action.payload
            ////{"id":30,"content":"hi Xinyi","user_id":1,"team_id":1,"created_at":"2021-11-15T04:21:45.653Z","updated_at":"2021-11-15T04:21:45.653Z"}
            const message = {
                id: data["id"], //30
                content: data.content, //hi Xinyi
                user_id: data.user_id, //1
                team_id: data.team_id, //1
            }
            messagesAdapter.addOne(state, message)
        }
    }
})

export const { messageReceived } = messagesSlice.actions

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors((state) => state.messages)

export const selectMessagesByTeam = createSelector(
    [selectAllMessages, (state, team_id) => team_id],
    (messages, team_id) => messages.filter((message) => message.team_id === team_id)
)

export default messagesSlice.reducer