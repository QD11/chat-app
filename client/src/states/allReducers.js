import { configureStore } from '@reduxjs/toolkit';
import messageSliceReducer from './messagesSlice'
import teamsSliceReducer from './teamsSlice'
import messagesPerTeamSliceReducer from './messagesPerTeamSlice'
import usersSliceReducer from './usersSlice'
import membershipsSliceReducer from './membershipsSlice'


const store = configureStore({
    reducer: {
        messages : messageSliceReducer,
        teamsInfo : teamsSliceReducer,
        usersInfo : usersSliceReducer,
        membershipsInfo : membershipsSliceReducer,
    }
})

export default store;