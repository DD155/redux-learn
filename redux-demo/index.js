const redux = require('redux')
const produce = require('immer').produce
const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware
const configureStore = redux.configureStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const IC_ORDERED = 'IC_ORDERED'
const IC_RESTOCKED = 'IC_RESTOCKED'

/*
actions are an object that have a type property

action creators are functions that return actions
*/

// actions for cakes
const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

// actions for ice cream
const orderIceCream = () => {
    return {
        type: IC_ORDERED,
        payload: 1
    }
}

const restockIceCream = (qty = 1) => {
    return {
        type: IC_RESTOCKED,
        payload: qty
    }
}

// a state is an object 
const initialState = {
    numOfCakes: 10
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

/*
the reducers are used to update a state
reducer: function (previousState, action) => newState
which will return a new state

when returning the state with altered properties, make sure to use the spread operator
to create a copy of the object
*/

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case IC_ORDERED:
            // return {
            //     ...state,
            //     numOfIceCream: state.numOfIceCream - 1
            // }
            return produce(state, (draft) => {
                draft.numOfIceCream = state.numOfIceCream - 1
            })
        case IC_RESTOCKED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload
            }
        default: 
            return state
    }
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default: 
            return state
    }
} 

// combine the reducers to one root reducer to add to the store
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// create the redux store using the reducer as its argument
const store = redux.legacy_createStore(rootReducer, applyMiddleware(logger))
console.log(`Initial state ${store.getState()}`)


const unsubscribe = store.subscribe(() => {})

// store.dispatch(orderCake())
// store.dispatch(restockCake(3))
const actions = bindActionCreators( { orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake()
actions.restockCake(3) 
actions.orderIceCream()
actions.restockIceCream(2)

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

