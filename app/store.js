import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { getStore } from 'kea'

import sagaPlugin from 'kea-saga'
import thunkPlugin from 'kea-thunk'
import localStoragePlugin from 'kea-localstorage'

export const history = createBrowserHistory()

export const store = getStore({
  middleware: [
    routerMiddleware(history)
  ],
  reducers: {
    router: connectRouter(history)
  },
  plugins: [
    sagaPlugin,
    thunkPlugin,
    localStoragePlugin
  ]
})

export const routeSelector = (state) => state.router.location
