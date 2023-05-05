const redux = require('redux')
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').default

const configureStore = redux.configureStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading: false, 
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSucceeded = users => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFailed = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state, 
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
} 

const store = redux.legacy_createStore(reducer, applyMiddleware(thunkMiddleware))

const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            const users = res.data.map(user => user.username)
            dispatch(fetchUsersSucceeded(users))
        })
        .catch(err => {
            dispatch(fetchUsersFailed(err.message))
        })
    }
}



store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())