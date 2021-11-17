import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const messagesPerTeamSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        getMessagesPerTeam(state, action) {
            return [...action.payload]
        },
        addMessageToTeam(state, action) {
            // let data = {...action.payload.data}
            // let messagesPerTeam = [...action.payload.messagesPerTeam]
            // let userInfo = {...action.payload.userInfo}
            // let newData = {...data, 
            //     user: userInfo
            // }
            // let numInt = messagesPerTeam.findIndex(element => element.id === data.team_id)
            // let add = [...messagesPerTeam[numInt].messages, newData]
            // let newDataToSend = [...messagesPerTeam]
            // newDataToSend[numInt] = {
            //     ...newDataToSend[numInt],
            //     messages: add
            // }
            
            // return [...newDataToSend]
            console.log(state.data)
        }
    },
})

export const { getMessagesPerTeam, addMessageToTeam } = messagesPerTeamSlice.actions
export default messagesPerTeamSlice.reducer