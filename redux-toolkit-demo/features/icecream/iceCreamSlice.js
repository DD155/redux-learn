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
    }
})

module.exports = iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions 

