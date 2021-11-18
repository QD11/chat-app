import {combineReducers} from 'redux';
import messageSliceReducer from './messagesSlice'
import teamsSliceReducer from './teamsSlice'
import messagesPerTeamSliceReducer from './messagesPerTeamSlice'
import usersSliceReducer from './usersSlice'

const allReducers = combineReducers({
    messages : messageSliceReducer,
    teamsInfo : teamsSliceReducer,
    usersInfo : usersSliceReducer,
    //messagesPerTeam: messagesPerTeamSliceReducer
})

export default allReducers;