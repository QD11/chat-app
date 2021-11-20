import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk} from '@reduxjs/toolkit'


export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (API, {dispatch}) => {
        return (
        fetch(API)
        .then((resp) => resp.json())
        .then(data => dispatch(getMessages(data))))
    }
)

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        getMessages: messagesAdapter.addMany,
        addMessage: messagesAdapter.addOne,
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
        removeMultipleMessages: messagesAdapter.removeAll,
    }
})

export const messagesSelectors = messagesAdapter.getSelectors(state => state.messages)

export const { messageReceived, addMultipleMessages, getMessages, addMessage, removeMultipleMessages } = messagesSlice.actions
export default messagesSlice.reducer