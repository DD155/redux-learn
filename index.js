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