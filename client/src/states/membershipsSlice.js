import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk } from '@reduxjs/toolkit'

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
        setMembership: membershipsAdapter.setOne,
        addMembership: membershipsAdapter.addOne,
    },
})

export const membershipsSelectors = membershipsAdapter.getSelectors(state => state.membershipsInfo)

export const {getMemberships, setMembership, addMembership} = membershipsSlice.actions
export default membershipsSlice.reducer