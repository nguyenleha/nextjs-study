import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth'
import commonReducer from './slice/common'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
