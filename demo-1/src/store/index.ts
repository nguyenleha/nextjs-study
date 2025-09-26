import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth' // Import reducer từ slice mới

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        // todo: todoReducer, // Thêm reducer mới
        auth: authReducer, // Thêm reducer mới
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
