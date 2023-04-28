const redux = require('redux')
const configureStore = redux.configureStore

const CAKE_ORDERED = 'CAKE_ORDERED'

/*
actions are an object that have a type property

action creators are functions that return actions
*/
const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}


// a state is an object 
const initialState = {
    numOfCakes: 10
}

/*
the reducers are used to update a state
reducer: function (previousState, action) => newState
which will return a new state

when returning the state with altered properties, make sure to use the spread operator
to create a copy of the object
*/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default: 
            return state
    }
} 

// create the redux store using the reducer as its argument
const store = redux.legacy_createStore(reducer)
console.log(`Initial state ${store.getState().numOfCakes}`)


const unsubscribe = store.subscribe(() =>
    console.log('update state ', store.getState()))

store.dispatch(orderCake())
unsubscribe()

/*
Redux pattern:
1. Create the store
2. Declare the initial state and reducer
3. Define the action and action creator
4. Subscribe to store
5. Dispatch to perform the actions of the store
6. Unsubscribe


*/