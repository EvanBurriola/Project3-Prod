import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    itemFilter: "sauce"
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilter(state, action) {
            state.itemFilter = action.payload
        }
    }
})

export const { updateFilter } = filterSlice.actions

export default filterSlice.reducer