import React from 'react'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import async from 'middlewears/async'
import stateValidator from 'middlewears/stateValidator'
import reducers from 'reducers'

export default function Root ({children, initialState = {}})  {

    const store = createStore(
            reducers, 
            initialState,
            applyMiddleware(async, stateValidator )
        )

    return (
        <Provider 
            store = {store}>
            {children}
        </Provider> 
    )
}