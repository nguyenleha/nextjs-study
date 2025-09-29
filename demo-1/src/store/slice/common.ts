import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        query: {} as Record<string, string>,
    },
    reducers: {
        setQuery: (state, action: PayloadAction<Record<string, string>>) => {
            state.query = action.payload
        },
    },
})

export const { setQuery } = commonSlice.actions
export default commonSlice.reducer
