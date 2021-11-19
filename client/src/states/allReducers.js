import {combineReducers} from 'redux';
import messageSliceReducer from './messagesSlice'
import teamsSliceReducer from './teamsSlice'
import messagesPerTeamSliceReducer from './messagesPerTeamSlice'
import usersSliceReducer from './usersSlice'
import membershipsSliceReducer from './membershipsSlice'


const allReducers = combineReducers({
    messages : messageSliceReducer,
    teamsInfo : teamsSliceReducer,
    usersInfo : usersSliceReducer,
    membershipsInfo : membershipsSliceReducer,
    //messagesPerTeam: messagesPerTeamSliceReducer
})

export default allReducers;