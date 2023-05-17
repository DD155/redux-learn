const store = require('./app/store')
const cakeActions = require('./features/cake/cakeSlice').cakeActions
const iceCreamActions = require('./features/icecream/iceCreamSlice').iceCreamActions

console.log('Inital state ', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated state ', store.getState())
})

store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.restocked(1))
store.dispatch(iceCreamActions.ordered(5))
store.dispatch(iceCreamActions.ordered())
store.dispatch(iceCreamActions.restocked(6))

unsubscribe()

/*
Redux toolkit pattern:
1. Create feature slice using createSlice
2. Perform mutations on state in the reducer 
3. Create the redux store using configureStore and attach the reducer
4. Dispatch actions using store.dispatch. Listen to the changes using store.getState() in unsubscribe
*/