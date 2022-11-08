import { configureStore } from '@reduxjs/toolkit'

import { orderReducer } from './slices'

const reducers = {
    order: orderReducer,
}

const store = configureStore({
    reducer: reducers
})

export default store