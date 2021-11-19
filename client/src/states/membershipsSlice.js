import {
    createEntityAdapter,
    createSlice,
    createSelector,
    createAsyncThunk } from '@reduxjs/toolkit'

const membershipsAdapter = createEntityAdapter()
const initialState = membershipsAdapter.getInitialState()

const membershipsSlice = createSlice({
    name: 'memberships',
    initialState,
    reducers: {
        getMemberships: membershipsAdapter.addMany,
        setMembership: membershipsAdapter.setOne,
    },
})

export const membershipsSelectors = membershipsAdapter.getSelectors(state => state.membershipsInfo)

export const {getMemberships, setMembership} = membershipsSlice.actions
export default membershipsSlice.reducer