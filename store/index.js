import { configureStore } from '@reduxjs/toolkit'

import { orderReducer, filterReducer } from './slices'

const reducers = {
    order: orderReducer,
    filter: filterReducer
}

const store = configureStore({
    reducer: reducers
})

export default store