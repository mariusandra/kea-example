import { getStore } from 'kea'

import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import sagaPlugin from 'kea-saga'
import thunkPlugin from 'kea-thunk'
import localStoragePlugin from 'kea-localstorage'

export const history = createHistory()

export const store = getStore({
  middleware: [
    routerMiddleware(history)
  ],
  reducers: {
    router: routerReducer
  },
  plugins: [
    sagaPlugin,
    thunkPlugin,
    localStoragePlugin
  ]
})

export const routeSelector = (state) => state.router.location
