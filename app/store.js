import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { resetContext, getContext } from 'kea'

import sagaPlugin from 'kea-saga'
import localStoragePlugin from 'kea-localstorage'
import listenersPlugin from 'kea-listeners'

export const history = createBrowserHistory()

resetContext({
  createStore: {
    middleware: [
      routerMiddleware(history)
    ],
    reducers: {
      router: connectRouter(history)
    }
  },
  plugins: [
    sagaPlugin,
    localStoragePlugin,
    listenersPlugin
  ]
})

export const store = getContext().store

export const routeSelector = (state) => state.router.location
