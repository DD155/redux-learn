import { ordered as cakeOrdered } from '../cake/cakeSlice'

import createSlice from '@reduxjs/toolkit'
const initialState = {
    numOfIceCream: 25
}

const iceCreamSlice = createSlice({
    name: 'iceCream',
    initialState,
    reducers: {
        ordered: (state, action) => {
            state.numOfIceCream -= action.payload || 1 
        },
        restocked: (state, action) => {
            state.numOfIceCream += action.payload || 1
        }
    },
    // extraReducers: {
    //     ['cake/ordered']: (state, action) => {
    //         state.numOfIceCream--
    //     }
    // }
    extraReducers: (builder) => {
        builder.addCase(cakeOrdered, state => {
            state.numOfIceCream--
        })
    }
})

export default iceCreamSlice.reducer
export const {ordered, restocked} = iceCreamSlice.actions 

// extra reducers allows the slice to respond to another action and does not create a new action 