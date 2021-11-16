import {combineReducers} from 'redux';
import messageSliceReducer from './messagesSlice'
import teamsSliceReducer from './teamsSlice'
import messagesPerTeamSliceReducer from './messagesPerTeamSlice'

const allReducers = combineReducers({
    messageSlice : messageSliceReducer,
    teamsSlice : teamsSliceReducer
})

export default allReducers;