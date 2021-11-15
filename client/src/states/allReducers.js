import {combineReducers} from 'redux';
import messageSliceReducer from './messagesSlice'

const allReducers = combineReducers({
    messageSlice : messageSliceReducer
})

export default allReducers;