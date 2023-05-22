const { cakeActions } = require('../cake/cakeSlice')

const createSlice = require('@reduxjs/toolkit').createSlice

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
        builder.addCase(cakeActions.ordered, state => {
            state.numOfIceCream--
        })
    }
})

module.exports = iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions 

// extra reducers allows the slice to respond to another action and does not create a new action 