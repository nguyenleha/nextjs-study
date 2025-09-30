import { Query } from '@/types/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        query: {} as Query,
    },
    reducers: {
        setQuery: (state, action: PayloadAction<Query>) => {
            state.query = action.payload
        },
    },
})

export const { setQuery } = commonSlice.actions
export default commonSlice.reducer
