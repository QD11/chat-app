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
            console.log(data)
            // const message = {
            //     id: data["id"], //30
            //     content: data.content, //hi Xinyi
            //     user_id: data.user_id, //1
            //     team_id: data.team_id, //1
            // }
            const message = data
            messagesAdapter.setOne(state, message)
        },
        addMultipleMessages: messagesAdapter.addMany,
    }
})

export const { messageReceived, addMultipleMessages } = messagesSlice.actions
export const messagesSelectors = messagesAdapter.getSelectors(state => state.messageSlice)
export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors((state) => state.messages)

export const selectMessagesByTeam = createSelector(
    [selectAllMessages, (state, team_id) => team_id],
    (messages, team_id) => messages.filter((message) => message.team_id === team_id)
)

export default messagesSlice.reducer