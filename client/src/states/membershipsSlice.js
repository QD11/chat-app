import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk
} from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
// import { getStore } from 'redux'


    export const fetchMemberships = createAsyncThunk(
        'memberships/fetchMemberships',
        async (API, {dispatch}) => {
            return (
            fetch(API)
            .then((resp) => resp.json())
            .then(data => dispatch(getMemberships(data))))
        }
    )

const membershipsAdapter = createEntityAdapter()
const initialState = membershipsAdapter.getInitialState()

const membershipsSlice = createSlice({
    name: 'memberships',
    initialState,
    reducers: {
        getMemberships: membershipsAdapter.addMany,
        //setMembership: membershipsAdapter.updateOne,
        addMembership: membershipsAdapter.addOne,
        removeMemberships: membershipsAdapter.removeAll,
        setMembership(state, action) {
            console.log('hey')
        }
    },
})

export const membershipsSelectors = membershipsAdapter.getSelectors(state => state.membershipsInfo)

export const {getMemberships, setMembership, addMembership, removeMemberships} = membershipsSlice.actions
export default membershipsSlice.reducer