import {combineReducers} from 'redux';
import messageSliceReducer from './messagesSlice'
import teamsSliceReducer from './teamsSlice'

const allReducers = combineReducers({
    messageSlice : messageSliceReducer,
    teamsSlice : teamsSliceReducer
})

export default allReducers;