import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { keaSaga, keaReducer } from 'kea'

import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

export const history = createHistory()

const reducers = combineReducers({
  router: routerReducer,
  scenes: keaReducer('scenes')
})

export const routeSelector = (state) => state.router.location

const sagaMiddleware = createSagaMiddleware()
const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(routerMiddleware(history)),
  typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export const store = finalCreateStore(reducers)

sagaMiddleware.run(keaSaga)
